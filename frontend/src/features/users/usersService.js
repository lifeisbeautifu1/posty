import axios from 'axios';

const API_URL = '/api/users';

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

const usersService = {
  getAllUsers,
};

export default usersService;
