const express = require('express');
const userRouter = express.Router()
const { register, login, getToken } = require('../Controller/user.controller');
const verifyToken = require("../Middleware/verifyToke")


userRouter.post("/register", register)
userRouter.post("/login",login)
userRouter.get('/me', getToken)

module.exports = userRouter