const asyncHandler = require('../../utils/async/asyncHandler');
const getOneListingService = require('../../services/listing/getOne');

exports.getListing = asyncHandler(async (req, res) => {
  const data = await getOneListingService(req.params.id);
  res.status(200).json({ success: true, data });
});