import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import pageInfo from '../pageInfo';
import playerEdge from '../edges/playerEdge';

const playerConnection = new GraphQLObjectType({
  name: 'PlayerConnection',
  fields: () => ({
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(playerEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  }),
});

export default playerConnection;
