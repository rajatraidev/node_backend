const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CareerCamp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting'));

db.once('open', function(){
    console.log('successfully connected');
});