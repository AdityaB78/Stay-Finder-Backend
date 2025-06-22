const ErrorResponse = require('../../utils/error/ErrorResponse');
const Listing = require('../../models/Listing');

const restrictToOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorResponse('Listing not found', 404));
  }
  if (listing.host.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse('Not authorized to access this resource', 403));
  }
  next();
};

module.exports = restrictToOwner;