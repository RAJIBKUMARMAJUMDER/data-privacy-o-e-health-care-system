const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.brightWhite);
    }
    catch (error) {
        console.log(`MongoDB Server Issues ${error}`.bgRed.brightWhite);
    }
};

module.exports = connectDB;