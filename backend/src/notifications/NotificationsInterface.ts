export default interface Notifications {
  newPlayer(player: Player): Promise<void>;

  newContactMessage(contactMessage: ContactMessage): Promise<void>;

  newScheduledGame(): Promise<void>;
}
