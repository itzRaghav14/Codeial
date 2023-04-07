// import express and initialize Router
const express = require('express');
const router = express.Router();

// importing user controller
const userController = require('../controllers/users_controller');

// get requests
router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

// post requests
router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.post('/end-session', userController.endSession);

// exporting router
module.exports = router;
