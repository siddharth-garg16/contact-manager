const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// const url = "mongodb://0.0.0.0:27017";
// const client = new MongoClient(url);
// const dbName = "myContacts";
// async function connectDB() {
//     try {
//         await client.connect();
//         console.log("Connected succesfully to DB");
//         const db = client.db(dbName);
//         const collection = db.collection('contacts');
//     }catch(err){
//         console.log("Error connecting to DB", err);
//     }
// }

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