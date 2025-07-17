import { http, HttpResponse } from "msw";
import plansResponse from "./plans-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const handlers = [
  http.get("http://localhost:8000/plans", () => {
    return HttpResponse.json(plansResponse);
  }),

  http.put("http://localhost:8000/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("http://localhost:8000/tasks", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),
];
