const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://jmsjbb1101:8C1sR34X6ReQuQQZ@shopease.jxiqz.mongodb.net/?retryWrites=true&w=majority&appName=shopease"

const connectToMongo = async() =>{
   try{
    mongoose.connect(mongoURI);
    console.log("connected MongoDb successfully");
   } catch (err){
    console.error("Connection error:", err);
   }
};

module.exports = connectToMongo;