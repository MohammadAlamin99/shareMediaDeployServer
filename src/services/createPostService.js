const createPostModel = require("../models/createPostModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createPost = async (req) => {
    try {
        let reqBody = req.body;
        let result = await createPostModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}
exports.getpost = async (req) => {
    try {
       
        let result = await createPostModel.aggregate([
            {$sort:{createdDate: -1}},
            { $lookup: {from:"users", localField:"senderId", foreignField:"_id", as:"senderInfo"}},
            { $unwind: "$senderInfo" },
            {$project:{'senderInfo._id':0,'senderInfo.password':0, 'senderInfo.email':0,'senderInfo.createdDate':0}}
      
        ]);
        return {status:"success", message:result}
    } catch (e) {
        console.log(e)
        return {status:"fail", message:"Something Went Wrong"}
    }
}
// profile get post
exports.profileGetPost = async (req) => {
    try {
       
        let id = new ObjectId(req.params.id);
        let result = await createPostModel.aggregate([
            {$match:{senderId:id}},
            {$sort:{_id: -1}},
            { $lookup: {from:"users", localField:"senderId", foreignField:"_id", as:"senderInfo"}},
            { $unwind: "$senderInfo" },
            {$project:{'senderInfo._id':0,'senderInfo.password':0, 'senderInfo.email':0,'senderInfo.createdDate':0}}
      
        ]);
        return {status:"success", message:result}
    } catch (e) {
        console.log(e)
        return {status:"fail", message:"Something Went Wrong"}
    }
}


exports.creatImgPost = async (req) => {
    try {
        let reqBody = req.body;
        let image = req.file ? req.file.filename : null; 
        if (image) {
            reqBody.image = image;
        }
        let result = await createPostModel.create(reqBody);
        return { status: "success", message: result };
    } catch (e) {
        console.log(e);
        return { status: "fail", message: "Something Went Wrong" };
    }
};
exports.deletePost = async (req) => {
    try {
        let id = req.params.id;
        let senderId= req.params.id;
        let matchItemDelete = {_id:id, senderId:senderId};
        let data = await createPostModel.findByIdAndDelete(matchItemDelete)
        return({status:"success", data:data});
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};


exports.updatePost = async (req, res)=>{
    try {
        let id = req.params.id;
        let reqBody = req.body;
        let data = await createPostModel.updateOne({_id:id},reqBody);
        return({status:"success", data:data});

    } catch (e) {
        return {status:"fail", message:e.message}
    }
}


// Like and dislike


exports.likePost = async (req, res) => {
    try {
        const post = await createPostModel.findById(req.params.id);
        const senderId = req.body.senderId;
        const liked = post.like.includes(senderId);
        if (!liked) {
            await createPostModel.findByIdAndUpdate(req.params.id, { $push: { like: senderId } });
            return({status:"success", message:"liked"});
        } else {
            await createPostModel.findByIdAndUpdate(req.params.id, { $pull: { like: senderId } });
            return({status:"success", message:"disliked"});
        }

    } catch (error) {
        
        return {status:"fail", message:e.message}
    }
}
