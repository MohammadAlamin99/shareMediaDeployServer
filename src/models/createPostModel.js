const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post:{
       type:String,
       default:""
    },
    image:{
       type:String,
       default:""
    },
    like:{
       type:Array,
       default:[]
    },
    
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const createPostModel = mongoose.model('post', dataSchema);
module.exports = createPostModel;



