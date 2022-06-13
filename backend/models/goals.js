const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide text field'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goals', GoalsSchema);
