const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    mobileNo: String,
    profileImage: String,
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)