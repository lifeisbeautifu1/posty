const express = require('express');

const chatRouter = express.Router();

const { accessChat, fetchChats } = require('../controllers/chat');

chatRouter.get('/', fetchChats);
chatRouter.post('/', accessChat);

module.exports = chatRouter;
