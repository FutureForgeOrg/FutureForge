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
  },
});

// Create compound unique index to prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, jobId: 1 }, { unique: true });

export default mongoose.model('Bookmark', bookmarkSchema);
