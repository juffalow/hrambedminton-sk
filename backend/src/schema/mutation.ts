
import { GraphQLObjectType } from 'graphql';
import createPlayer from './mutations/createPlayer';
import createGame from './mutations/createGame';
import createContactMessage from './mutations/createContactMessage';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer,
    createGame,
    createContactMessage,
  },
});

export default mutationType;
