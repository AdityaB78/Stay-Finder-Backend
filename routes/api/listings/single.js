const express = require('express');
const router = express.Router();
const { getListing } = require('../../../controllers/listing/getListingController');

router.get('/:id', getListing);

module.exports = router;