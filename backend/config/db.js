const mongoose=require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected");
    } catch(err){
        console.log("error in connecting database"+ err)
    }
}

module.exports=connectDB;

