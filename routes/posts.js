// import express and router
const express = require('express');
const router = express.Router();

// import controller
const postsController = require('../controllers/posts_controller');

router.post('/create', postsController.create);

module.exports = router;
