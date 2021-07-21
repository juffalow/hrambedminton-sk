import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const newSetPlayer = new GraphQLInputObjectType({
  name: 'NewSetPlayer',
  fields: {
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
});

const newSet = new GraphQLInputObjectType({
  name: 'NewSet',
  fields: {
    team1Players: {
      type: GraphQLNonNull(GraphQLList(newSetPlayer)),
    },
    team2Players: {
      type: GraphQLNonNull(GraphQLList(newSetPlayer)),
    },
    team1Score: {
      type: GraphQLNonNull(GraphQLInt),
    },
    team2Score: {
      type: GraphQLNonNull(GraphQLInt),
    },
  },
});

export default newSet;
