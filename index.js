const express = require("express");
const chats = require("./data/data");
require("dotenv").config();const app = express();
var cors = require('cors');
const { mongoose } = require("mongoose");
const bp = require('body-parser')
const ConnectDB = require("./config/db");
const path = require("path")

ConnectDB()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

app.use("/" , userRoutes);
app.use("/chat" , chatRoutes);
app.use("/message" , messageRoutes);

// -------deployment--------


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}




// -------deployment--------


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT , ()=>{
    console.log("server connected");
})

const io = require('socket.io')(server,{
    pingTimeout : 60000,
    cors: {
        origin : 'http://localhost:3000'
    }
})

io.on("connection" , (socket)=>{
    console.log("socket io connected succefully");

    socket.on("setup" , (userData)=>{
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat" , (room)=>{
        socket.join(room),
        console.log("user joined room : " + room);
    })

    socket.on("typing" , (room)=>{
        socket.in(room).emit("typing")
    })
    socket.on("stop typing" , (room)=>{
        socket.in(room).emit("stop typing")
    })

    socket.on("new message" , (newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users)return console.log("chat.users not found")

        chat.users.forEach(user =>{
            if(user._id === newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved",newMessageRecieved)
        })
    })

    socket.off("setup" , ()=>{
        console.log("user disconnected")
        socket.leave(userData._id)
    })
})