import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Bookmark', bookmarkSchema);
