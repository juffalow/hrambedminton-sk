import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import mailLog from '../mailLog';

const mailLogEdge = new GraphQLObjectType({
  name: 'MailLogEdge',
  description: 'List of edges.',
  fields: () => ({
    node: {
      description: 'The item at the end of the edge.',
      type: mailLog,
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString,
    },
  }),
});

export default mailLogEdge;
