// Including Libraries and Modules
const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');

// Using UrlEncoded
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.use(expressLayouts);

// Seting View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


// Session
app.use(session({
    name: 'Career Camp',
    secret: 'Nal',
    saveUninitialized: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore(
    //     {
    //         mongoUrl : db,
    //         autoRemove: 'disabled'
        
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use(flash());
app.use(customMWare.setFlash);

// Use Router
app.use('/', require('./routes'));

// Setting Static File
app.use(express.static('assets'));


// creating server
app.listen(port, function(err){
    if(err){
        console.log(`Error in ${err}`);
    }
    console.log('Server is running visit http://localhost:8000 to see result');
})