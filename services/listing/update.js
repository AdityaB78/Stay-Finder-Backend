const ErrorResponse = require('../../utils/error/ErrorResponse');
const Listing = require('../../models/Listing');

const updateListingService = async (id, updateData) => {
  const listing = await Listing.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!listing) {
    throw new ErrorResponse('Listing not found', 404);
  }
  return listing;
};

module.exports = updateListingService;