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

const posts = require('./routes/posts');
const users = require('./routes/users');

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: false, limit: '30mb' }));

app.use('/api/posts', auth, posts);
app.use('/api/users', users);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
