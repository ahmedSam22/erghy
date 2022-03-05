const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');

const createUser = (query) => Users.create(query);
const login = async ({email , password} , next) =>{
    const user = await Users.findOne({ email }).exec();
    if(!user){
        next("invalid username ");
        return ;
    }
    const verified = await user.comparePassword(password);
    if(!verified){
        next("wrong password ");
        return ;
    }
    if(user && verified){
        console.log("login success");
        return jwt.sign({
            email ,
            id : user._id,
            maxAge : "2d"
        },"jhiuhukgyglkhalhllh")
    }
    

    

     
}

module.exports = {createUser,login}



