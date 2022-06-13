const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide text field'],
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

module.exports = mongoose.model('Goals', GoalsSchema);
