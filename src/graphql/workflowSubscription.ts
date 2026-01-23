import { graphql } from "relay-runtime";

export const workflowSubscription = graphql`
  subscription workflowRelaySubscription(
    $visit: VisitInput!
    $name: String!
  ) {
    workflows(
      visit: $visit
      name: $name
    ) {
      status
    }
  }
`;