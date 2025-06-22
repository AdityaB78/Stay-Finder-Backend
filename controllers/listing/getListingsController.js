const asyncHandler = require('../../utils/async/asyncHandler');
const getAllListingsService = require('../../services/listing/getAll');

exports.getListings = asyncHandler(async (req, res) => {
  const { location } = req.query;
  const data = await getAllListingsService(location);
  res.status(200).json({ success: true, data });
});