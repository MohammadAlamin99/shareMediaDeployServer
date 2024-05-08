const { UserRegistration, UserLogin, UserFriends, UpadateProfile, UserProfileDetails } = require("../services/usersService");


exports.registration = async (req, res) => {
    let result = await UserRegistration(req);
    return res.status(200).json(result);
 }
 

 exports.login = async (req, res) => {
    let result = await UserLogin(req);
    return res.status(200).json(result);
 }
 exports.userFriends = async (req, res) => {
    let result = await UserFriends(req);
    return res.status(200).json(result);
 }
 
 exports.profileUpdate = async (req, res) => {
    let result = await UpadateProfile(req);
    return res.status(200).json(result);
 }
 
 
 exports.userDetails = async (req, res) => {
    let result = await UserProfileDetails(req);
    return res.status(200).json(result);
 }
 