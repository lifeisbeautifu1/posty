const express = require('express');

const router = express.Router();

const { login, register, getInformation } = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/me', auth, getInformation);

module.exports = router;
