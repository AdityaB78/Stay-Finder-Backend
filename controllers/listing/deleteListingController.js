const asyncHandler = require('../../utils/async/asyncHandler');
const deleteListingService = require('../../services/listing/remove');

exports.deleteListing = asyncHandler(async (req, res) => {
  await deleteListingService(req.params.id);
  res.status(200).json({ success: true, data: {} });
});