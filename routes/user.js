// Require Express and Router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Controller to use
const user_controller = require('../controllers/userController');

// user route
router.get('/dashboard', passport.checkAuth, user_controller.dashboard);
router.get('/logout', user_controller.logout);
router.get('/addStudent', user_controller.addStudent)
router.post('/createStudent', user_controller.addStudentData);


router.post('/createInterview', user_controller.addInterviewData)





// Exporting the Modules
module.exports = router;
