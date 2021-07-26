
import { GraphQLObjectType } from 'graphql';
import createPlayer from './mutations/createPlayer';
import updatePlayer from './mutations/updatePlayer';
import createGame from './mutations/createGame';
import createContactMessage from './mutations/createContactMessage';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer,
    updatePlayer,
    createGame,
    createContactMessage,
  },
});

export default mutationType;
