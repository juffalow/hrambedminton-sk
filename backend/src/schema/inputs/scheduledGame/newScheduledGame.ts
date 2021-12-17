import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import gameType from '../../enums/gameType';

const newScheduledGame = new GraphQLInputObjectType({
  name: 'NewScheduledGame',
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
    playedAt: {
      type: GraphQLNonNull(GraphQLString),
    },
    invitation: {
      type: GraphQLString,
    },
  },
});

export default newScheduledGame;
