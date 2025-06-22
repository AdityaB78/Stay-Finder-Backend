const asyncHandler = require('../../utils/async/asyncHandler');
const getUserService = require('../../services/auth/getUser');

exports.getMe = asyncHandler(async (req, res) => {
  const data = await getUserService(req.user);
  
  res.status(200).json({ success: true, data:data.user });
});