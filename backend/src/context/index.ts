import Context from './Context';
import PlayerRepository from '../repositories/MongoosePlayerRepository';
import GameRepository from '../repositories/MongooseGameRepository';

const context: Context = {
  repositories: {
    player: new PlayerRepository(),
    game: new GameRepository(),
  },
};

export default context;
