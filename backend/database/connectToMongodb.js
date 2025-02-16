const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MogoDB");
    }
    catch(error){
        console.log("Error conecting to MongoDB : ",error.message);
    }
}

module.exports = connectToMongoDB;