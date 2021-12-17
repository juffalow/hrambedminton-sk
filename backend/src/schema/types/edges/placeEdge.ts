import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import place from '../place';

const placeEdge = new GraphQLObjectType({
  name: 'PlaceEdge',
  description: 'List of edges.',
  fields: () => ({
    node: {
      description: 'The item at the end of the edge.',
      type: place,
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString,
    },
  }),
});

export default placeEdge;
