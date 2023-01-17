import { sessionsCollection } from "../database.js";

export async function authentication(req, res, next){

    const{authorization} = req.headers;

    if(!authorization) return res.sendStatus(401);

    const token = authorization.replace('Bearer ','');
    const session = await sessionsCollection.findOne({token});

    if(!session) return res.status(401).send("Loggin is required.");

    next();
}