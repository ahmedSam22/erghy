const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv")
const app = express();
var cors = require('cors');
const { default: mongoose } = require("mongoose");
const ConnectDB = require("./config/db");

ConnectDB()
app.use(cors())

app.get('/',(req,res)=>{ 
    res.send("hhh");
})

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

app.get('/api/chat/:id',(req,res)=>{
    const id = req.params.id;
    const singleChat = chats.find((e)=>e._id === id)
    res.send(singleChat)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log("connected");
})