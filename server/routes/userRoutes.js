const express = require("express")
const Users = require("../models/userModel");
const { createUser , login } = require("../controllers/userController")
const router = express.Router()

//REGISTER
router.post("/user", async (req, res, next) => {
    const user = await req.body;
    console.log("registered!");
     createUser(user)
        .then((doc) => res.json(doc))
        .catch((err) => next(err));

  });

  //LOGIN
  router.post("/login" , async (req,res , next) =>{
    const {email , password} = req.body;
    const userCheck = await Users.findOne({ email }).exec();
    try{
      if(userCheck){
      const token = await login({email , password}, next);
      res.json({token})
    }
    }catch(e){
      throw 'Error2'
    }
    
  })

// router.route('/').post(registerUser)

module.exports = router