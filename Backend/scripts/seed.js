const mongoose = require('mongoose');
const User = require('../Model/user.model');
const Account = require('../Model/account.model');
const Transaction = require("../Model/transaction.model")
const bcrypt = require('bcryptjs');
require('dotenv').config();

const run = async () => {
  await mongoose.connect(process.env.URI);

  await User.deleteMany({});
  await Account.deleteMany({});

  const password = await bcrypt.hash("Password123", 10);
  const user = await User.create({
    fullName: "dotun omoola",
    email: "dotunomoola@gmail.com",
    phoneNumber: '12121212122',
    password: password,
    isVerified: true
  });

  const account = await Account.create({
    userId: user._id,
    accountNumber: "1234567890",
    type: "checking",
    balance: 1000
  });

  await Transaction.create({
    fromAccountNumber: '5681722402',
    toAccountNumber: '5218859941',
    amount: 20,
    type: 'transfer',
    status: 'completed'
  })

  console.log("Seeded user and account");
  mongoose.disconnect();
};

run();
