import { usersCollection } from "../database.js";
import { signUpSchema } from "./userSchema.js";

export async function signUpMiddleware(req, res, next){

    const newUser = req.body;
    const validation = signUpSchema.validate(newUser);
    const emailAlreadyRegistered = await usersCollection.findOne({email: newUser.email});
    const nameAlreadyRegistered = await usersCollection.findOne({name: newUser.name});


    if( emailAlreadyRegistered || nameAlreadyRegistered)return res.sendStatus(409);
    if(validation.error)return res.status(422).send("Validation error");


    next();
}