const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    comment:{
       type:String,
       default:""
    },
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const commentsModel = mongoose.model('comments', dataSchema);
module.exports = commentsModel;