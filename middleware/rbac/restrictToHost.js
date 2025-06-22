const ErrorResponse = require('../../utils/error/ErrorResponse');

const restrictToHost = (req, res, next) => {
  if (!req.user.isHost) {
    return next(new ErrorResponse('Access denied, hosts only', 403));
  }
  next();
};

module.exports = restrictToHost;