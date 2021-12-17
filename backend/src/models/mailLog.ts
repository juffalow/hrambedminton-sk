import mongoose from 'mongoose';

const mailLog = new mongoose.Schema({
  fromEmail: String,
  fromName: String,
  replyToEmail: String,
  replyToName: String,
  addresses: [String],
  subject: String,
  body: String,
  isSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('MailLog', mailLog);
