/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GameType = "DOUBLES" | "MIX" | "OTHER" | "SINGLES" | "%future added value";
export type NewScheduledGame = {
    title: string;
    place: string;
    court: string;
    type: GameType;
    playedAt: string;
    invitation?: string | null;
};
export type scheduleGameMutationVariables = {
    input: NewScheduledGame;
};
export type scheduleGameMutationResponse = {
    readonly scheduleGame: {
        readonly id: string;
        readonly _id: string;
        readonly title: string | null;
    } | null;
};
export type scheduleGameMutation = {
    readonly response: scheduleGameMutationResponse;
    readonly variables: scheduleGameMutationVariables;
};



/*
mutation scheduleGameMutation(
  $input: NewScheduledGame!
) {
  scheduleGame(input: $input) {
    id
    _id
    title
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
    "concreteType": "Game",
    "kind": "LinkedField",
    "name": "scheduleGame",
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
        "name": "title",
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
    "name": "scheduleGameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "scheduleGameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3117e25280b4674088f376971b49d560",
    "id": null,
    "metadata": {},
    "name": "scheduleGameMutation",
    "operationKind": "mutation",
    "text": "mutation scheduleGameMutation(\n  $input: NewScheduledGame!\n) {\n  scheduleGame(input: $input) {\n    id\n    _id\n    title\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd19e3e768067ef8d04b635d04c35442e';
export default node;
