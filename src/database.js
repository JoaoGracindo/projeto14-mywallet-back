
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
await mongoClient.connect();
const db = mongoClient.db();
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

export {usersCollection, sessionsCollection};