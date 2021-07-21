import { GraphQLInt, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import GraphQLDateTime from '../types/GraphQLDateTime';
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
        orderBy: args.orderBy,
      });

      const gamesCount = await context.repositories.game.count({

      });

      const edges = nodesToEdges(games, after);

      return toConnection(edges, gamesCount, edges.length === args.first, after > 0);
    },
  },
};