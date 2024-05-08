
const massageModel = require("../models/massageModel");

exports.message = async (req) => {
    try {
        let reqBody = req.body;
        let result = await massageModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

exports.getMessage = async (req) => {
    try {
        let myId = req.headers.id;
        let fdId = req.params.id;
        let result = await massageModel.find({
            $or:[
                {senderId:myId, receverId:fdId},
                {receverId:myId, senderId:fdId }
               ]
               
        });
        return { status: "success", message: result };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};



exports.sendImageMessage = async (req) => {
    try {
        let reqBody = req.body;
        let image = req.file.filename;
        reqBody.image = image;
        let result = await massageModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}



