const ErrorResponse = require('../../utils/error/ErrorResponse');
const Booking = require('../../models/Booking');
const Listing = require('../../models/Listing');

const createBookingService = async ({ listingId, checkInDate, checkOutDate }, userId) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ErrorResponse('Listing not found', 404);
  }

  const nights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
  if (nights <= 0) {
    throw new ErrorResponse('Check-out date must be after check-in date', 400);
  }

  const totalPrice = listing.pricePerNight * nights;

  return await Booking.create({
    listing: listingId,
    user: userId,
    checkInDate,
    checkOutDate,
    totalPrice,
  });
};

module.exports = createBookingService;