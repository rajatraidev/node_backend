const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required : true,
    },
    email:
    {
        type: String,
        required : true,
    },
    mobile:
    {
        type: Number,
        required: true,
    },
    college:
    {
        type: String,
        required: true,
    },
    dsa:
    {
        type: Number,
        required: true,
    },
    webd:
    {
        type: Number,
        required: true,
    },
    react:
    {
        type: Number,
        required: true,
    }

},
{
    timestamps: true,
})


const student = mongoose.model('students', studentSchema);

module.exports = student;