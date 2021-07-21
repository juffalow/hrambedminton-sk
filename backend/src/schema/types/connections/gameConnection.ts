import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import pageInfo from '../pageInfo';
import gameEdge from '../edges/gameEdge';

const gameConnection = new GraphQLObjectType({
  name: 'GameConnection',
  fields: () => ({
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(gameEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  }),
});

export default gameConnection;
