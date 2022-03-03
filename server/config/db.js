const mongoose = require("mongoose");

const ConnectDB = async()=>{

    try{
        mongoose.connect("mongodb+srv://arwa:ardb@arwa.xhhx7.mongodb.net/ar?retryWrites=true&w=majority" , function () {
            console.log('connection state is : ' , mongoose.connection.readyState)
        });
    
    }catch(error){
        console.log(`ERROR : ${error.message}`);
    }
}

module.exports = ConnectDB