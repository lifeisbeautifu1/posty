import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/api/posts',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }
  return req;
});

const createPost = async (postData) => {
  const res = await API.post('/', postData);
  return res.data;
};

const deletePost = async (id) => {
  const res = await API.delete('/' + id);

  return res.data;
};

const editPost = async (postData) => {
  const res = await API.patch('/' + postData.id, postData);
  return res.data;
};

const getMyPosts = async (page) => {
  const res = await API.get('/?page=' + page);
  return res.data;
};

const getPost = async (id) => {
  const { data } = await API.get('/' + id);
  return data;
};

const commentOnPost = async (id, text) => {
  const { data } = await API.post('/comment/' + id, {
    content: text,
  });
  return data;
};

const deleteCommentOnPost = async (postId, commentId) => {
  const { data } = await API.post('/comment/delete/' + postId, {
    id: commentId,
  });
  return data;
};

const getAllPosts = async (page) => {
  const res = await API.get('/all?page=' + page);
  return res.data;
};

const getFollowingPosts = async (page) => {
  const res = await API.get('/following?page=' + page);
  return res.data;
};

const likePost = async (id) => {
  const res = await API.get(`/like/${id}`);
  return res.data;
};

const postsService = {
  getMyPosts,
  getPost,
  getAllPosts,
  getFollowingPosts,
  deletePost,
  createPost,
  editPost,
  likePost,
  commentOnPost,
  deleteCommentOnPost,
};

export default postsService;
