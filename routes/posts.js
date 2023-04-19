// import express and router
const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

// import controller
const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);

module.exports = router;
