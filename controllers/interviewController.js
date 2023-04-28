// Require Models
const Result = require('../models/result');
const Interview = require('../models/interview');
const Student = require('../models/student');



// Page for Interview List
module.exports.interview = function(req, res){
    Interview.find({}, function(err, interviewList){
       if(err){
          console.log('Issuing in fetching data');
       }
        return res.render('interview-list', {
            title: 'Add Interview | Career Camp',
            interviewList : interviewList,
        })  
    })
}

// Adding Interview Data to Database
module.exports.addInterviewData = function(req, res){
    let createInterview = Interview.create({
       companyName: req.body.companyName,
       positions: req.body.position,
       city: req.body.city,
       payScale: req.body.payScale,
 
       }, 
 
       function(err, interview){
       if(err){
           console.log('Error in creating a Interview!')
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
 


// Allocating Student Page
module.exports.allocateInterview = function(req, res){
    Interview.find(req.query.id, function(err, interviewList){
        if(err){
           console.log('Issuing in fetching data');
        }
        Student.find({}, function(err, studentList){
           if(err){
              console.log(`Error in finding student data ${err}`);
              return;
           }
  
           return res.render('allocate-student', {
              title: 'Add Interview | Career Camp',
              interviewList : interviewList,
              studentList : studentList
           })
        })
       
     })
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
                title: 'Interview Details | Career Camp',
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