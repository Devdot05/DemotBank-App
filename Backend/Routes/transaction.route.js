const express = require('express');
const { transfer, deposit, withdraw, getRecentTransaction, getTransactionReceipt } = require('../Controller/transaction.controller');
const verifyToken = require('../Middleware/verifyToke');
 
const transactionRouter = express.Router()

transactionRouter.post('/transfer',  verifyToken, transfer)
transactionRouter.post('/deposit',  verifyToken, deposit)
transactionRouter.post('/withdraw',  verifyToken, withdraw)
transactionRouter.get('/recent', verifyToken, getRecentTransaction)
transactionRouter.get('/transactions', verifyToken, getTransactionReceipt)
 


module.exports = transactionRouter