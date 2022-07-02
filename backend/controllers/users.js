const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');

const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError('Please provide all fields');
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
    following: user.following,
    followers: user.followers,
    image: user.image,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all fields');
  }
  const user = await User.findOne({ email });
  if (!user) throw new UnauthorizedError('Invalid credentials');
  const isMatch = await user.comparePasswords(password);
  if (!isMatch) throw new UnauthorizedError('Invalid credentials');
  const token = user.createJWT();
  res.status(StatusCodes.OK).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
    following: user.following,
    followers: user.followers,
    image: user.image,
  });
};

const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  const allUsers = await User.find(keyword)
    .find({
      _id: {
        $ne: req.user.id,
      },
    })
    .select('_id name email following followers image');
  res.status(StatusCodes.OK).json(allUsers);
};

const followUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user)
    throw new NotFoundError(`User with id ${req.params.id} doesn't exist!`);
  let follower = await User.findById(req.user.id);
  if (user.followers.includes(req.user.id)) {
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          followers: req.user.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    follower = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          following: req.params.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          followers: req.user.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    follower = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          following: req.params.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  return res.status(StatusCodes.OK).json({
    id: follower._id,
    name: follower.name,
    email: follower.email,
    token: req.user.token,
    following: follower.following,
    followers: follower.followers,
  });

};

const getInformation = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  register,
  login,
  getInformation,
  getAllUsers,
  followUser,
};
