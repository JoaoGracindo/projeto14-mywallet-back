import { UserAccount } from "../userObject.js";
import {usersCollection} from '../database.js';


export async function postParticipantController(req, res){
    const {name, email, senha} = req.body;

    const user = new UserAccount(name, email, senha);


    try{
        await usersCollection.insertOne(user);
    }catch(err){

        return res.status(500).send(err);
    }

    res.sendStatus(201);
}

export async function getParticipantsController(req, res){
    let userList;

    try{
        userList = await usersCollection.find().toArray();    
    }catch(err){
        res.status(500).send(err);
    }

    res.status(200).send(userList);
}