"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI} = process.env;

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
        const db = client.db("health-dairy");
        const result = await db.collection("users").find().toArray();
        res.status(200).json({status: 200, users:result});
        
       
        } catch (err) {
        console.log(err.stack);
        }
    client.close();   
}

//get user History
const getUserHistory = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        
        await client.connect();
        console.log("connected")
        const db = client.db("health-dairy");
        const result = await db.collection("history").find().toArray();
        res.status(200).json({status: 200, users:result});
        
    
        } catch (err) {
        console.log(err.stack);

        }
    client.close(); 
}


// get users by ID

const getUsersById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const {email} = req.params;
    console.log(email)
        await client.connect();
        console.log("connected")
        const db = client.db("health-dairy");
        // const result = await db.collection("users").findOne({ email });
        const result = await db.collection("users").find({email}).toArray();
        console.log(result)
        //let userExist = false;
        // result.forEach((user => {
        //     if(user.email === req.params.email){
        //         return userExist = true;
        //     }
        // }))
        if(result.length){
            res.status(200).json({ status: 200,  data: result[0]
             })
        }else{
            res.status(404).json({message : "User not found", data: {phone: "", height:0, weight:0, age:0, gender: "", address: ""}})
        }
        
        
            client.close(); 
        
        

} 
    //     console.log(result)
    //     if(result === null){
    //         throw new Error("user not found")
    //     }else{
    //         res.status(200).json({ status: 200, users: result })
    //     }
        
    // }

    // catch (err){ res.status(404).json({ status: 404,  users: "Not Found" });
//     // console.log(err)
// }
// client.close();
//}

//creates new user
const addUser = async(req, res) => { 
    const client = new MongoClient(MONGO_URI, options);
    //const {first_name, email} = req.body;
    //const result = await db.collection("users").findOne({email});
    try{
        //console.log(req.body);  
        await client.connect();
        //console.log("connected")
        const db = client.db("health-dairy");
        
        const {email, name} = req.body;
        const newId = uuidv4;
        const result = await db.collection("users").findOne({email : req.body.email});
        const query = { email }
        const newUserUpdate = {$set: {...req.body}}
        if(result){        
            await db.collection("users").updateOne(query, newUserUpdate);
            console.log(result)
            return res.status(200).json({ status: 200, users: req.body })
        }
        await db.collection("users").insertOne({...req.body, _id:newId});
        res.status(200).json({status:200, id:newId, data:req.body, message:"success"})
    }catch(err){
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
        const db = client.db("health-dairy");
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
    updateUser,
    getUserHistory
};