// import express and initialize Router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// importing user controller
const userController = require('../controllers/users_controller');

// get requests
router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroySession);

// post requests
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'sign-up'},
), userController.createSession);

// exporting router
module.exports = router;
