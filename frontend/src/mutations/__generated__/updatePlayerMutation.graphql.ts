/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdatePlayerInput = {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    isVerified?: boolean | null;
};
export type updatePlayerMutationVariables = {
    input: UpdatePlayerInput;
};
export type updatePlayerMutationResponse = {
    readonly updatePlayer: {
        readonly id: string;
        readonly _id: string;
        readonly firstName: string;
        readonly lastName: string;
    } | null;
};
export type updatePlayerMutation = {
    readonly response: updatePlayerMutationResponse;
    readonly variables: updatePlayerMutationVariables;
};



/*
mutation updatePlayerMutation(
  $input: UpdatePlayerInput!
) {
  updatePlayer(input: $input) {
    id
    _id
    firstName
    lastName
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
    "concreteType": "Player",
    "kind": "LinkedField",
    "name": "updatePlayer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
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
    "name": "updatePlayerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "updatePlayerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a941caaccafe2f0cb4a7a4fd917b2f4a",
    "id": null,
    "metadata": {},
    "name": "updatePlayerMutation",
    "operationKind": "mutation",
    "text": "mutation updatePlayerMutation(\n  $input: UpdatePlayerInput!\n) {\n  updatePlayer(input: $input) {\n    id\n    _id\n    firstName\n    lastName\n  }\n}\n"
  }
};
})();
(node as any).hash = '649425e019fbe6711432dd8a9d41b36c';
export default node;
