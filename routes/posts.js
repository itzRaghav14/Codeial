// import express and router
const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

// import controller
const postsController = require('../controllers/posts_controller');

// get requests
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

// post requests
router.post('/create', passport.checkAuthentication, postsController.create);

// exporting router
module.exports = router;
