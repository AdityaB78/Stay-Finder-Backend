const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const restrictToHost = require('../../../middleware/rbac/restrictToHost');
const { createListing } = require('../../../controllers/listing/createListingController');

router.post('/', protect, restrictToHost, createListing);

module.exports = router;