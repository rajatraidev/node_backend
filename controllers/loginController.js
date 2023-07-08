// Require Models
const Employee = require('../models/signup');

//Sign In Page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        this.logIn;
    }
    else{
        return res.render('signin',{
            title : 'Sign In | Career Camp'
        });
    }
}

//Sign Up Page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        this.logIn;
    }
    else{
        return res.render('signup',{
            title : 'Sign Up | Career Camp'
        });
    }
    
}

// Redirecting to Dashboard
module.exports.logIn = function(req, res){
    req.flash('success','Successfully Signed In');
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
            req.flash('error', 'Error While Sign Up!');
            return;
        }
        req.flash('success', 'Signed Up Successful');
        return res.redirect('/');
    });    
};