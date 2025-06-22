const asyncHandler = require('../../utils/async/asyncHandler');
const createBookingService = require('../../services/booking/create');

exports.createBooking = asyncHandler(async (req, res) => {
  const { listingId, checkInDate, checkOutDate } = req.body;
  const data = await createBookingService({ listingId, checkInDate, checkOutDate }, req.user._id);
  res.status(201).json({ success: true, data });
});