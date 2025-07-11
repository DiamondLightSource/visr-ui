import { http, HttpResponse } from "msw";
import plansResponse from "./plans-response.json";

export const handlers = [
  http.get("http://localhost:8000/plans", () => {
    return HttpResponse.json(plansResponse);
  }),
];
