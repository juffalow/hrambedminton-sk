import { GraphQLNonNull } from 'graphql';
import newGame from '../inputs/newGame';
import { default as GameType } from '../types/game';
import Context from '../../context/Context';
import logger from '../../logger';

const createGame = {
  type: GameType,
  args: {
    input: {
      type: GraphQLNonNull(newGame),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<Game> => {
    logger.debug('CreateGameMutation', input);
    
    return context.repositories.game.create(input);
  },
};

export default createGame;
