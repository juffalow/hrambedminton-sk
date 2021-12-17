import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';
import newSet from './newSet';
import gameType from '../enums/gameType';

const newGame = new GraphQLInputObjectType({
  name: 'NewGame',
  fields: {
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    place: {
      type: GraphQLNonNull(GraphQLString),
    },
    court: {
      type: GraphQLNonNull(GraphQLString),
    },
    type: {
      type: GraphQLNonNull(gameType),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    sets: {
      type: GraphQLList(newSet),
    },
    playedAt: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default newGame;
