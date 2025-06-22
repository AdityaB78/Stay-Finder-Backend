const User = require('../../models/User');
const { generateToken } = require('../../utils/jwt/generateToken');

const registerService = async ({ name, email, password, isHost }) => {
  const user = await User.create({ name, email, password, isHost });
  const token = generateToken(user._id);
  return { user: { id: user._id, name, email, isHost }, token };
};

module.exports = registerService;