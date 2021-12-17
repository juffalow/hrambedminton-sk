import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

const newPlace = new GraphQLInputObjectType({
  name: 'NewPlace',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default newPlace;
