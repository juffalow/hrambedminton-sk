import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const updatePlayer = new GraphQLInputObjectType({
  name: 'UpdatePlayerInput',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    isVerified: {
      type: GraphQLBoolean,
    }
  },
});

export default updatePlayer;
