import mongoose from 'mongoose';

const gameSet = new mongoose.Schema({
  team1Players: [{
    playerId: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
  }],
  team2Players: [{
    playerId: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
  }],
  team1Score: Number,
  team2Score: Number,
});

const game = new mongoose.Schema({
  title: String,
  place: String,
  court: String,
  type: {
    type: String,
    enum: [ 'SINGLES', 'DOUBLES', 'MIX', 'OTHER' ],
  },
  description: String,
  invitation: String,
  isEmailNotificationEnabled: Boolean,
  sets: [gameSet],
  playedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Game', game);