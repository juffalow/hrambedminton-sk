import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import pageInfo from '../pageInfo';
import placeEdge from '../edges/placeEdge';

const placeConnection = new GraphQLObjectType({
  name: 'PlaceConnection',
  fields: () => ({
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(placeEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  }),
});

export default placeConnection;
