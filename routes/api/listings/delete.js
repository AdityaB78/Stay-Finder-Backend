const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const restrictToHost = require('../../../middleware/rbac/restrictToHost');
const restrictToOwner = require('../../../middleware/rbac/restrictToOwner');
const { deleteListing } = require('../../../controllers/listing/deleteListingController');

router.delete('/:id', protect, restrictToHost, restrictToOwner, deleteListing);

module.exports = router;