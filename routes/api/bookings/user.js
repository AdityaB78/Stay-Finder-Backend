const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const { getUserBookings } = require('../../../controllers/booking/getUserBookingsController');

router.get('/', protect, getUserBookings);

module.exports = router;