const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Employee = require('../models/signup');



passport.use(new localStrategy({
    usernameField: 'email',
}, function(email, password, done){
    Employee.findOne({email: email}, function(err, employeeUser){
        if(err){
            console.log('Error')
            return done(err);
        }
        
        if(!employeeUser || employeeUser.password != password){
            console.log('Invalid Password');
            return done(null, false);
        }

        return done(null, employeeUser);
    })
}));


passport.serializeUser(function(employeeUser, done){
    done(null, employeeUser.id);
})

// Deserializing the data
passport.deserializeUser(function(id, done){
    Employee.findById(id, function(err, employeeUser){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, employeeUser);
    })
})

// Checking authenticated of user 
passport.checkAuth = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
    
}


// Setting the data from cookie to send local views
passport.setAuth = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;