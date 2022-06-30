const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide text field'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide author of the post'],
      ref: 'Users',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Posts', PostsSchema);
