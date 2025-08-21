import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
} from "relay-runtime";
import keycloak from "./keycloak";
import type { PlansResponse } from "./utils/api";

const HTTP_ENDPOINT = "https://workflows.diamond.ac.uk/graphql";

keycloak.onTokenExpired = () => {
  console.log("JWT expired");
  keycloak
    .updateToken(10)
    .then(refreshed => {
      if (refreshed) {
        console.log("Fetched new JWT");
      } else {
        console.warn("Token still valid");
      }
    })
    .catch((err: unknown) => {
      console.error("Failed to update JWT", err);
    });
};

const kcinit = keycloak
  .init({
    onLoad: "login-required",
  })
  .then(
    auth => {
      console.info("Authenticated");
      console.log("auth", auth);
    },
    () => {
      console.error("Authentication failed");
    },
  );

const fetchFn: FetchFunction = async (request, variables) => {
  if (!keycloak.authenticated) {
    await kcinit;
  }

  if (keycloak.token) {
    console.log("keycloak token", keycloak.token);
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
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
  } else {
    console.log("Not authenticated yet");
    return {};
  }
};

export async function getPlans(): Promise<PlansResponse> {
  if (!keycloak.authenticated) {
    await kcinit;
  }

  if (!keycloak.token) {
    throw new Error("No Keycloak token available");
  }
  const url = "https://b01-1-blueapi.diamond.ac.uk/plans";
  console.log("getting plans");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const result = await response.json();
  return result;
}

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
