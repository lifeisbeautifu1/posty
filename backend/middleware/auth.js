const { UnauthorizedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith('Bearer'))
    throw new UnauthorizedError('token not provided');
  const token = authHeaders.split(' ')[1];
  try {
    const { id, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id,
      name,
      token,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError('authentication error');
  }
};

module.exports = authMiddleware;
