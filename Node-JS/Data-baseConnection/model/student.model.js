const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: String ,   // shorthand property
    email: {
        type: String,
    },
    classNo: {
        type:Number
    },
    gender: {
        type: String
    },
    mobileNo: {
        type: String,
    },
    course: {
        type: String
    },
    profileImage: {
        type: String
    }
});

module.exports = mongoose.model('students', studentSchema);