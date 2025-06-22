const asyncHandler = require('../../utils/async/asyncHandler');
const createListingService = require('../../services/listing/create');

exports.createListing = asyncHandler(async (req, res) => {
  const data = await createListingService(req.body, req.user._id);
  res.status(201).json({ success: true, data });
});