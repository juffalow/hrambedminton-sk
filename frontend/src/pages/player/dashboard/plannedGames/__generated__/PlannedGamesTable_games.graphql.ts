/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PlannedGamesTable_games = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"PlannedGamesRow_game">;
    readonly " $refType": "PlannedGamesTable_games";
}>;
export type PlannedGamesTable_games$data = PlannedGamesTable_games;
export type PlannedGamesTable_games$key = ReadonlyArray<{
    readonly " $data"?: PlannedGamesTable_games$data;
    readonly " $fragmentRefs": FragmentRefs<"PlannedGamesTable_games">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PlannedGamesTable_games",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PlannedGamesRow_game"
    }
  ],
  "type": "Game",
  "abstractKey": null
};
(node as any).hash = 'caea44b91aa0578b27a997290a00c9bf';
export default node;
