/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NewContactMessage = {
    name: string;
    email: string;
    message: string;
};
export type createContactMessageMutationVariables = {
    input: NewContactMessage;
};
export type createContactMessageMutationResponse = {
    readonly createContactMessage: {
        readonly id: string;
    } | null;
};
export type createContactMessageMutation = {
    readonly response: createContactMessageMutationResponse;
    readonly variables: createContactMessageMutationVariables;
};



/*
mutation createContactMessageMutation(
  $input: NewContactMessage!
) {
  createContactMessage(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ContactMessage",
    "kind": "LinkedField",
    "name": "createContactMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "createContactMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createContactMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fd76fbdebba703ce1c673cf6e3d58c21",
    "id": null,
    "metadata": {},
    "name": "createContactMessageMutation",
    "operationKind": "mutation",
    "text": "mutation createContactMessageMutation(\n  $input: NewContactMessage!\n) {\n  createContactMessage(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '87b664de8b3a46f83d161a537af8c42a';
export default node;
