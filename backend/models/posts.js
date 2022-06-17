const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide text field'],
    },
    author: {
      type: String,
      required: [true, 'Please provide author of the post'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide user'],
      ref: 'Users',
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Posts', PostsSchema);
