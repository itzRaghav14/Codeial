// import express and initialize Router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// importing user controller
const userController = require('../controllers/users_controller');

// get requests
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroySession);

// google oauth
router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

// post requests
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);
router.post('/update/:id', passport.checkAuthentication, userController.update);

// exporting router
module.exports = router;
