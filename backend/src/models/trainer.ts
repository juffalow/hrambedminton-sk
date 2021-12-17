import mongoose from 'mongoose';

const trainer = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  shortDescription: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Trainer', trainer);
