const { createPost, getpost, creatImgPost, deletePost, updatePost, likePost, profileGetPost } = require("../services/createPostService");

exports.postCreate = async (req, res) => {
    let result = await createPost(req);
    return res.status(200).json(result);
 }
exports.findPost = async (req, res) => {
    let result = await getpost(req);
    return res.status(200).json(result);
 }
exports.creatImagePost = async (req, res) => {
    let result = await creatImgPost(req);
    return res.status(200).json(result);
 }

exports.postDelete = async (req, res) => {
    let result = await deletePost(req);
    return res.status(200).json(result);
 }
exports.postUpdate = async (req, res) => {
    let result = await updatePost(req);
    return res.status(200).json(result);
 }
exports.postLike = async (req, res) => {
    let result = await likePost(req);
    return res.status(200).json(result);
 }
exports.profilePostRead = async (req, res) => {
    let result = await profileGetPost(req);
    return res.status(200).json(result);
 }

