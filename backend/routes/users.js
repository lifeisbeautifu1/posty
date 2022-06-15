const express = require('express');

const router = express.Router();

const {
  login,
  register,
  getInformation,
  getAllUsers,
  toggleFollow,
} = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/me', auth, getInformation);

router.get('/', auth, getAllUsers);

router.post('/follow/:id', auth, toggleFollow);

module.exports = router;
