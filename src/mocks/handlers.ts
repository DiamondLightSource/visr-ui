import { http, HttpResponse } from "msw";
import workflowsResponse from "./workflows-response.json";
import plansResponse from "./plans-response.json";
import instrumentSessionsResponse from "./instrumentSessions-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const handlers = [
  http.post("/api/graphql", request => {
    const referrer = request.request.referrer;
    if (referrer.search("workflows") > 0) {
      return HttpResponse.json(workflowsResponse);
    } else {
      return HttpResponse.json(instrumentSessionsResponse);
    }
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
];
