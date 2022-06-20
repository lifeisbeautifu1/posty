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
  const allUsers = await User.find().select(
    '_id name email following followers image'
  );
  res.status(StatusCodes.OK).json(allUsers);
};

const followUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user)
    throw new NotFoundError(`User with id ${req.body.id} doesn't exist!`);
  let follower = await User.findById(req.user.id);
  if (user.followers.includes(req.user.id)) {
    user.followers = user.followers.filter((id) => {
      return id !== req.user.id;
    });
    follower.following = follower.following.filter((id) => {
      return id !== req.params.id;
    });
  } else {
    user.followers.push(req.user.id);
    follower.following.push(req.params.id);
  }
  user = await User.findByIdAndUpdate(user._id, user, {
    runValidators: true,
    new: true,
  });
  follower = await User.findByIdAndUpdate(follower._id, follower, {
    runValidators: true,
    new: true,
  });
  return res.status(StatusCodes.OK).json({
    id: follower._id,
    name: follower.name,
    email: follower.email,
    token: req.user.token,
    following: follower.following,
    followers: follower.followers,
  });
  // res.status(StatusCodes.OK).json({ user, follower });
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
