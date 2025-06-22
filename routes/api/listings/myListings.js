const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const restrictToHost = require('../../../middleware/rbac/restrictToHost');
const { getMyListings } = require('../../../controllers/listing/getMyListingsController');

router.get('/', protect, restrictToHost, getMyListings);

module.exports = router;