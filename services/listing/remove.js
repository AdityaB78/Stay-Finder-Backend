const ErrorResponse = require('../../utils/error/ErrorResponse');
const Listing = require('../../models/Listing');

const deleteListingService = async (id) => {
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) {
    throw new ErrorResponse('Listing not found', 404);
  }
  return {};
};

module.exports = deleteListingService;