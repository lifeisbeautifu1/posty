import axios from 'axios';

const API_URL = '/api/users/';

const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
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
  const res = await axios.get(API_URL + 'follow/' + id, config);
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
