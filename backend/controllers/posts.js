const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Posts = require('../models/posts');
const Users = require('../models/user');
const Comment = require('../models/comment');

const getPosts = async (req, res) => {
  const posts = await Posts.find({ createdBy: req.user.id }).sort('-createdAt');
  res.status(StatusCodes.OK).json(posts);
};

const getPost = async (req, res) => {
  let post = await Posts.findById(req.params.id).populate('comments');
  post = await Users.populate(post, {
    path: 'comments.author',
    select: 'name image',
  });
  res.status(StatusCodes.OK).json(post);
};

const getAllPosts = async (req, res) => {
  const posts = await Posts.find().sort('-createdAt');
  res.status(StatusCodes.OK).json(posts);
};

const createPost = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const user = await Users.findById(req.user.id);
  const post = await Posts.create({
    text: req.body.text,
    author: req.user.name,
    createdBy: req.user.id,
    image: user.image,
  });
  res.status(StatusCodes.CREATED).json(post);
};

const updatePost = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  let post = await Posts.findOne({
    _id: req.params.id,
  });
  if (!post)
    throw new NotFoundError(`post with id ${req.params.id} doesnt exist`);
  if (post.createdBy.toString() !== req.user.id)
    throw new NotFoundError(`post with id ${req.params.id} doesnt exist`);
  post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(post);
};

const deletePost = async (req, res) => {
  const post = await Posts.findOneAndDelete({
    createdBy: req.user.id,
    _id: req.params.id,
  });
  if (!post)
    throw new NotFoundError(`post with id ${req.params.id} doesnt exist`);
  res.status(StatusCodes.OK).json({ id: req.params.id });
};

const likePost = async (req, res) => {
  let post = await Posts.findById(req.params.id);
  if (!post) throw new NotFoundError(`Post with id ${postId} does not exist!`);
  if (post.likes.includes(req.user.id)) {
    post.likes = post.likes.filter((id) => id !== req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  post = await Posts.findByIdAndUpdate(req.params.id, post, {
    new: true,
    runValidators: true,
  });
  const posts = await Posts.find().sort('-createdAt');
  res.status(StatusCodes.OK).json(posts);
};

const commentOnPost = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new BadRequestError('Please provide comment');
  }
  const newComment = {
    content,
    author: req.user.id,
  };
  let comment = await Comment.create(newComment);
  let post = await Posts.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: comment,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate('comments');

  post = await Users.populate(post, {
    path: 'comments.author',
    select: 'name image',
  });
  return res.status(StatusCodes.CREATED).json(post);
};

const deleteCommentOnPost = async (req, res) => {
  let comment = await Comment.findById(req.body.id);
  let post = await Posts.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: comment._id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate('comments');
  post = await Users.populate(post, {
    path: 'comments.author',
    select: 'name image',
  });
  return res.status(StatusCodes.OK).json(post);
};

module.exports = {
  getPosts,
  getAllPosts,
  updatePost,
  deletePost,
  createPost,
  likePost,
  getPost,
  commentOnPost,
  deleteCommentOnPost,
};
