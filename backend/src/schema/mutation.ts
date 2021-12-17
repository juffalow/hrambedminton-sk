
import { GraphQLObjectType } from 'graphql';
import createPlayer from './mutations/createPlayer';
import updatePlayer from './mutations/updatePlayer';
import createPlace from './mutations/createPlace';
import createGame from './mutations/createGame';
import scheduleGame from './mutations/scheduleGame';
import createContactMessage from './mutations/createContactMessage';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer,
    updatePlayer,
    createPlace,
    createGame,
    scheduleGame,
    createContactMessage,
  },
});

export default mutationType;
