type ID = string;

interface Player {
  email: string;
  name: string;
}

interface Guest {
  email: string;
  name: string;
}

interface Event {
  id: ID;
  name: string;
  description: string;
  date: string;
  time: string;
  timeZone: string;
  startsAt: string;
  maxPlayers: number;
}

interface EventPlayer {
  id: ID;
  name: string;
  role: string;
  status: string;
  team: string;
  joinedAt: string;
}

interface User {
  id?: ID;
  username?: string;
  email?: string;
  name?: string;
  accessToken: string;
  idToken: string;
  meta?: Record<string, string | number | boolean>;
}
