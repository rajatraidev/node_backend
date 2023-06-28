// Require Express and Router
const express = require('express');
const router = express.Router();


// Require Controller to use
const interview_control = require('../controllers/interviewController');


// Routing
router.get('/interview-list', interview_control.interview);
router.get('/interviewDetail', interview_control.interviewDetail);
router.get('/allocate-interview', interview_control.allocateInterview);
router.post('/allocateResult', interview_control.allocateResult);
router.post('/createInterview', interview_control.addInterviewData);
router.post('/student-allocate', interview_control.allocateStudent);


// Exporting Module
module.exports = router;