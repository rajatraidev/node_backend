// Require Models
const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');


// Page for Dashboard
module.exports.dashboard = function(req, res){
   Result.find({}).populate('student').populate('interview').exec(function(err, result){

      // console.log(result);
      return res.render('dashboard',{
         title: 'Dashboard | Career Camp',
         dashboardData : result
      });
   });
   
}

// Page For Student List
module.exports.addStudent = function(req, res){
   Student.find({}, function(err, studentList){
      if(err){
         console.log('Issuing in fetching data');
      }
      
      return res.render('add-student',{
         title: 'Add Student | Career Camp',
         studentList : studentList,
      })

   })
  
}



// Adding Student Data to Database
module.exports.addStudentData = function(req, res){
   console.log(req.body);
   Student.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      college: req.body.college,
      dsa: req.body.dsa,
      webd: req.body.webd,
      react: req.body.react,

      }, function(err, student){
      if(err){
          console.log('Error in creating a contact!', err)
          return;
      }


      if (req.xhr){
         return res.status(200).json({
             data: {
                 student: student
             },
             message: "Student Created"
         });
      }
      return res.redirect('/');
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

// Logout
module.exports.logout = function(req, res){
   req.logout(function(err) {
      if (err){ 
        return console.log(err); 
      }
      res.clearCookie();
      res.redirect('/');
   });
 
}