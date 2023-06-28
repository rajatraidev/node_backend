const mongoose = require('mongoose');

const interviewSchema  = new mongoose.Schema(
{
    companyName : {
        type: String,
        required: true,
    },
    positions:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    payScale :{
        type: String,
        required: true
    },
    interviewDate :{
        type: String,
        required: true
    },
    student:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'students'
        }
    ]
    
},
{
    timestamps: true,
});


const Interview = mongoose.model('Interviews', interviewSchema);

module.exports = Interview;