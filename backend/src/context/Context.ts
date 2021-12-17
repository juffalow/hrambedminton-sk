import PlayerRepository from '../repositories/PlayerRepository';
import GameRepository from '../repositories/GameRepository';
import ContactMessageRepository from '../repositories/contactMessage/ContactMessageRepository';
import PlaceRepository from '../repositories/place/PlaceRepository';
import MailLogRepository from '../repositories/mailLog/MailLogRepository';
import NotificationsInterface from '../notifications/NotificationsInterface';

interface RepositoriesContext {
  player: PlayerRepository;
  place: PlaceRepository;
  game: GameRepository;
  contactMessage: ContactMessageRepository;
  mailLog: MailLogRepository;
}

interface PlayerContext {
  id: string;
  role: 'ADMIN' | 'PLAYER' | 'PUBLIC',
}

export default interface Context {
  repositories: RepositoriesContext;
  player?: PlayerContext;
  notifications: NotificationsInterface;
}
