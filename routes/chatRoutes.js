const express = require("express")
const router = express.Router()
const Chat = require("../models/chatModel");
const { accessChat , fetchChat,createGroup , renameGroup,addToGroup,removeFromGroup } = require("../controllers/chatController");
const protect = require("../middlewares/authMiddleware");

router.post("/",protect,accessChat);
router.get("/",protect,fetchChat);
router.post("/group",protect,createGroup);
router.put("/group",protect,renameGroup);
router.put("/group/add",protect,addToGroup);
router.put("/group/remove",protect,removeFromGroup);



module.exports = router