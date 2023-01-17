import bcrypt from 'bcrypt';

class Transaction{
    constructor(isIncoming, amount){
        this.isIncoming = isIncoming;
        this.amount = amount
    }
}

export class UserAccount{

    constructor(name, email, senha){
        this.name = name;
        this.email = email;
        this.hash = bcrypt.hashSync(senha, 10);
        this.transactions = [];
        this.saldo = 0;
    }

    getName(){
        return this.name;
    } 

    getHash(){
        return this.hash;
    }

    getEmail(){
        return this.email;
    }

    getTrasactions(){
        return this.transactions;
    }

    getSaldo(){
        return this.saldo;
    }

    setTransaction(isIncoming, amount){

        const transaction = new Transaction(isIncoming, amount);
        this.transactions.push(transaction);

        if(isIncoming){
            this.saldo += amount;
        }else{
            this.saldo -= amount;
        }
    }
}