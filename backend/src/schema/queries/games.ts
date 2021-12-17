import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import dateFilter from '../inputs/dateFilter';
import gameOrder from '../inputs/orders/gameOrder';
import Context from '../../context/Context';
import gameConnection from '../types/connections/gameConnection';
import nodesToEdges from './nodesToEdges';
import toConnection from './toConnection';
import logger from '../../logger';

interface GamesQueryArguments {
  first: number;
  after: string;
  createdAt: {
    from: string;
    to: string;
  };
  playedAt: {
    from: string;
    to: string;
  };
  orderBy: OrderBy[];
}

export default {
  games: {
    type: gameConnection,
    args: {
      first: {
        defaultValue: 10,
        description: 'Limits the number of results returned in the page. Defaults to 10.',
        type: GraphQLInt,
      },
      after: {
        defaultValue: 'Y3Vyc29yMA==', // base64encode('cursor0')
        description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.',
        type: GraphQLString,
      },
      playedAt: {
        type: dateFilter,
      },
      orderBy: {
        type: GraphQLList(gameOrder),
      },
    },
    resolve: async (_, args: GamesQueryArguments, context: Context): Promise<any> => {
      logger.debug('GamesQuery', args);

      const after = typeof args.after === 'undefined' || args.after === null ? 0 : parseInt(Buffer.from(args.after, 'base64').toString('ascii').replace('cursor', ''), 10);

      const games = await context.repositories.game.find({
        first: args.first,
        offset: after,
        playedAt: args.playedAt,
        orderBy: args.orderBy,
      });

      const count = await context.repositories.game.count({
        playedAt: args.playedAt,
      });

      const edges = nodesToEdges(games, after);

      return toConnection(edges, count, edges.length === args.first, after > 0);
    },
  },
};