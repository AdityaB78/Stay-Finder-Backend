const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const { createBooking } = require('../../../controllers/booking/createBookingController');

router.post('/', protect, createBooking);

module.exports = router;