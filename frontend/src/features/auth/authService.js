import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
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

const followUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await API.get('/follow/' + id, config);
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
