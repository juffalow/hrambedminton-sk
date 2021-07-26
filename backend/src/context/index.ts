import Context from './Context';
import PlayerRepository from '../repositories/MongoosePlayerRepository';
import GameRepository from '../repositories/MongooseGameRepository';
import ContactMessageRepository from '../repositories/contactMessage/MongooseContactMessageRepository';

const context: Context = {
  repositories: {
    player: new PlayerRepository(),
    game: new GameRepository(),
    contactMessage: new ContactMessageRepository(),
  },
};

export default context;
