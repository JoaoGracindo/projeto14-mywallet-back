import { UserAccount } from "../userObject.js";
import {usersCollection} from '../database.js';


export async function postParticipantController(req, res){
    const {nome, email, senha} = req.body;

    const user = new UserAccount(nome, email, senha);

    try{
        await usersCollection.insertOne(user);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }

    res.sendStatus(201);
}

export async function getParticipantsController(req, res){
    let userList;

    try{
        userList = await usersCollection.findOne();    
    }catch(err){
        res.status(500).send(err);
    }

    res.status(200).send(userList);
}