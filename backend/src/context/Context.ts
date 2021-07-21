import PlayerRepository from '../repositories/PlayerRepository';
import GameRepository from '../repositories/GameRepository';

interface RepositoriesContext {
  player: PlayerRepository;
  game: GameRepository;
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
