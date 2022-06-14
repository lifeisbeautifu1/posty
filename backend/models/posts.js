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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Posts', PostsSchema);
