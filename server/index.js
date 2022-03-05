const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv")
const app = express();
var cors = require('cors');
const { mongoose } = require("mongoose");
const bp = require('body-parser')
const ConnectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");


ConnectDB()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
app.use("/" , userRoutes);
app.use("/chat" , chatRoutes);




// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// })

// app.get('/api/chat/:id',(req,res)=>{
//     const id = req.params.id;
//     const singleChat = chats.find((e)=>e._id === id)
//     res.send(singleChat)
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log("connected");
})