// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  // userId: { type: String, required: true},
  
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fromAccountNumber: { 
    type: String, 
    required: function () {
    return this.type === "transfer" || this.type === "withdrawal";
    }
  },
  toAccountNumber: { 
    type: String,  
    required: function () {
    return this.type === "transfer" || this.type === "deposit";
    }
  },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['deposit', 'withdrawal', 'transfer'], 
    required: true 
  },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
