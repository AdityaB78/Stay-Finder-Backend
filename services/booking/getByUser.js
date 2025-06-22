const Booking = require('../../models/Booking');

const getByUserService = async (userId) => {
  return await Booking.find({ user: userId }).populate('listing', 'title location');
};

module.exports = getByUserService;