const { BadRequestError } = require('../errors/');

const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');

const { StatusCodes } = require('http-status-codes');

const getAllMessages = async (req, res) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  })
    .populate('sender', 'name image')
    .populate('chat');
  res.status(StatusCodes.OK).json(messages);
};

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId)
    throw new BadRequestError('Invalid data passed into request.');

  const newMessage = {
    sender: req.user.id,
    content,
    chat: chatId,
  };

  let message = await Message.create(newMessage);

  message = await message.populate('sender', 'name image');

  message = await message.populate('chat');

  message = await User.populate(message, {
    path: 'chat.users',
    select: 'name image',
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  res.status(StatusCodes.OK).json(message);
};

module.exports = {
  sendMessage,
  getAllMessages,
};
