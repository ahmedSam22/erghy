const mongoose = require("mongoose");


const messageModel = mongoose.Schema({
sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
},
content : {
    type : String,
    require : true,
    trim : true
},
chat : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "chat"
}
})

const Message = mongoose.model("message", messageModel)

module.exports = Message