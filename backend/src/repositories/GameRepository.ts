export interface CreateParameters {
  id: string;
  title: string;
  place: string;
  court: string;
  description: string;
  players: Array<{ playerId: string } | { name: string; email: string }>;
  sets?: {
    team1Players: {
      id?: string;
      firstName?: string;
      lastName?: string;
    };
    team2Players: {
      id?: string;
      firstName?: string;
      lastName?: string;
    };
    team1Score: number;
    team2Score: number;
  };
  playedAt: string;
}

export interface FindParameters {
  first: number;
  offset: number;
  playedAt?: {
    from?: string;
    to?: string;
  };
  createdAt?: {
    from?: string;
    to?: string;
  };
  orderBy?: Array<OrderBy>
}

export interface CountParameters {
  playedAt?: {
    from?: string;
    to?: string;
  };
  createdAt?: {
    from?: string;
    to?: string;
  };
}

export interface UpdateParameters {
  id: string;
  firstName?: string;
  lastName?: string;
}

export default interface GameRepository {
  get(id: string): Promise<Game>;

  create(params: CreateParameters): Promise<Game>;

  find(params: FindParameters): Promise<Game[]>;

  count(params: CountParameters): Promise<number>;

  update(params: UpdateParameters): Promise<Game>;
}
