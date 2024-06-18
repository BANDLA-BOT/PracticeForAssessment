const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        min:6,
        max:255
    },
    profilepic:{
        type:String
    }
},{timestamps:true})
const userModel = mongoose.model('userInfo', schema)
module.exports = userModel