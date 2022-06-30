const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 8,
    },
    image: {
      type: String,
      required: [true, 'Please select profile image'],
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

UserSchema.methods.comparePasswords = async function (candidate) {
  const isMatch = await bcryptjs.compare(candidate, this.password);
  return isMatch;
};

module.exports = mongoose.model('Users', UserSchema);
