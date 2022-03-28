const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


const userModel = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
    }
},
    {
        timestamps : true
    }
);



//PASSWORD HASH ###
userModel.pre("save" ,function(next){
    const user = this;
    bcrypt.hash(user.password , 10 , function(error , encrypted){
        user.password = encrypted;
        next()
    })
} )


//COMPARE PASSWORD ###
userModel.methods.comparePassword =  function(password){
    return bcrypt.compareSync(password, this.password)
}

const Users = mongoose.model("user" , userModel);

module.exports = Users