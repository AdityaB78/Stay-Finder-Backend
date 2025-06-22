const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/env');

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { verifyToken };