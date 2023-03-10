const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');

router.get('/profile', userController.profile);

router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', userController.createSession);

module.exports = router;