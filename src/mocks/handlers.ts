import { http, HttpResponse, graphql, ws } from "msw";
import workflowsResponse from "./workflows-response.json";
import plansResponse from "./plans-response.json";
import { mapData } from "./mock_data";
import type { ScanEventMessage } from "../hooks/scanEvents";
import workflowsSubscriptionResponse from "./workflows-subscription-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

type WorkflowsSubscriptionMessage = {
  t?: string;
  type: string;
  id?: string;
  payload?: unknown;
};


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

  ...createGraphQLWsSubscriptionHandlers(),
];



function createGraphQLWsSubscriptionHandlers() {
  // Match whatever WS URL your Relay network layer uses
  const graphqlSocket = ws.link("ws://localhost:4000/graphql");

  return [
    
graphqlSocket.addEventListener("connection", ({ client }: { client: any }) => {
    client.on("message", (event: any) => {
      const data = typeof event.data === "string" ? event.data : String(event.data);

      // Parse the incoming message safely
      const msg = JSON.parse(data);
      if (!msg) return;

      // Example: if you're using graphql-ws protocol, listen for "subscribe"
      if (msg.type === "subscribe") {
        // Send a mocked "next" payload
        client.send(
          JSON.stringify({
            type: "next",
            id: msg.id ?? "1",
            payload: {
              data: {
                
              },
            },
          }),
        );
      }
    });
  }),
];
}
