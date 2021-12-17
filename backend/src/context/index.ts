import Context from './Context';
import PlayerRepository from '../repositories/MongoosePlayerRepository';
import GameRepository from '../repositories/MongooseGameRepository';
import ContactMessageRepository from '../repositories/contactMessage/MongooseContactMessageRepository';
import PlaceRepository from '../repositories/place/MongoosePlaceRepository';
import MailLogRepository from '../repositories/mailLog/MongooseMailLogRepository';
import MailNotifications from '../notifications/MailNotifications';

const context: Context = {
  repositories: {
    player: new PlayerRepository(),
    place: new PlaceRepository(),
    game: new GameRepository(),
    contactMessage: new ContactMessageRepository(),
    mailLog: new MailLogRepository(),
  },
  notifications: new MailNotifications(),
};

export default context;
