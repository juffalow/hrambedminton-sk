import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const newContactMessage = new GraphQLInputObjectType({
  name: 'NewContactMessage',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    message: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default newContactMessage;
