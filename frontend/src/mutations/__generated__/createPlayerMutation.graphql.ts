/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NewPlayer = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
export type createPlayerMutationVariables = {
    input: NewPlayer;
};
export type createPlayerMutationResponse = {
    readonly createPlayer: {
        readonly id: string;
        readonly _id: string;
        readonly firstName: string;
        readonly lastName: string;
    } | null;
};
export type createPlayerMutation = {
    readonly response: createPlayerMutationResponse;
    readonly variables: createPlayerMutationVariables;
};



/*
mutation createPlayerMutation(
  $input: NewPlayer!
) {
  createPlayer(input: $input) {
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
    "name": "createPlayer",
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
    "name": "createPlayerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createPlayerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a705988cfb734826a1e9d2a4ef5ea09",
    "id": null,
    "metadata": {},
    "name": "createPlayerMutation",
    "operationKind": "mutation",
    "text": "mutation createPlayerMutation(\n  $input: NewPlayer!\n) {\n  createPlayer(input: $input) {\n    id\n    _id\n    firstName\n    lastName\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e05093c332e4d3855cc5e8cd7b9d85f2';
export default node;
