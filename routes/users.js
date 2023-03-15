const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');

router.get('/profile' ,passport.checkAuthetication, userController.profile);

// reset password 
router.post('/password-reset', passport.checkAuthetication, userController.profile)

router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session',
passport.authenticate(
    'local', 
    { failureRedirect: '/users/signIn' }
    ), userController.createSession);

// sign out
router.get('/destroy-session', userController.destroySession);


router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signIn'}), userController.createSession);

module.exports = router;