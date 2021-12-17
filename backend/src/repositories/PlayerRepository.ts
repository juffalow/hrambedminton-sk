export interface CreateParameters {
  firstName: string,
  lastName: string,
  email: string;
  password: string;
}

export interface FindParameters {
  first: number;
  offset: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: {
    from?: string;
    to?: string;
  };
  orderBy?: Array<OrderBy>
}

export interface CountParameters {
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: {
    from?: string;
    to?: string;
  };
}

export interface UpdateParameters {
  id: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  refreshTokens?: {
    expiresAt: string;
    token: string;
  }[];
}

export default interface PlayerRepository {
  get(id: string): Promise<Player>;

  create(params: CreateParameters): Promise<Player>;

  find(params: FindParameters): Promise<Player[]>;

  count(params: CountParameters): Promise<number>;

  update(params: UpdateParameters): Promise<Player>;
}
