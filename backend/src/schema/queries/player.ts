import { GraphQLID, GraphQLNonNull } from 'graphql';
import Context from '../../context/Context';
import { default as PlayerType } from '../types/player';
import { getStringId } from '../../utils/functions';
import logger from '../../logger';

const player = {
  player: {
    type: PlayerType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (_, { id }, context: Context): Promise<Player> => {
      logger.debug('PlayerQuery', { id });

      const playerId = <string> getStringId(id, 'player');

      return context.repositories.player.get(playerId);
    },
  },
};

export default player;