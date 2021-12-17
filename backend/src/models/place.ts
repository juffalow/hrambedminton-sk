import mongoose from 'mongoose';

const place = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Place', place);
