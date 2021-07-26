import PlayerRepository from '../repositories/PlayerRepository';
import GameRepository from '../repositories/GameRepository';
import ContactMessageRepository from '../repositories/contactMessage/ContactMessageRepository';

interface RepositoriesContext {
  player: PlayerRepository;
  game: GameRepository;
  contactMessage: ContactMessageRepository;
}

interface PlayerContext {
  player: {
    id: string;
  }
}

export default interface Context {
  repositories: RepositoriesContext;
  player?: PlayerContext;
}
