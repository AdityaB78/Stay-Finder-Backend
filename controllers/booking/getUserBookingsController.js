const asyncHandler = require('../../utils/async/asyncHandler');
const getByUserService = require('../../services/booking/getByUser');

exports.getUserBookings = asyncHandler(async (req, res) => {
  const data = await getByUserService(req.user._id);
  res.status(200).json({ success: true, data });
});