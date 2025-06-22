const asyncHandler = require('../../utils/async/asyncHandler');
const getByHostService = require('../../services/listing/getByHost');

exports.getMyListings = asyncHandler(async (req, res) => {
  const data = await getByHostService(req.user._id);
  res.status(200).json({ success: true, data });
});