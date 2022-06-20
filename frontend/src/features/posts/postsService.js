import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/posts',
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

const getMyPosts = async () => {
  const res = await API.get('/');

  return res.data;
};

const getAllPosts = async () => {
  const res = await API.get('/all');
  return res.data;
};

const likePost = async (id) => {
  const res = await API.get(`/like/${id}`);
  return res.data;
};

const postsService = {
  getMyPosts,
  getAllPosts,
  deletePost,
  createPost,
  editPost,
  likePost,
};

export default postsService;
