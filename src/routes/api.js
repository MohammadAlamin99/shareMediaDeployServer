const express = require("express");
const usersController  = require("../controllers/usersController");
const massageController  = require("../controllers/massageController");
const createPostController  = require("../controllers/createPostController");
const commentController  = require("../controllers/commentController");
const authVerificationMiddleware  = require("../middleware/authVerificationMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();


router.post("/registration", usersController.registration);
router.post("/profileUpdate",authVerificationMiddleware, usersController.profileUpdate);
router.get("/userDetails",authVerificationMiddleware, usersController.userDetails);
router.post("/login", usersController.login);
router.get("/userFriends",authVerificationMiddleware, usersController.userFriends);
router.post("/message",authVerificationMiddleware,massageController.message);
router.get("/getMessage/:id",authVerificationMiddleware, massageController.getMessage);
router.post("/sendImage", upload.single("image"), massageController.sendImage);
router.post("/postCreate", authVerificationMiddleware, createPostController.postCreate);
router.get("/findPost", authVerificationMiddleware, createPostController.findPost);
router.post("/creatImagePost", upload.single("image"), authVerificationMiddleware,createPostController.creatImagePost);
router.delete("/postDelete/:id/:senderId", authVerificationMiddleware, createPostController.postDelete);
router.post("/postUpdate/:id", authVerificationMiddleware, createPostController.postUpdate);
router.put("/postLike/:id", authVerificationMiddleware, createPostController.postLike);
router.post("/comment", authVerificationMiddleware, commentController.comment);
router.get("/readComment/:id", authVerificationMiddleware, commentController.readComment);
router.get("/profilePostRead/:id", authVerificationMiddleware, createPostController.profilePostRead);

module.exports = router;