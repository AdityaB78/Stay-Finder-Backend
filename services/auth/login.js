const ErrorResponse = require('../../utils/error/ErrorResponse');
const User = require('../../models/User');
const { generateToken } = require('../../utils/jwt/generateToken');

const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ErrorResponse('Please provide email and password', 400);
  }

  // Find user by email and include password field
  const user = await User.findByEmail(email);
  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Use matchPassword() method to compare hashed password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Create JWT token
  const token = generateToken(user._id);

  // Return user info without password
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isHost: user.isHost,
    },
    token,
  };
};

module.exports = loginService;
