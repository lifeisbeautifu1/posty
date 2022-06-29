import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';

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

const getAllUsers = async () => {
  const res = await API.get('/');
  return res.data;
};


const usersService = {
  getAllUsers,
};

export default usersService;
