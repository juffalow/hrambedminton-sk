import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import pageInfo from '../pageInfo';
import mailLogEdge from '../edges/mailLogEdge';

const mailLogConnection = new GraphQLObjectType({
  name: 'MailLogConnection',
  fields: () => ({
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(mailLogEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  }),
});

export default mailLogConnection;
