const ErrorResponse = require('../../utils/error/ErrorResponse');
const Listing = require('../../models/Listing');

const getOneListingService = async (id) => {
  const listing = await Listing.findById(id).populate('host', 'name');
  if (!listing) {
    throw new ErrorResponse('Listing not found', 404);
  }
  return listing;
};

module.exports = getOneListingService;