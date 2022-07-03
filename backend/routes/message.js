const express = require('express');

const messageRouter = express.Router();

const { getAllMessages, sendMessage } = require('../controllers/message');

messageRouter.post('/', sendMessage);
messageRouter.get('/:chatId', getAllMessages);

module.exports = messageRouter;
