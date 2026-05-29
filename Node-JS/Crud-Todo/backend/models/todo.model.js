const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require: true,
            trim:true
        },
        completed:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        versionKey:false
    }
);

module.exports = mongoose.model("Todo", todoSchema);