import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { sessionsCollection, usersCollection } from "../database.js";


export async function getSessionsController(req, res){
    try{
        const sessionsList = await sessionsCollection.find().toArray();
        return res.send(sessionsList);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function logInController(req, res){
    const token = uuid();
    const {email, senha} = req.body;

    let user;

    try{
        user = await usersCollection.findOne({email});

        if(!user || !bcrypt.compareSync(senha, user.hash)) return res.status(409).send("senha e/ou email incorretos.");

        await sessionsCollection.insertOne({token, userId: user._id});

        return res.status(201).send(token);

    }catch(err){
        return res.status(500).send(err);
    }
}