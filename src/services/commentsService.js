const commentsModel = require("../models/commentsModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createComment = async (req) => {
    try {
        let reqBody = req.body;
        let result = await commentsModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

exports.getComment = async (req) => {
    try {
        let id = new ObjectId(req.params.id);
        let result = await commentsModel.aggregate([
            {$match:{postId:id}},
            {$sort:{_id: -1}},
            { $lookup: {from:"users", localField:"senderId", foreignField:"_id", as:"senderInfo"}},
            { $lookup: {from:"posts", localField:"postId", foreignField:"_id", as:"postInfo"}},
            { $unwind: "$senderInfo" },
            { $unwind: "$postInfo" },
            {$project:{'senderInfo._id':0,'senderInfo.password':0, 'senderInfo.email':0,'senderInfo.createdDate':0}},
            {$project:{'postInfo.senderId':0,'postInfo.post':0,'postInfo.image':0,'postInfo.like':0,'postInfo.createdDate':0},}
        ]);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

