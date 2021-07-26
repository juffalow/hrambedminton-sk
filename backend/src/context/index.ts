import Context from './Context';
import PlayerRepository from '../repositories/MongoosePlayerRepository';
import GameRepository from '../repositories/MongooseGameRepository';
import ContactMessageRepository from '../repositories/contactMessage/MongooseContactMessageRepository';
import MailNotifications from '../notifications/MailNotifications';

const context: Context = {
  repositories: {
    player: new PlayerRepository(),
    game: new GameRepository(),
    contactMessage: new ContactMessageRepository(),
  },
  notifications: new MailNotifications(),
};

export default context;
