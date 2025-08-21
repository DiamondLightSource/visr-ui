import { useLazyLoadQuery } from "react-relay/hooks";
import { type Visit } from "../utils/types";
import type { workflowsQuery as WorkflowsQueryType } from "../graphql/__generated__/workflowsQuery.graphql";
import { workflowsQuery } from "../graphql/workflowsQuery";
import { Typography } from "@mui/material";

export default function WorkflowsL({ visit }: { visit: Visit }) {
  const data = useLazyLoadQuery<WorkflowsQueryType>(workflowsQuery, {
    visit,
    limit: 10,
  });

  console.log("WL data is", data);

  return <Typography>WorkflowsL</Typography>;
}
