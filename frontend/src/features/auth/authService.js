import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/api/users',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user'))?.token
    }`;
  }
  return req;
});

const register = async (userData) => {
  const res = await API.post('/register', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await API.post('/login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

const followUser = async (id) => {
  const res = await API.get('/follow/' + id);
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
  followUser,
};

export default authService;
