
import { useEffect, useMemo, useState } from "react";
import { useRelayEnvironment } from "react-relay";
import { requestSubscription } from "relay-runtime";

import type { VisitInput } from "../graphql/__generated__/workflowsQuery.graphql";
import { workflowSubscription } from "../graphql/workflowRelaySubscription";

export interface WorkflowArtifact {
  name: string;
  url: string;
  mimeType: string;
}

export function useWorkflowArtifacts(
  visit: VisitInput | null,
  name: string | null
): WorkflowArtifact[] {
  const environment = useRelayEnvironment();
  const [artifacts, setArtifacts] = useState<WorkflowArtifact[]>([]);

  const enabled = isValidVisit(visit) && !isBlank(name);
  console.log("SUBSCRIPTION IS ENABLED:", enabled)

  // Ensure the variables are non-null when enabled
  const variables = useMemo(() => {
    if (!enabled) return null;
    return { visit: visit!, name: name! };
  }, [enabled, visit, name]);

  useEffect(() => {
    console.log("STARTING SUBSCRIPTION:", enabled, variables)
    // If disabled, clear results and do not subscribe.
    if (!enabled || !variables) {
      setArtifacts([]);
      return;
    }

    const disposable = requestSubscription(environment, {
      subscription: workflowSubscription,
      variables,
      onNext: (response: any) => {
        console.error("HANDLING SUBSCRIPTION RESPONSE:", response);
        const nextArtifacts =
          (response?.status?.tasks ?? []).flatMap(
            (task: any) => task?.artifacts ?? []
          );

        setArtifacts(nextArtifacts ?? []);
      },
      onError: (error: unknown) => {
        console.error("Subscription error:", error);
      },
      onCompleted: () => {
        console.log("completed");
      },
    });

    return () => {
      disposable.dispose();
    };
  }, [environment, enabled, variables]);

  return artifacts;
}

const isBlank = (s: unknown): s is "" | null | undefined =>
  s === null ||
  s === undefined ||
  (typeof s === "string" && s.trim() === "");

const isValidVisit = (v: unknown): v is VisitInput =>
  v !== null && v !== undefined;
