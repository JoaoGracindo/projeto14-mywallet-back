import bcrypt from 'bcrypt';

class Transaction{
    constructor(isIncoming, amount){
        this.isIncoming = isIncoming;
        this.amount = amount
    }
}

export class UserAccount{

    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this.hash = bcrypt.hashSync(senha, 10);
        this.transactions = [];
        this.saldo = 0;
    }

    getNome(){
        return this.nome;
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