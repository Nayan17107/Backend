const mongoose = require('mongoose');

const dbconnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/StudentManage');
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbconnection;