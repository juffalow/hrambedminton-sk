import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import player from '../player';

const playerEdge = new GraphQLObjectType({
  name: 'PlayerEdge',
  description: 'List of edges.',
  fields: () => ({
    node: {
      description: 'The item at the end of the edge.',
      type: player,
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString,
    },
  }),
});

export default playerEdge;
