const Users = require("../models/userModel");
const Chat = require("../models/chatModel");


const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
         res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await Users.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "hhh",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw  Error(error.message);
        }
    }
};

const fetchChat = async (req , res , next) => {
    try {

        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
            
        }).populate("users", "-password").populate("isGroupAdmin","-password").populate("latestMessage").sort({updatedAt : -1}).then( async (results)=>{
            console.log("first of result");
            results = await Users.populate(results , {
                path : 'latestMessage.sender',
                select : "name pic email"
            })
            res.status(200).send(results)
            console.log("inside result");
        })
        console.log("lastjjjjjjj");
    } catch (error) {
        res.status(400)
        throw Error("test")
    }
}

const createGroup = async (req , res , next) => {

    if(!req.body.users || !req.body.name){
        return res.satus(400).send({message: "please fill name"})
    }
    var users = JSON.parse(req.body.users)
    if(users.length < 2){
        return res.status(400).send({message : "groups must be more than 2 members"})
    }

    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName : req.body.name,
            users : users,
            isGroupChat : true,
            isGroupAdmin : req.user
        })

        fullGroupChat = await Chat.findOne({_id : groupChat._id}).populate("users", "-password").populate("isGroupAdmin","-password")
        res.status(200).json(fullGroupChat)
    
    } catch (error) {
        res.status(400)
        console.log(error.message);
    }
}

const renameGroup = async (req,res,next) => {


    const {chatId , chatName} = req.body
    const updateChat = await Chat.findByIdAndUpdate(chatId,{
        chatName
    },{
        new : true
    }).populate("users", "-password").populate("isGroupAdmin","-password")

    if(!updateChat){
        res.status(400);
        throw Error("chat Not found")
    }else{
        res.json(updateChat)
    }
}

const addToGroup = async (req,res,next) => {
    const {chatId , userId} = req.body

    added = await Chat.findByIdAndUpdate(chatId,{
        $push : {users: userId}
    },
    {new: true}).populate("users", "-password").populate("isGroupAdmin","-password")

    res.status(200).json(added)
   



}


const removeFromGroup = async (req,res,next) => {
    const {chatId , userId} = req.body

    removed = await Chat.findByIdAndUpdate(chatId,{
        $pull : {users: userId}
    },
    {new: true}).populate("users", "-password").populate("isGroupAdmin","-password")

    res.status(200).json(removed)



}
module.exports = { accessChat , fetchChat,createGroup , renameGroup , addToGroup,removeFromGroup}