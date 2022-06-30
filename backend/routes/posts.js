const express = require('express');

const posts = express.Router();

const {
  getPosts,
  getPost,
  getAllPosts,
  getFollowingPosts,
  updatePost,
  createPost,
  deletePost,
  likePost,
  commentOnPost,
  deleteCommentOnPost,
} = require('../controllers/posts');

posts.get('/', getPosts);

posts.get('/all', getAllPosts);

posts.get('/following', getFollowingPosts);

posts.get('/:id', getPost);

posts.post('/', createPost);

posts.patch('/:id', updatePost);

posts.delete('/:id', deletePost);

posts.get('/like/:id', likePost);

posts.post('/comment/:id', commentOnPost);

posts.post('/comment/delete/:id', deleteCommentOnPost);

module.exports = posts;
