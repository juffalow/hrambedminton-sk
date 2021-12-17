import React, { Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import { usePaginationFragment, useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import PlannedGamesTable from './PlannedGamesTable';

interface Props {
  query: any;
}

const PlannedGames: React.FC<Props> = (props: Props) => {
  const { data, loadNext, hasNext, refetch } = usePaginationFragment<any, any>(
    graphql`
      fragment PlannedGamesContainer_games on Query
      @refetchable(queryName: "PlannedGamesContainerGamesQuery") {
        games (
          first: $first
          after: $after
          playedAt: $playedAt
          orderBy: $orderBy
        ) @connection(key: "PlannedGamesList_games") {
          totalCount
          edges  {
            node {
              ...PlannedGamesTable_games
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }`,
    props.query
  );

  return (
    <>
      <p>Máš naplánovaných <strong>{data.games.totalCount}</strong> zápasov.</p>
      <PlannedGamesTable games={data.games.edges.map((edge: any) => edge.node)} />
      {
        hasNext &&
        <Button onClick={() => loadNext(20)}>Load more</Button>
      }
    </>
  );
};

const PlannedGamesContainer = () => {
  const query = useLazyLoadQuery<any>(
    graphql`
      query PlannedGamesContainerQuery(
        $first: Int,
        $after: String,
        $playedAt: DateFilter
        $orderBy: [GamesOrder]) {
        ...PlannedGamesContainer_games
      }`, {
        first: 20,
        after: null,
        playedAt: {
          from: '2021-10-18 00:00:00',
        },
        orderBy: [{ field: 'CREATED_AT', direction: 'ASC' }]
    });
  
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <PlannedGames query={query} />
      </Suspense>
    </>
  );
};

export default PlannedGamesContainer;
