const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        name : {type : String , require},
        email : {type : String , require},
        password : {type : String , require},
        pic : {type : String , require,default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},

    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User" , userModel);

module.exports = User