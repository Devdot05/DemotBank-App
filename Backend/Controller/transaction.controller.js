const Transaction = require("../Model/transaction.model")
const Account = require("../Model/account.model");
const { json } = require("express");
require("dotenv").config()

const transfer = async (req, res) => {
  
  
  const { fromAccountNumber, toAccountNumber, description, userId } = req.body;
  const amount = Number(req.body.amount);

  if (!fromAccountNumber || !toAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (fromAccountNumber === toAccountNumber) {
    return res.status(400).json({ message: "Cannot transfer to same account" });
  }

  try {
    const from = await Account.findOne({ accountNumber: fromAccountNumber }).populate('userId');
    const to = await Account.findOne({ accountNumber: toAccountNumber }).populate('userId');

    if (!from || !to) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (from.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    from.balance -= amount;
    to.balance += amount;

    const user = to.userId

    const tx = await Transaction.create({
      fromUser: from.userId,
      toUser: to.userId,
      // user:req.user.id,
      fromAccountNumber,
      toAccountNumber,
      amount,
      type: "transfer",
      status: "completed",
      description,
    });

    await from.save();
    await to.save();

    res.status(201).json({ message: "Transfer complete", transaction: tx });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deposit = async (req, res) => {
  const { toAccountNumber, description } = req.body;
  const amount = Number(req.body.amount);

  if (!toAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Find account and populate the user it belongs to
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber }).populate("userId");

    if (!toAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update balance
    toAccount.balance += amount;

    // Create transaction with correct user reference
    const tx = await Transaction.create({
      toUser: req.user.id,
      toAccountNumber,
      amount,
      type: "deposit",
      status: "completed",
      description,
    });

    await toAccount.save();

    res.status(201).json({ message: "Deposit successful", transaction: tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const withdraw = async (req, res) => {
  const { fromAccountNumber, description, userId } = req.body;
  const amount = Number(req.body.amount);

  if (!fromAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const from = await Account.findOne({ accountNumber: fromAccountNumber });
    if (!from) return res.status(404).json({ message: "Account not found" });

    if (from.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    from.balance -= amount;

    const tx = await Transaction.create({
      fromUser: req.user.id,
      fromAccountNumber,
      amount,
      type: "withdrawal",
      status: "completed",
      description,  
    });

    await from.save();
    res.status(201).json({ message: "Withdrawal successful", transaction: tx });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.log(err);
    
  }
};

const getRecentTransaction = async(req, res) => {
  try{
    // console.log(req)
    const userId = req.user.id
      const transaction = await Transaction.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    })
    .populate("fromUser", "fullName email") // 💡 This is missing
    .populate("toUser", "fullName email")
    .sort({ createdAt: -1})
    .limit(5);
    res.status(200).json(transaction)
  }catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
    console.log(err);
    
  }
}


const getTransactionReceipt = async (req, res) => {
  // const transactionId = req.params.id;
  try{
     
    const userId = req.user.id
    console.log(userId);
      const transaction = await Transaction.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    })
    .populate("fromUser", "fullName email") // 💡 This is missing
    .populate("toUser", "fullName email")
    .sort({ createdAt: -1})
    res.status(200).json(transaction)
  }catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
    console.log(err);
    
  }
};


module.exports = { transfer, deposit, withdraw, getRecentTransaction, getTransactionReceipt };
