import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

let db; 
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try{
    await mongoClient.connect();
    db = await mongoClient.db();

}catch(err){
    console.log(err);
}

const sessiosCollection = db.collections('sessions');
const usersCollection = db.collections('users');

export {sessiosCollection, usersCollection}