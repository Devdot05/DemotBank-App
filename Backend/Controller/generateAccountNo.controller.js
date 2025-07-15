const Account = require("../Model/account.model");

const generateAccountNo = async() =>{
    let accountNumber;
    let exists = true;

    while(exists) {
        accountNumber = String(Math.floor(5000000000 + Math.random() * 1000000000));
        exists = await Account.exists({accountNumber})
    }

    return accountNumber;
}

module.exports = generateAccountNo