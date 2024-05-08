const { createComment, getComment } = require("../services/commentsService");

exports.comment = async (req, res) => {
    let result = await createComment(req);
    return res.status(200).json(result);
 }
exports.readComment = async (req, res) => {
    let result = await getComment(req);
    return res.status(200).json(result);
 }