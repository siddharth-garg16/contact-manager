const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/myContacts";
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(url);
        console.log("DB connected!", connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log("Error in connecting to DB", err);
        process.exit(1);
    }
}

module.exports = { connectDB };