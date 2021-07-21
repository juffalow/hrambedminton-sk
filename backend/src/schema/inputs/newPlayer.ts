import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

const newPlayer = new GraphQLInputObjectType({
  name: 'NewPlayer',
  fields: {
    firstName: {
      type: GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default newPlayer;
