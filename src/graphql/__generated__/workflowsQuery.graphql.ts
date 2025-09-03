/**
 * @generated SignedSource<<4eeca44e5ac7e2a2b602d85adcf61ca8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type VisitInput = {
  number: number;
  proposalCode: string;
  proposalNumber: number;
};
export type WorkflowFilter = {
  creator?: string | null | undefined;
  workflowStatusFilter?: WorkflowStatusFilter | null | undefined;
};
export type WorkflowStatusFilter = {
  error?: boolean;
  failed?: boolean;
  pending?: boolean;
  running?: boolean;
  succeeded?: boolean;
};
export type workflowsQuery$variables = {
  cursor?: string | null | undefined;
  filter?: WorkflowFilter | null | undefined;
  limit: number;
  visit: VisitInput;
};
export type workflowsQuery$data = {
  readonly workflows: {
    readonly nodes: ReadonlyArray<{
      readonly name: string;
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
  };
};
export type workflowsQuery = {
  response: workflowsQuery$data;
  variables: workflowsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visit"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "cursor",
        "variableName": "cursor"
      },
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      },
      {
        "kind": "Variable",
        "name": "limit",
        "variableName": "limit"
      },
      {
        "kind": "Variable",
        "name": "visit",
        "variableName": "visit"
      }
    ],
    "concreteType": "WorkflowConnection",
    "kind": "LinkedField",
    "name": "workflows",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workflow",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPreviousPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startCursor",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "workflowsQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "workflowsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "6e6da56e134de097d20cafd8abe7e0aa",
    "id": null,
    "metadata": {},
    "name": "workflowsQuery",
    "operationKind": "query",
    "text": "query workflowsQuery(\n  $visit: VisitInput!\n  $cursor: String\n  $limit: Int!\n  $filter: WorkflowFilter\n) {\n  workflows(visit: $visit, cursor: $cursor, limit: $limit, filter: $filter) {\n    nodes {\n      name\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7451d3fab389359463e7424e2fcaa8d0";

export default node;
