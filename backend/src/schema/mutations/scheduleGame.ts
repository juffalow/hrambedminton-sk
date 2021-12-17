import { GraphQLNonNull } from 'graphql';
import newScheduledGame from '../inputs/scheduledGame/newScheduledGame';
import { default as GameType } from '../types/game';
import Context from '../../context/Context';
import logger from '../../logger';

const scheduleGame = {
  type: GameType,
  args: {
    input: {
      type: GraphQLNonNull(newScheduledGame),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<Game> => {
    logger.debug('ScheduleGameMutation', input);
    
    return context.repositories.game.create(input);
  },
};

export default scheduleGame;
