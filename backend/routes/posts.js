const express = require('express');

const posts = express.Router();

const {
  getPosts,
  getPost,
  getAllPosts,
  updatePost,
  createPost,
  deletePost,
  likePost,
} = require('../controllers/posts');

posts.get('/', getPosts);

posts.get('/:id', getPost);

posts.get('/all', getAllPosts);

posts.post('/', createPost);

posts.patch('/:id', updatePost);

posts.delete('/:id', deletePost);

posts.get('/like/:id', likePost);

module.exports = posts;
