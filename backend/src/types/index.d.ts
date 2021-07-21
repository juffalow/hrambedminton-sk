interface Player {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderBy {
  field: string;
  direction: string;
}

interface Place {
  id: string;
  name: string;
}

interface GameSet {
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
}

interface Game {
  id: string;
  placeId: string;
  sets: GameSet[];
  note: string;
  createdAt: string;
  updatedAt: string;
}
