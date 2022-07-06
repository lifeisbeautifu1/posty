const express = require('express');
require('express-async-errors');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
const xss = require('xss-clean');
const helmet = require('helmet');
require('colors');
const cors = require('cors');
require('dotenv').config();

const { Server } = require('socket.io');

const posts = require('./routes/posts');
const users = require('./routes/users');
const message = require('./routes/message');
const chat = require('./routes/chat');

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: false, limit: '30mb' }));

app.use('/api/posts', auth, posts);
app.use('/api/users', users);
app.use('/api/message', auth, message);
app.use('/api/chat', auth, chat);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

let server;
let io;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold);
    });
    io = new Server(server, {
      cors: {
        origin: '*',
      },
    });
    io.on('connection', (socket) => {
      socket.on('setup', (userData) => {
        socket.join(userData.id);
        socket.emit('connected');
      });
      socket.on('joinChat', (room) => {
        socket.join(room);
        // console.log('User joined room ' + room);
      });
      socket.on('newMessage', (id) => {
        // const chat = newMessageReceived.chat;
        // if (!chat.users) return;
        // chat.users.forEach((user) => {
        //   if (user._id === newMessageReceived.sender._id) return;
        //   socket.in(user._id).emit('messageReceived', newMessageReceived);
        // });
        socket.in(id).emit('messageReceived');
      });
      socket.off('setup', () => {
        socket.leave(userData.id);
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();


