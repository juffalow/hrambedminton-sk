import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import newSet from './newSet';

const newGame = new GraphQLInputObjectType({
  name: 'NewGame',
  fields: {
    sets: {
      type: GraphQLList(newSet),
    },
    note: {
      type: GraphQLString,
    },
  },
});

export default newGame;
