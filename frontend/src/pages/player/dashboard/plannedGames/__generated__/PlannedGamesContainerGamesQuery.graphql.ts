/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Direction = "ASC" | "DESC" | "%future added value";
export type GamesOrderField = "CREATED_AT" | "PLAYED_AT" | "%future added value";
export type GamesOrder = {
    field: GamesOrderField;
    direction: Direction;
};
export type DateFilter = {
    from?: unknown | null;
    to?: unknown | null;
};
export type PlannedGamesContainerGamesQueryVariables = {
    after?: string | null;
    first?: number | null;
    orderBy?: Array<GamesOrder | null> | null;
    playedAt?: DateFilter | null;
};
export type PlannedGamesContainerGamesQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"PlannedGamesContainer_games">;
};
export type PlannedGamesContainerGamesQuery = {
    readonly response: PlannedGamesContainerGamesQueryResponse;
    readonly variables: PlannedGamesContainerGamesQueryVariables;
};



/*
query PlannedGamesContainerGamesQuery(
  $after: String
  $first: Int
  $orderBy: [GamesOrder]
  $playedAt: DateFilter
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "playedAt"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PlannedGamesContainerGamesQuery",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PlannedGamesContainerGamesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "args": (v1/*: any*/),
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
    "cacheID": "1c8fcd073eaaa932792254e0a7c7e456",
    "id": null,
    "metadata": {},
    "name": "PlannedGamesContainerGamesQuery",
    "operationKind": "query",
    "text": "query PlannedGamesContainerGamesQuery(\n  $after: String\n  $first: Int\n  $orderBy: [GamesOrder]\n  $playedAt: DateFilter\n) {\n  ...PlannedGamesContainer_games\n}\n\nfragment PlannedGamesContainer_games on Query {\n  games(first: $first, after: $after, playedAt: $playedAt, orderBy: $orderBy) {\n    totalCount\n    edges {\n      node {\n        ...PlannedGamesTable_games\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n\nfragment PlannedGamesRow_game on Game {\n  _id\n  title\n  place\n  court\n  playedAt\n}\n\nfragment PlannedGamesTable_games on Game {\n  id\n  ...PlannedGamesRow_game\n}\n"
  }
};
})();
(node as any).hash = '52fc149bd1803cf4bf733ba73e96d3aa';
export default node;
