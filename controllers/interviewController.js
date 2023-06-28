// Require Models
const Result = require('../models/result');
const Interview = require('../models/interview');
const Student = require('../models/student');
const student = require('../models/student');



// Page for Interview List
module.exports.interview = function(req, res){
    if(req.isAuthenticated()){
        Interview.find({}, function(err, interviewList){
        if(err){
            req.flash('error', 'Error While Fetching Interview');
        }
            return res.render('interview-list', {
                title: 'Add Interview',
                interviewList : interviewList,
            })  
        })
    }
    else{
        return res.redirect('/');
    }
}

// Adding Interview Data to Database
module.exports.addInterviewData = function(req, res){
    let createInterview = Interview.create({
        companyName: req.body.companyName,
        positions: req.body.position,
        city: req.body.city,
        payScale: req.body.payScale,
        interviewDate: req.body.interviewDate
    },
    
    function(err, interview){
        if(err){
            req.flash('error', 'Error While Creating Interview');
            return;
        }
        
        // Sending Data to Ajax
        if (req.xhr){
            return res.status(200).json({
                data: {
                    interview: interview
                },
                message: "Post created!"
            });
        }
        return res.redirect('back');
    })
}
 

// Allocating Student View Page
module.exports.allocateInterview = function(req, res){
    Interview.findById(req.query.id, function(err, interviewList){
        if(err){
           console.log(err);
           return;
        }
        Student.find({}, function(err, studentList){
           if(err){
              console.log(`Error in finding student data ${err}`);
              return;
           }
  
           return res.render('allocate-student', {
              title: 'Allocate Interview',
              interviewList : interviewList,
              studentList : studentList
           })
        })
    })
}

// Allocate Student
module.exports.allocateStudent = function(req, res){
    if(req.body){
        Interview.findByIdAnd(req.body.interviewId, 
            {student:req.body.student}, function(err, allocated){
            if(err){
                console.log(err);
            }
            return res.redirect('/interview/interviewDetail?id='+req.body.interviewId);
        });
    }
}

// Interview Details with Allocated Student
module.exports.interviewDetail = function(req, res){
    Interview.findById(req.query.id, function(err, details){
        if(err){
            console.log('Having issue in finding Details');
            return;
        }
        Student.find({}, function(err, student){
            if(err){
                console.log('Cant Find Student', err);
            }
            return res.render('interview-detail', {
                title: 'Interview Details',
                data : details,
                studentList : student
            })
        })
        
    })
    
}


// Allocating Result to Allocated Student
module.exports.allocateResult = function(req, res){
    Result.create({
        result: req.body.result,
        student: req.body.studentId,
        interview: req.body.interviewId
    }, function(err, result){
        if(err){
            console.log(err);
        }

        return res.redirect('back');
    })
}