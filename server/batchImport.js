const { MongoClient } = require("mongodb");

const {users} = require("./data")
const {history} = require("./medicalHistory")
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    };

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        
        await client.connect();
        console.log("connected")
        const db = client.db("health-dairy");
        // const result = await db.collection("users").insertMany(users)
        
        await db.collection("history").insertMany(history);
        } catch (err) {
        console.log(err.stack);
        }
    client.close();
    } 

batchImport();