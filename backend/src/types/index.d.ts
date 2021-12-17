interface Player {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshTokens: [{
    expiresAt: string;
    token: string;
  }];
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
  title: string;
  place: string;
  court: string;
  sets: GameSet[];
  type: 'SINGLES' | 'DOUBLES' | 'MIX' | 'OTHER';
  description: string;
  hasNotifications: boolean;
  privateNote: string;
  createdAt: string;
  updatedAt: string;
  playedAt: string;

  invitation: string;
  isEmailNotificationEnabled: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Place {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface MailLog {
  id: string;
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  replyToName: string;
  addresses: string[];
  subject: string;
  body: string;
  isSent: boolean;
  createdAt: string;
  sentAt: string;
}