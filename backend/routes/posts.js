const express = require('express');

const posts = express.Router();

const {
  getPosts,
  updatePost,
  createPost,
  deletePost,
} = require('../controllers/posts');

posts.get('/', getPosts);

posts.post('/', createPost);

posts.patch('/:id', updatePost);

posts.delete('/:id', deletePost);

module.exports = posts;
