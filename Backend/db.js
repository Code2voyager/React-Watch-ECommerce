const mongoose = require('mongoose');
require('dotenv').config(); 
const mongoUrl = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error.message);
        process.exit(1);

    }
            
};

module.exports = connectDB;
