const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Posts = require('../models/posts');
const Users = require('../models/user');
const Comment = require('../models/comment');


const getPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const allPosts = await Posts.find({ author: req.user.id });

  const posts = await Posts.find({ author: req.user.id })
    .populate('author', 'name image')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    posts,
    numberOfPages: Math.ceil(allPosts.length / limit),
    currentPage: page,
  });
};

const getFollowingPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const me = await Users.findById(req.user.id);
  const allPosts = await Posts.find({
    author: {
      $in: me.following,
    },
  });
  const posts = await Posts.find({
    author: {
      $in: me.following,
    },
  })
    .populate('author', 'name image')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    posts,
    numberOfPages: Math.ceil(allPosts.length / limit),
    currentPage: +page,
  });
};

const getPost = async (req, res) => {
  let post = await Posts.findById(req.params.id)
    .populate('author', 'name image')
    .populate('comments');
  if (!post)
    throw new BadRequestError('Post with id' + req.params.id + 'doesnt exist!');
  post = await Users.populate(post, {
    path: 'comments.author',
    select: 'name image',
  });
  res.status(StatusCodes.OK).json(post);
};

const getAllPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const total = await Posts.countDocuments();
  const numberOfPages = Math.ceil(total / limit);

  const posts = await Posts.find()
    .populate('author', 'name image')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);
  res.status(StatusCodes.OK).json({
    posts,
    numberOfPages,
    currentPage: +page,
  });
};

const createPost = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  let post = await Posts.create({
    text: req.body.text,
    author: req.user.id,
  });
  post = await Posts.findById(post._id).populate('author', 'name image');
  res.status(StatusCodes.CREATED).json(post);
};

const updatePost = async (req, res) => {
  if (!req.body.text) throw new BadRequestError('Please provide text field!');
  const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('author', 'name image');
  if (!post)
    throw new NotFoundError(`post with id ${req.params.id} doesnt exist`);
  res.status(StatusCodes.OK).json(post);
};

const deletePost = async (req, res) => {
  const post = await Posts.findOneAndDelete({
    author: req.user.id,
    _id: req.params.id,
  });
  if (!post)
    throw new NotFoundError(`post with id ${req.params.id} doesnt exist`);
  res.status(StatusCodes.OK).json({ id: req.params.id });
};

const likePost = async (req, res) => {
  let post = await Posts.findById(req.params.id);
  if (!post)
    throw new NotFoundError(`Post with id ${req.params.id} does not exist!`);
  if (post.likes.includes(req.user.id)) {
    post = await Posts.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.user.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    post = await Posts.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          likes: req.user.id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  const posts = await Posts.find()
    .populate('author', 'name image')
    .sort('-createdAt');
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
  )
    .populate('author', 'name image')
    .populate('comments');

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
  )
    .populate('author', 'name image')
    .populate('comments');
  post = await Users.populate(post, {
    path: 'comments.author',
    select: 'name image',
  });
  return res.status(StatusCodes.OK).json(post);
};

module.exports = {
  getPosts,
  getAllPosts,
  getFollowingPosts,
  updatePost,
  deletePost,
  createPost,
  likePost,
  getPost,
  commentOnPost,
  deleteCommentOnPost,
};
