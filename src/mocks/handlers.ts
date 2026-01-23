import { http, HttpResponse, graphql, ws } from "msw";
import workflowsResponse from "./workflows-response.json";
import plansResponse from "./plans-response.json";
import { mapData } from "./mock_data";
import type { ScanEventMessage } from "../hooks/scanEvents";
import workflowsSubscriptionResponse from "./workflows-subscription-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const handlers = [
  // Query handler
  graphql.query("TemplateViewQuery", async () => {
    return HttpResponse.json({
      data: workflowsResponse.data,
    });
  }),

  // Mutation handler
  graphql.mutation("submitWorkflowTemplateMutation", async () => {
    return HttpResponse.json({
      data: {
        submitWorkflowTemplate: {
          name: "mockSubmittedName",
        },
      },
    });
  }),

  http.get("/api/plans", () => {
    return HttpResponse.json(plansResponse);
  }),

  http.put("/api/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("/api/tasks", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.get("/api/data/map", ({ request }) => {
    const url = new URL(request.url);
    const filepath = url.searchParams.get("filepath");
    const datapath = url.searchParams.get("datapath");
    const snake: boolean = JSON.parse(url.searchParams.get("snake")!);
    console.log("Mock /api/data/map called", { filepath, datapath, snake });
    const data = mapData(snake);
    return HttpResponse.json({ values: data });
  }),

  http.get("/api/data/events", async () => {
    const encoder = new TextEncoder();

    // Create a ReadableStream that emits fake scan events
    const stream = new ReadableStream({
      start(controller) {
        const send = (event: ScanEventMessage) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
          );
        };

        // scan starts
        send({
          uuid: "fake-scan-uuid",
          filepath: "/mock/path/fake.nxs",
          status: "running",
          snake: true,
        });

        // simulate data collection for ~5 seconds
        let counter = 0;
        const interval = setInterval(() => {
          counter++;
          //console.log("Mock event tick", counter);
          if (counter >= 25) {
            clearInterval(interval);
            // Scan stops
            send({
              uuid: "fake-scan-uuid",
              filepath: "/mock/path/fake.nxs",
              status: "finished",
              snake: true,
            });
          }
        }, 200);
      },
    });

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }),

  ...createGraphQLWsSubscriptionHandlers("/ws"),
];



type WorkflowsSubscriptionMessage = {
  t?: string;
  type: string;
  id?: string;
  payload?: unknown;
};

export function createInstantWsSubscriptionHandlers(url: string) {
  const link = ws.link(url);

  return [
    link.addEventListener("connection", ({ client }) => {
      let ackSent = false;

      client.addEventListener("message", (event) => {
        const text = typeof event.data === "string" ? event.data : String(event.data);

        let msg: any;
        try { msg = JSON.parse(text); } catch { return; }

        // Handle graphql-transport-ws handshake
        if (msg.type === "connection_init") {
          if (!ackSent) {
            ackSent = true;
            client.send(JSON.stringify({ type: "connection_ack" }));
          }
          return;
        }

        // Optional protocol ping/pong
        if (msg.type === "ping") {
          client.send(JSON.stringify({ type: "pong", payload: msg.payload }));
          return;
        }

        // Subscription start → send entire recording instantly
        if (msg.type === "subscribe") {
          const subId = msg.id ?? "1";

          for (const frame of workflowsSubscriptionResponse as WorkflowsSubscriptionMessage[]) {
            // rewrite id to match the client's id
            const out = { ...frame, id: subId };
            client.send(JSON.stringify(out));
          }

          // If the recording didn't include a "complete", add one
          if (!(workflowsSubscriptionResponse as WorkflowsSubscriptionMessage[]).some(m => m.type === "complete")) {
            client.send(JSON.stringify({ type: "complete", id: subId }));
          }

          return;
        }

        // Client stops subscription
        if (msg.type === "complete") {
          return;
        }
      });
    }),
  ];
}

