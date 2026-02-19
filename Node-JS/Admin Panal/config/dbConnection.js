const mongoose = require('mongoose')

const dbconnaction = () => {
    mongoose.connect('mongodb://localhost:27017/admin-panel')
        .then(() => console.log("DB Is Connected!!!!"))
        .catch((err) => console.log(err))
}

module.exports = dbconnaction;