const express = require('express');
const router = express.Router();

router.use('/auth/register', require('./api/auth/register'));
router.use('/auth/login', require('./api/auth/login'));
router.use('/auth/me', require('./api/auth/me'));
router.use('/listings', require('./api/listings/index'));
router.use('/listings', require('./api/listings/single'));
router.use('/listings/create', require('./api/listings/create'));
router.use('/listings/update', require('./api/listings/update'));
router.use('/listings/delete', require('./api/listings/delete'));
router.use('/listings/my-listings', require('./api/listings/myListings'));
router.use('/bookings/create', require('./api/bookings/create'));
router.use('/bookings/user', require('./api/bookings/user'));

module.exports = router;