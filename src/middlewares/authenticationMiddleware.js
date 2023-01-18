import { ObjectId } from "mongodb";
import { sessionsCollection, usersCollection } from "../database.js";

export default async function authentication(req, res, next){

    const{authorization} = req.headers;
    if(!authorization) return res.sendStatus(401);
    
    const token = authorization.replace('Bearer ','');
    let user;

    try{
        const session = await sessionsCollection.findOne({token});
        if(!session) return res.status(401).send("Loggin is required.");

        const _id = ObjectId(session.userId);
        user = await usersCollection.findOne({_id});
        if(!user) return res.status(418).send("problema com a pesquisa de user apartir do id no token");

    }catch(err){

       return res.status(500).send(err);
    }


    res.locals.user = user;

    next();
}