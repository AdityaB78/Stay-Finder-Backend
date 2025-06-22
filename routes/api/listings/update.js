const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const restrictToHost = require('../../../middleware/rbac/restrictToHost');
const restrictToOwner = require('../../../middleware/rbac/restrictToOwner');
const { updateListing } = require('../../../controllers/listing/updateListingController');

router.put('/:id', protect, restrictToHost, restrictToOwner, updateListing);

module.exports = router;