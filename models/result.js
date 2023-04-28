const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result: {
        type: String,
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    interview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interviews'
    }

},{
    timestamps: true,
});



const Result = mongoose.model('Results', resultSchema);

module.exports = Result;