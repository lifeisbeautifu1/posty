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
  res
    .status(StatusCodes.CREATED)
    .send({ id: user._id, name: user.name, email: user.email, token });
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
  res
    .status(StatusCodes.OK)
    .send({ id: user._id, name: user.name, email: user.email, token });
};

const getInformation = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

module.exports = {
  register,
  login,
  getInformation,
};
