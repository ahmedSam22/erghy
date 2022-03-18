
const express = require("express")
const router = express.Router()
const Message = require("../models/messageModel");
const { sendMessage , getMessages } = require("../controllers/messageController");
const protect = require("../middlewares/authMiddleware");



router.post("/",protect,sendMessage);
router.get("/:chatId",protect,getMessages);


module.exports = router