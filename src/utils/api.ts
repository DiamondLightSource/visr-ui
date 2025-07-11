export interface Plan {
  name: string;
  description: string | undefined;
  schema: object;
}

export interface PlansResponse {
  plans: Plan[];
}

export async function getPlans(): Promise<PlansResponse> {
  const url = "http://localhost:8000/plans";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-Requested-By", "XMLHttpRequest");

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  return await response.json();
}
