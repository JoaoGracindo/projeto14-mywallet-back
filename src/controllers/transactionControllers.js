import { transactionSchema } from "../middlewares/userSchema.js";

export async function getTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;

    return res.status(200).send(transactions);
}


export async function postTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;
    const {isIncoming, amount, title} = req.body;

    const {error} = transactionSchema.validate({isIncoming, amount, title});
    if(error)return res.status(422).send("Must inform a boolean, a number and valid text");


    transactions.setTransaction(isIncoming, amount, title);

    return res.sendStatus(201);
}


export async function putTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;


}

export async function deleteTransactionController(req, res){
    const user = res.locals.user;
    const {transactions} = user;


}