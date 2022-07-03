const User = require('../models/user');
const Chat = require('../models/chat');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId)
    throw new BadRequestError('userId params not sent with request!');
  let isChat = await Chat.find({
    $and: [
      {
        users: {
          $elemMatch: {
            $eq: req.user.id,
          },
        },
      },
      {
        users: {
          $elemMatch: {
            $eq: userId,
          },
        },
      },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name image',
  });

  if (isChat.length > 0) {
    res.status(StatusCodes.OK).json(isChat[0]);
  } else {
    const chatData = {
      chatName: 'sender',
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      console.log(createdChat);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate('users', '-password');
      res.status(StatusCodes.OK).json(fullChat);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      users: {
        $elemMatch: {
          $eq: req.user.id,
        },
      },
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .sort({
        updatedAt: -1,
      });
    const result = await User.populate(chat, {
      path: 'latestMessage.sender',
      select: 'name image',
    });
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

module.exports = {
  accessChat,
  fetchChats,
};
