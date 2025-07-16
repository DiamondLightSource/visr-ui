import { http, HttpResponse } from "msw";
import plansResponse from "./plans-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const handlers = [
  http.get("https://b01-1-blueapi.diamond.ac.uk/plans", () => {
    return HttpResponse.json(plansResponse);
  }),

  http.put("https://b01-1-blueapi.diamond.ac.uk/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("https://b01-1-blueapi.diamond.ac.uk/tasks", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),
];
