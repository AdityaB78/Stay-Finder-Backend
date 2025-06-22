const { verifyToken } = require('./verifyToken');
const ErrorResponse = require('../../utils/error/ErrorResponse');
const User = require('../../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1] 
    : null;

  if (!token) {
    return next(new ErrorResponse('Not authorized, no token', 401));
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized, token failed', 401));
  }
};

module.exports = protect;