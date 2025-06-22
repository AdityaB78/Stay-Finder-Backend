const asyncHandler = require('../../utils/async/asyncHandler');
const loginService = require('../../services/auth/login');

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService({ email, password });
  res.status(200).json({ success: true, data });
});