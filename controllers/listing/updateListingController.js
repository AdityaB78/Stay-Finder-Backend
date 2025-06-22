const asyncHandler = require('../../utils/async/asyncHandler');
const updateListingService = require('../../services/listing/update');

exports.updateListing = asyncHandler(async (req, res) => {
  const data = await updateListingService(req.params.id, req.body);
  res.status(200).json({ success: true, data });
});