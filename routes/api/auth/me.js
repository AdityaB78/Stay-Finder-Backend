const express = require('express');
const router = express.Router();
const protect = require('../../../middleware/auth/protect');
const { getMe } = require('../../../controllers/auth/getMeController');

router.get('/', protect, getMe);

module.exports = router;