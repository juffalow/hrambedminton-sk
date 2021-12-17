import { GraphQLObjectType } from 'graphql';
import player from './queries/player';
import players from './queries/players';
import places from './queries/places';
import games from './queries/games';
import mailLogs from './queries/mailLogs';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    ...player,
    ...players,
    ...places,
    ...games,
    ...mailLogs,
  }),
});

export default queryType;
