/**
 * @generated SignedSource<<3ebfee6eb92e755ed73c9c0c62f53085>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type workflowTemplateFragment$data = {
  readonly arguments: any;
  readonly description: string | null | undefined;
  readonly maintainer: string;
  readonly name: string;
  readonly title: string | null | undefined;
  readonly uiSchema: any | null | undefined;
  readonly " $fragmentType": "workflowTemplateFragment";
};
export type workflowTemplateFragment$key = {
  readonly " $data"?: workflowTemplateFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"workflowTemplateFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "workflowTemplateFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maintainer",
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "arguments",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uiSchema",
      "storageKey": null
    }
  ],
  "type": "WorkflowTemplate",
  "abstractKey": null
};

(node as any).hash = "cbfb08ecd1465e891725205c63c31d96";

export default node;
