import { useSubscription } from "react-relay";
import type { VisitInput } from "../graphql/__generated__/workflowsQuery.graphql";
import { useState } from "react";
import { workflowSubscription } from "../graphql/workflowRelaySubscription";
import {useMemo} from "react";

export interface WorkflowArtifact {
  name: string
  url: string
  mimeType: string
}

export function useWorkflowArtifacts(
  visit: VisitInput | null, name: string | null
): WorkflowArtifact[] {

  const enabled = isValidVisit(visit) && !isBlank(name);

  const [artifacts, setArtifacts] = useState<WorkflowArtifact[]>([]);

  const config = useMemo(() => { 
    if (!enabled) return null;
    return ({
    subscription:workflowSubscription,
    variables: {visit, name},
    onNext: (response: any) => {
        const artifacts = (response?.status?.tasks ?? [])
        .flatMap((task: any) => task?.artifacts ?? []);
        setArtifacts(artifacts ?? []);
        },
        onError: (error: unknown) => {
          console.error("Subscription error:", error);
        },
        onCompleted: () => {
          console.log("completed");
        }
  })}, [enabled, visit, name]);

  useSubscription(config);
  return artifacts;
}


const isBlank = (s: unknown): s is "" | null | undefined =>
  s === null || s === undefined || (typeof s === "string" && s.trim() === "");

const isValidVisit = (v: unknown): v is VisitInput =>
  v !== null && v !== undefined; // tighten this if VisitInput has required fields
