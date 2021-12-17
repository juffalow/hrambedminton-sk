import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import playerOrder from '../inputs/orders/playerOrder';
import Context from '../../context/Context';
import placeConnection from '../types/connections/placeConnection';
import nodesToEdges from './nodesToEdges';
import toConnection from './toConnection';
import logger from '../../logger';

interface PlayersQueryArguments {
  first: number;
  after: string;
  name: string;
  orderBy: OrderBy[];
}

export default {
  places: {
    type: placeConnection,
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
      name: {
        type: GraphQLString,
      },
      orderBy: {
        type: GraphQLList(playerOrder),
      },
    },
    resolve: async (_, args: PlayersQueryArguments, context: Context): Promise<any> => {
      logger.debug('PlacesQuery', args);

      const after = typeof args.after === 'undefined' || args.after === null ? 0 : parseInt(Buffer.from(args.after, 'base64').toString('ascii').replace('cursor', ''), 10);

      const places = await context.repositories.place.find({
        first: args.first,
        offset: after,
        name: args.name,
      });

      const count = await context.repositories.place.count({
        name: args.name,
      });

      const edges = nodesToEdges(places, after);

      return toConnection(edges, count, edges.length === args.first, after > 0);
    },
  },
};
