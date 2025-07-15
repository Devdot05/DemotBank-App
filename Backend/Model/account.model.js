// models/Account.js
const mongoose = require("mongoose");
 

const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accountNumber: { type: String, unique: true, required: true },
  type: { type: String, enum: ['checking', 'savings'], required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "NGN" },
  status: { type: String, enum: ['active', 'frozen', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Account", accountSchema);
