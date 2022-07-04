import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/api/chat',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user'))?.token
    }`;
  }
  return req;
});

const accessChat = async (userId) => {
  const { data } = await API.post('/', {
    userId,
  });
  return data;
};

const chatService = {
  accessChat,
};

export default chatService;
