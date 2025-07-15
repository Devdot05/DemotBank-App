const Account = require("../Model/account.model");
const User = require("../Model/user.model");
const express = require('express')
const router = express.Router()

router.get("/verify/:accountNumber", async (req, res) => {
  try {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber }).populate("user");
    if (!account || !account.user) return res.status(404).json({ message: "User not found" });

    res.json({
      accountNumber: account.accountNumber,
      fullName: `${account.user.fullName} `
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router
