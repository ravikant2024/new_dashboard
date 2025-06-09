require('dotenv').config()
const mongoose = require("mongoose")

exports.connectToDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect('mongodb://root:password@mongo_db:27017/prod?authSource=admin')
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}