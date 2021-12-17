interface Player {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Trainer {
  name: string;
  email: string;
  phone: string;
  description: string;
  image: string;
  cities: string[];
  halls: string[];
}

interface Game {
  id: string;
  _id: string;
  title: string;
  place: string;
  court: string;
  playedAt: string;
  type: 'SINGLES' | 'DOUBLES' | 'MIX' | 'OTHER';
  description: string;
  players: Array<Player | { name: string; email: string }>;
  invitation?: string;
  isEmailNotificationEnabled?: boolean;
}
