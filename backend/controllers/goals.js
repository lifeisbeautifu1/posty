const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Goals = require('../models/goals');

const getGoals = async (req, res) => {
  const goals = await Goals.find();
  res.status(StatusCodes.OK).json({ count: goals.length, goals });
};

const createGoal = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const newGoal = await Goals.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'success!', newGoal });
};

const updateGoal = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedGoal) throw new NotFoundError(`cant find goal`);
  res.status(StatusCodes.OK).json({ updatedGoal });
};

const deleteGoal = async (req, res) => {
  const goal = await Goals.findByIdAndDelete(req.params.id);
  if (!goal) throw new NotFoundError('cant find goal');
  res.status(StatusCodes.OK).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  updateGoal,
  deleteGoal,
  createGoal,
};
