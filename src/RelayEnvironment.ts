import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
  type SubscribeFunction,
  Observable,
  type GraphQLResponse,
} from "relay-runtime";
import { createClient } from "graphql-ws";

function getWsEndpoint(path: string) {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${window.location.host}${path}`;
}

export const WS_ENDPOINT = getWsEndpoint("/api/workflows/ws");

let RelayEnvironment: Environment | null = null;

export function getRelayEnvironment(): Environment {
  if (!RelayEnvironment) {


const HTTP_ENDPOINT = "/api/workflows";

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await resp.json();
};

const wsClient = createClient({
  url: WS_ENDPOINT,
});

const subscribeFn: SubscribeFunction = (operation, variables) => {

  console.log("[subscribeFn] called", {
    op: operation.name,
    hasText: !!operation.text,
    variables,
    WS_ENDPOINT,
  });

  return Observable.create((sink) => {
    console.log("[subscribeFn] Observable subscribed");
    const cleanup = wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text ?? "",
        variables,
      },
      {
        next: (response: any) => {
          console.log("[subscribeFn] Observable got response", response);
          const data = response.data;
          if (data) {
            sink.next({ data } as GraphQLResponse);
          } else if (data == null) {
            console.warn("Data is null:", response);
          } else {
            console.error("Subscription error response:", response);
            sink.error(new Error("Subscription response missing data"));
          }
        },
        error: sink.error.bind(sink),
        complete: sink.complete.bind(sink),
      },
    );
    return cleanup;
  });
};

    RelayEnvironment = new Environment({
      network: Network.create(fetchFn, subscribeFn),
      store: new Store(new RecordSource()),
    });
  }
  return RelayEnvironment;
}
