// importing express and router
const express = require('express');
const router = express.Router();

// importing passport config
const passport = require('../config/passport-local-strategy');

// importing controllers
const commentsController = require('../controllers/comments_controller');

// get requests
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

// post requests
router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;
