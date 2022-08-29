"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");



require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    };

//endpoints
//gets all the users
const getAllUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        
        await client.connect();
        console.log("connected")
        const db = client.db("health_dairy");
        const result = await db.collection("users").find().toArray();
        res.status(200).json({status: 200, users:result});
        
       
        } catch (err) {
        console.log(err.stack);
        }
    client.close();   
}

// get users by ID

const getUsersById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const {_id} = req.params;
        
        await client.connect();
        console.log("connected")
        const db = client.db("health_dairy");
        const result = await db.collection("users").findOne({ _id });
        console.log(result)

        result
    ? res.status(200).json({ status: 200, users: result })
    : res.status(404).json({ status: 404,  users: "Not Found" });
client.close();
}

//creates new user
const addUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    //const {first_name, email} = req.body;
    console.log(req.body);
    try{    
        await client.connect();
        console.log("connected")
        const db = client.db("health_dairy");
        const result = await db.collection("users").insertOne(req.body);
        //console.log(result)
        res.status(200).json({ status: 200, users: req.body })
    }
    catch(err){
        console.log(err)
    }
client.close();
    
}

//Update user
const updateUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    //const {first_name, email} = req.body;
    const {_id} = req.params;
    const query = { _id }
    const newUserUpdate = {$set: {...req.body}}
    console.log(req.body);
    try{    
        await client.connect();
        console.log("connected")
        const db = client.db("health_dairy");
        const result = await db.collection("users").findOne({id : req.body._id });
        await db.collection("users").updateOne(query, newUserUpdate);
        console.log(result)
        res.status(200).json({ status: 200, users: req.body })
    }
    catch(err){
        console.log(err)
    }
client.close();
    
}


module.exports = {
    getAllUsers,
    getUsersById,
    addUser,
    updateUser
};