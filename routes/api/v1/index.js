const express = require('express');
const router = express.Router();

// routes
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;
