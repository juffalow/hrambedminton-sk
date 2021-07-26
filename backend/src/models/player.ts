import mongoose from 'mongoose';

const player = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
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