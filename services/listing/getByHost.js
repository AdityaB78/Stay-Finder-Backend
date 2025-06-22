const Listing = require('../../models/Listing');

const getByHostService = async (hostId) => {
  return await Listing.findByHost(hostId);
};

module.exports = getByHostService;