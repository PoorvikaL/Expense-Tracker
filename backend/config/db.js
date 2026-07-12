const mongoose=require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected");
    } catch (err) {
    console.error("Database connection error:");
    console.error(err);
    process.exit(1);
}
}

module.exports=connectDB;

