import { ObjectId } from "mongodb";
import { usersCollection } from "../database.js";
import { transactionSchema } from "../middlewares/userSchema.js";

export function getTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;

    return res.status(200).send(transactions);
}


export async function postTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;
    const newTransaction = req.body;

    const {error} = transactionSchema.validate(newTransaction);
    if(error)return res.status(422).send("Must inform a boolean, a number and valid text");

    transactions.push(newTransaction);

    try{
        await usersCollection.updateOne({_id: ObjectId(user._id)}, {$set: {transactions}});

    }catch(err){
        return res.status(500).send(err)
    }

    return res.sendStatus(201);
}


export async function putTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;
    const {id} = req.params;
    const newTransaction = req.body;

    const {error} = transactionSchema.validate(newTransaction);
    if(error)return res.status(422).send("Must inform a boolean, a number and valid text");
    if(!id)return res.sendStatus(400);

    transactions[id] = newTransaction;

    try{
        await usersCollection.updateOne({_id: ObjectId(user._id)}, {$set: {transactions}});
        return res.sendStatus(200);

    }catch(err){

        return res.status(500).send(err);
    }

}

export async function deleteTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;
    const {id} = req.params;

    const newTransactions = transactions.filter((obj, index) => index !== Number(id));

    try{
        await usersCollection.updateOne({_id: ObjectId(user._id)}, {$set: {transactions: newTransactions}});
        return res.sendStatus(200);

    }catch(err){

        return res.status(500).send(err);
    }

}