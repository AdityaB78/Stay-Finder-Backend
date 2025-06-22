const express = require('express');
const router = express.Router();
const { getListings } = require('../../../controllers/listing/getListingsController');

router.get('/', getListings);

module.exports = router;