export default interface Notifications {
  newPlayer(player: Player): Promise<void>;
}
