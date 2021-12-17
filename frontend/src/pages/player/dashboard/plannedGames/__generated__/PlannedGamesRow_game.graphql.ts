/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PlannedGamesRow_game = {
    readonly _id: string;
    readonly title: string | null;
    readonly place: string | null;
    readonly court: string | null;
    readonly playedAt: string;
    readonly " $refType": "PlannedGamesRow_game";
};
export type PlannedGamesRow_game$data = PlannedGamesRow_game;
export type PlannedGamesRow_game$key = {
    readonly " $data"?: PlannedGamesRow_game$data;
    readonly " $fragmentRefs": FragmentRefs<"PlannedGamesRow_game">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PlannedGamesRow_game",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "place",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "court",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "playedAt",
      "storageKey": null
    }
  ],
  "type": "Game",
  "abstractKey": null
};
(node as any).hash = 'b51803f0b96920dc9ee9b1fbffafcf28';
export default node;
