import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import game from '../game';

const gameEdge = new GraphQLObjectType({
  name: 'GameEdge',
  description: 'List of edges.',
  fields: () => ({
    node: {
      description: 'The item at the end of the edge.',
      type: game,
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString,
    },
  }),
});

export default gameEdge;
