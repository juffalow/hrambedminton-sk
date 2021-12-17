import { GraphQLNonNull } from 'graphql';
import updatePlayerInput from '../inputs/updatePlayerInput';
import { default as PlayerType } from '../types/player';
import Context from '../../context/Context';
import logger from '../../logger';

const updatePlayer = {
  type: PlayerType,
  args: {
    input: {
      type: GraphQLNonNull(updatePlayerInput),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<Player> => {
    logger.debug('UpdatePlayerMutation', { player: context.player, input });

    if (context.player.role === 'PUBLIC' || (context.player.role === 'PLAYER' && context.player.id !== input.id)) {
      throw 'Unable to run this mutation!';
    }
    
    return context.repositories.player.update(input);
  },
};

export default updatePlayer;
