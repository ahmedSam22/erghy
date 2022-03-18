const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const Users = require("../models/userModel");


const sendMessage = async(req , res)=>{

     const {content,chatId} = req.body;

    if(!content){
        console.log("invalid data passed")
        console.log(req.body)
        return res.status(400)
    }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat:chatId
        }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender" , "name pic")
        console.log(newMessage);
        message = await message.populate("chat")
        message = await Users.populate(message ,{
            path : "chat.users",
            select : "name pic email"

        })

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage : message
        })
        res.json(message)

    } catch (error) {
        res.status(400)
        throw Error("failed to send message")
    }
}
  

const getMessages = async(req,res)=>{
    try {
        const messages = await Message.find({chat:req.params.chatId})
        .populate("sender" , "name pic email")
        .populate("chat")
        res.json(messages)

    } catch (error) {
        res.status(400)
        throw Error("failed to get message")
    }
}



module.exports = {sendMessage , getMessages}



