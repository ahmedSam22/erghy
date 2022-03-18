const mongoose = require("mongoose");

const ConnectDB = async()=>{

    try{
        mongoose.connect(process.env.CONNECTION_STRING , function () {
            console.log('connection state is : ' , mongoose.connection.readyState)
        });
    
    }catch(error){
        console.log(`ERROR : ${error.message}`);
    }
}

module.exports = ConnectDB