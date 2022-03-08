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


const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log("connected");
})