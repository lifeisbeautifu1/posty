import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/api/message',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user'))?.token
    }`;
  }
  return req;
});

const getAllMessages = async (chatId) => {
  const { data } = await API.get('/' + chatId);
  return data;
};

const sendMessage = async (message) => {
  const { data } = await API.post('/', message);
  return data;
};

const messageService = {
  getAllMessages,
  sendMessage,
};

export default messageService;
