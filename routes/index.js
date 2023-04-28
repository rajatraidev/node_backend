// Require Express and Router
const express = require('express');
const router = express.Router();
const passport = require('passport');
// Require Controller to use
const login_controller = require('../controllers/loginController');

// Routing the request
router.get('/',  login_controller.signIn);
router.get('/signup', login_controller.signUp);
router.post('/create-user', login_controller.createUser);
// router.post('/login', login_controller.logIn);


router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), login_controller.logIn);


router.use('/user', require('./user'));
router.use('/interview', require('./interview'));




// Exporting the Modules
module.exports = router;