
import { GraphQLObjectType } from 'graphql';
import createPlayer from './mutations/createPlayer';
import createGame from './mutations/createGame';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer,
    createGame,
  },
});

export default mutationType;
