const Listing = require('../../models/Listing');

const getAllListingsService = async (location) => {
  return location
    ? await Listing.findByLocation(location)
    : await Listing.find().populate('host', 'name');
};

module.exports = getAllListingsService;