// import express and initialize Router
const express = require('express');
const router = express.Router();

// importing user controller
const userController = require('../controllers/users_controller');

// get requests
router.get('/', userController.home);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

// post requests
router.post('/create', userController.create);
router.post('createSession', userController.createSession);

// exporting router
module.exports = router;
