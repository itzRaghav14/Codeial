// router 
const express = require('express');
const router = express.Router();

// importing the controllers
const homeController = require('../controllers/home_controller');

// get requests
router.get('/', homeController.home);

// setting up router for other files
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

// exporting router
module.exports = router;
