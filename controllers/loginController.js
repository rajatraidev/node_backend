// Require Models
const Employee = require('../models/signup');


// Sign In Page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('user/dashboard');
    }
    return res.render('signin',{
        title : 'Sign In | Career Camp'
    });

    
}

//  Sign Up Page
module.exports.signUp = function(req, res){
    return res.render('signup',{
        title : 'Sign Up | Career Camp'
    });
}

// Verifying Details to Login
// module.exports.logIn = function(req, res){
//     Employee.findOne({email: req.body.username}, function(err, employees){
//         if(employees){
//             if(employees.password != req.body.password){
//                 console.log('Not Match')
//                 return res.redirect('back');
//             }
//             else{
//                 res.cookie('user_id', employees.id);
//                 return res.redirect('/user/dashboard');
//             }
//         }
//         else{
//             console.log('Not Found');
//             return res.redirect('back');
//         }
        
//     })
    
// }


module.exports.logIn = function(req, res){
    // req.flash('success','Successfully Signed In');
    return res.redirect('/user/dashboard');
}

// Creating User
module.exports.createUser = function(req, res){
    Employee.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        }, function(err, employeeUser){
        if(err){
            console.log('Error in creating a contact!')
            return;
        }
        return res.redirect('/');
    });    
};