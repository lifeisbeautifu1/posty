const express = require('express');

const posts = express.Router();

const {
  getPosts,
  getAllPosts,
  updatePost,
  createPost,
  deletePost,
} = require('../controllers/posts');

posts.get('/', getPosts);

posts.get('/all', getAllPosts);

posts.post('/', createPost);

posts.patch('/:id', updatePost);

posts.delete('/:id', deletePost);

module.exports = posts;
