const BadRequestError = require('./BadRequest');
const CustomAPIError = require('./Error');
const NotFoundError = require('./NotFound');
const UnauthorizedError = require('./Unauthorized');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  CustomAPIError,
};
