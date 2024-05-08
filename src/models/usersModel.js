const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    userName:{type:String},
    email:{
        type:String, 
        lowercase:true, 
        required:true, 
        unique:true
    },

    password:{
        type:String, 
        required:true
    },

    photo:
    {
        type:String
    },
    
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const UsersModel = mongoose.model('users', dataSchema);
module.exports = UsersModel;



