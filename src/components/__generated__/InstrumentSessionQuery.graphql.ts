/**
 * @generated SignedSource<<02f2f30b3d54f1c67b529f98b6da62d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type InstrumentSessionQuery$variables = {
  instrumentName: string;
};
export type InstrumentSessionQuery$data = {
  readonly instrument: {
    readonly instrumentSessions: ReadonlyArray<{
      readonly endTime: any | null | undefined;
      readonly instrumentSessionId: number;
      readonly instrumentSessionNumber: number;
      readonly proposal: {
        readonly proposalCategory: string | null | undefined;
        readonly proposalNumber: number;
        readonly summary: string | null | undefined;
        readonly title: string | null | undefined;
      } | null | undefined;
      readonly startTime: any | null | undefined;
      readonly state: string | null | undefined;
    }>;
  } | null | undefined;
};
export type InstrumentSessionQuery = {
  response: InstrumentSessionQuery$data;
  variables: InstrumentSessionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "instrumentName"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "instrumentName",
        "variableName": "instrumentName"
      }
    ],
    "concreteType": "Instrument",
    "kind": "LinkedField",
    "name": "instrument",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "InstrumentSession",
        "kind": "LinkedField",
        "name": "instrumentSessions",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instrumentSessionId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instrumentSessionNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Proposal",
            "kind": "LinkedField",
            "name": "proposal",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "proposalCategory",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "proposalNumber",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "summary",
                "storageKey": null
              }
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InstrumentSessionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InstrumentSessionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88448f9c707e7dbdc5681c0999ce62c8",
    "id": null,
    "metadata": {},
    "name": "InstrumentSessionQuery",
    "operationKind": "query",
    "text": "query InstrumentSessionQuery(\n  $instrumentName: String!\n) {\n  instrument(instrumentName: $instrumentName) {\n    instrumentSessions {\n      instrumentSessionId\n      instrumentSessionNumber\n      startTime\n      endTime\n      state\n      proposal {\n        proposalCategory\n        proposalNumber\n        title\n        summary\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "19ded6d0e48e9d8c47d4d4178842fb2d";

export default node;
