import { ObjectId } from "mongodb";
import { usersCollection } from "../database.js";
import { transactionSchema } from "../middlewares/userSchema.js";
import dayjs from "dayjs";

async function aualizaSaldo(transactions, id){
    let saldo = 0;

    for(let i = 0; i < transactions.length; i++){

        if(transactions[i].isIncoming){
            saldo += Number(transactions[i].amount)
        }else{
            saldo -= Number(transactions[i].amount)
        }
    }

    await usersCollection.updateOne({_id: ObjectId(id)}, {$set: {saldo}});
}

export function getTransactionController(req, res){
    const user = res.locals.user;
    const {transactions, saldo, name} = user;

    return res.status(200).send({transactions, saldo, name});
}


export async function postTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;
    const newTransaction = req.body;

    const {error} = transactionSchema.validate(newTransaction);
    if(error)return res.status(422).send("Must inform a boolean, a number and valid text");

    transactions.push({...newTransaction, date: dayjs().format('MM:DD')});
    

    try{
        await usersCollection.updateOne({_id: ObjectId(user._id)}, {$set: {transactions}});
        aualizaSaldo(transactions, user._id);

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
        aualizaSaldo(transactions, user._id);
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
        aualizaSaldo(newTransactions, user._id);
        return res.sendStatus(200);

    }catch(err){

        return res.status(500).send(err);
    }

}