// Require Models
const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');
const par = require('json2csv');

// Page for Dashboard
module.exports.dashboard = function(req, res){
   if(req.isAuthenticated()){
      Result.find({}).populate('student').populate('interview').exec(function(err, result){
         return res.render('dashboard',{
            title: 'Dashboard',
            dashboardData : result
         });
      });
   }
   else{
      return res.redirect('/');
   }  
}

// Page For Student List
module.exports.addStudent = function(req, res){
   if(req.isAuthenticated()){
      Student.find({}, function(err, studentList){
         if(err){
            req.flash('error', 'Error While Fetching Data');
         }
         
         return res.render('add-student',{
            title: 'Add Student',
            studentList : studentList,
         })

      })
   }
   else{
      res.redirect('/');
   }
}

// Adding Student Data to Database
module.exports.addStudentData = function(req, res){
   console.log(req.body);
   Student.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      college: req.body.college,
      batch: req.body.batch,
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
      req.flash('success', 'Logged Out Successfully');
      res.redirect('/');
   });
 
}

// Json to CSV
module.exports.downloadResource = (res, fileName, fields, data) => {
   const json2csv = new par.Parser({ fields });
   const csv = json2csv.parse(data);
   res.header('Content-Type', 'text/csv');
   res.attachment(fileName);
   return res.send(csv);
}

// Download CSV
module.exports.download = async (req, res) => {
   const fields = [
      {
         label: 'Student Id',
         value: 'student.id'
      },
      {
         label: 'Student Name',
         value: 'student.name'
      },
      {
         label: 'Student College',
         value: 'student.college'
      },
      {
         label : 'DSA Score',
         value: 'student.dsa'
      },
      {
         label : 'Webd Score',
         value: 'student.webd'
      },
      {
         label : 'React Score',
         value: 'student.react'
      },
      {
         label : 'React Score',
         value: 'student.react'
      },
      {
         label : 'Interview Date',
         value: 'interview.interviewDate'
      },
      {
         label : 'Interview Company',
         value: 'interview.companyName'
      },
      {
         label : 'Interview Result',
         value: 'result'
      },

     
   ];
   const data = await Result.find({}).populate('student').populate('interview').exec();

   return this.downloadResource(res, 'users.csv', fields, data);
}