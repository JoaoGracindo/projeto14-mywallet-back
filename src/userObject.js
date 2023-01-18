import bcrypt from 'bcrypt';


export class UserAccount{

    constructor(name, email, senha){
        this.name = name;
        this.email = email;
        this.hash = bcrypt.hashSync(senha, 10);
        this.transactions = [];
        this.saldo = 0;
    }
}