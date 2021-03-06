const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError)
    return res.status(err.statusCode).json({ message: err.message });
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = errorHandlerMiddleware;
