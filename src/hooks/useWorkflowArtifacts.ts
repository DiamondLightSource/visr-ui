
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

  useEffect(() => {
    if  ((!isValidVisit(visit)) || isBlank(name)) {
      return;
    }
    const variables = { visit: visit, name: name };
    const disposable = requestSubscription(environment, {
      subscription: workflowSubscription,
      variables,
      onNext: (response: any) => {
        console.error("HANDLING SUBSCRIPTION RESPONSE:", response);
        const nextArtifacts =
          (response?.workflow?.status?.tasks ?? []).flatMap(
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
  }, [visit, name]);

  return artifacts;
}

const isBlank = (s: unknown): s is "" | null | undefined =>
  s === null ||
  s === undefined ||
  (typeof s === "string" && s.trim() === "");

const isValidVisit = (v: unknown): v is VisitInput =>
  v !== null && v !== undefined;
