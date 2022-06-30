const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide comment'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide author of the post'],
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
