const mongoose = require('mongoose');
const ErrorResponse = require('../utils/error/ErrorResponse');

const BookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: [true, 'Listing is required'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] },
  checkInDate: { type: Date, required: [true, 'Check-in date is required'] },
  checkOutDate: { type: Date, required: [true, 'Check-out date is required'] },
  totalPrice: { type: Number, required: [true, 'Total price is required'], min: [0, 'Price cannot be negative'] },
  createdAt: { type: Date, default: Date.now },
});

BookingSchema.pre('save', function (next) {
  if (this.checkOutDate <= this.checkInDate) {
    return next(new ErrorResponse('Check-out date must be after check-in date', 400));
  }
  if (this.checkInDate < new Date()) {
    return next(new ErrorResponse('Check-in date cannot be in the past', 400));
  }
  next();
});

BookingSchema.statics.findByUser = async function (userId) {
  return await this.find({ user: userId }).populate('listing', 'title location');
};

BookingSchema.statics.findByListing = async function (listingId) {
  return await this.find({ listing: listingId }).populate('user', 'name');
};

BookingSchema.index({ user: 1 });
BookingSchema.index({ listing: 1 });

module.exports = mongoose.model('Booking', BookingSchema);