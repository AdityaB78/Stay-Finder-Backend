const Listing = require('../../models/Listing');

const createListingService = async (listingData, userId) => {
  return await Listing.create({ ...listingData, host: userId });
};

module.exports = createListingService;