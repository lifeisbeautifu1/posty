const express = require('express');

const goals = express.Router();

const {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
} = require('../controllers/goals');

goals.get('/', getGoals);

goals.post('/', createGoal);

goals.patch('/:id', updateGoal);

goals.delete('/:id', deleteGoal);

module.exports = goals;
