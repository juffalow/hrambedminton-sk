import { GraphQLObjectType } from 'graphql';
import player from './queries/player';
import players from './queries/players';
import games from './queries/games';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    ...player,
    ...players,
    ...games,
  }),
});

export default queryType;
