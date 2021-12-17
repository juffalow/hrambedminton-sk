/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Direction = "ASC" | "DESC" | "%future added value";
export type GamesOrderField = "CREATED_AT" | "PLAYED_AT" | "%future added value";
export type DateFilter = {
    from?: unknown | null;
    to?: unknown | null;
};
export type GamesOrder = {
    field: GamesOrderField;
    direction: Direction;
};
export type PlannedGamesContainerQueryVariables = {
    first?: number | null;
    after?: string | null;
    playedAt?: DateFilter | null;
    orderBy?: Array<GamesOrder | null> | null;
};
export type PlannedGamesContainerQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"PlannedGamesContainer_games">;
};
export type PlannedGamesContainerQuery = {
    readonly response: PlannedGamesContainerQueryResponse;
    readonly variables: PlannedGamesContainerQueryVariables;
};



/*
query PlannedGamesContainerQuery(
  $first: Int
  $after: String
  $playedAt: DateFilter
  $orderBy: [GamesOrder]
) {
  ...PlannedGamesContainer_games
}

fragment PlannedGamesContainer_games on Query {
  games(first: $first, after: $after, playedAt: $playedAt, orderBy: $orderBy) {
    totalCount
    edges {
      node {
        ...PlannedGamesTable_games
        id
        __typename
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}

fragment PlannedGamesRow_game on Game {
  _id
  title
  place
  court
  playedAt
}

fragment PlannedGamesTable_games on Game {
  id
  ...PlannedGamesRow_game
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "playedAt"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  },
  {
    "kind": "Variable",
    "name": "playedAt",
    "variableName": "playedAt"
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
    "name": "PlannedGamesContainerQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PlannedGamesContainer_games"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "PlannedGamesContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "GameConnection",
        "kind": "LinkedField",
        "name": "games",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GameEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Game",
                "kind": "LinkedField",
                "name": "node",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
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
                "name": "startCursor",
                "storageKey": null
              },
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": [
          "playedAt",
          "orderBy"
        ],
        "handle": "connection",
        "key": "PlannedGamesList_games",
        "kind": "LinkedHandle",
        "name": "games"
      }
    ]
  },
  "params": {
    "cacheID": "3bfdb99386fabbcb45579776776cb4d4",
    "id": null,
    "metadata": {},
    "name": "PlannedGamesContainerQuery",
    "operationKind": "query",
    "text": "query PlannedGamesContainerQuery(\n  $first: Int\n  $after: String\n  $playedAt: DateFilter\n  $orderBy: [GamesOrder]\n) {\n  ...PlannedGamesContainer_games\n}\n\nfragment PlannedGamesContainer_games on Query {\n  games(first: $first, after: $after, playedAt: $playedAt, orderBy: $orderBy) {\n    totalCount\n    edges {\n      node {\n        ...PlannedGamesTable_games\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n\nfragment PlannedGamesRow_game on Game {\n  _id\n  title\n  place\n  court\n  playedAt\n}\n\nfragment PlannedGamesTable_games on Game {\n  id\n  ...PlannedGamesRow_game\n}\n"
  }
};
})();
(node as any).hash = 'ec2fb220c4a767764a68000916f0eb57';
export default node;
