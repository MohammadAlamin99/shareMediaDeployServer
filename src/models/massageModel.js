const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    senderName:{
        type:String,  
        required:true 
    },
    receverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    message:{
       type:String,
       default:""
    },
    image:{
       type:String,
       default:""
    },
    
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const messageModel = mongoose.model('massage', dataSchema);
module.exports = messageModel;



