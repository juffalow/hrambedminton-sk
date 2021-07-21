import mongoose from 'mongoose';

const player = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Player', player);