import PlayerRepository from '../repositories/PlayerRepository';
import GameRepository from '../repositories/GameRepository';
import ContactMessageRepository from '../repositories/contactMessage/ContactMessageRepository';
import NotificationsInterface from '../notifications/NotificationsInterface';

interface RepositoriesContext {
  player: PlayerRepository;
  game: GameRepository;
  contactMessage: ContactMessageRepository;
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
