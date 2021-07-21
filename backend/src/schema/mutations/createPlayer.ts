import { GraphQLNonNull } from 'graphql';
import newPlayer from '../inputs/newPlayer';
import { default as PlayerType } from '../types/player';
import Context from '../../context/Context';
import logger from '../../logger';

const createPlayer = {
  type: PlayerType,
  args: {
    input: {
      type: GraphQLNonNull(newPlayer),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<Player> => {
    logger.debug('CreatePlayerMutation', input);
    
    return context.repositories.player.create(input);
  },
};

export default createPlayer;
