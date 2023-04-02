// router 
const express = require('express');
const router = express.Router();

// importing the controllers
const homeController = require('../controllers/home_controller');

// get requests
router.get('/', homeController.home);

// exporting router
module.exports = router;
