const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');
const Goals = require('../models/goals');

const getGoals = async (req, res) => {
  const goals = await Goals.find({ createdBy: req.user.id });
  res.status(StatusCodes.OK).json({ count: goals.length, goals });
};

const createGoal = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const goal = await Goals.create({
    text: req.body.text,
    createdBy: req.user.id,
  });
  res.status(StatusCodes.CREATED).json({ goal });
};

const updateGoal = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');

  let goal = await Goals.findOne({
    _id: req.params.id,
  });
  if (!goal)
    throw new NotFoundError(`goal with id ${req.params.id} doesnt exist`);
  if (goal.createdBy.toString() !== req.user.id)
    throw new NotFoundError(`goal with id ${req.params.id} doesnt exist`);
  goal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ goal });
};

const deleteGoal = async (req, res) => {
  const goal = await Goals.findOneAndDelete({
    createdBy: req.user.id,
    _id: req.params.id,
  });
  if (!goal)
    throw new NotFoundError(`goal with id ${req.params.id} doesnt exist`);
  res.status(StatusCodes.OK).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  updateGoal,
  deleteGoal,
  createGoal,
};
