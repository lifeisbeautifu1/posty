const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');
const Posts = require('../models/posts');

const getPosts = async (req, res) => {
  const posts = await Posts.find({ createdBy: req.user.id });
  res.status(StatusCodes.OK).json(posts);
};

const createPost = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const post = await Posts.create({
    text: req.body.text,
    createdBy: req.user.id,
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

module.exports = {
  getPosts,
  updatePost,
  deletePost,
  createPost,
};
