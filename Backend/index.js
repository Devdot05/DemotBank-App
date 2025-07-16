const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT
const userRouter = require("./Routes/user.route")
let cors = require('cors')
const cookieParser = require('cookie-parser');
const router = require('./Controller/verify.controller');
const transactionRouter = require('./Routes/transaction.route');


app.use(cors({
  origin: ["https://demot-bank-app-dot.vercel.app","http://localhost:5173",],  
  credentials: true
}));
app.set('trust proxy', 1);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use("/", (req, res)=> {
  res.send('Welcome to backend')
})
app.use("/user", userRouter)
app.use('/transaction', transactionRouter)
app.use("/account", router)

 app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    console.error("Failed to parse JSON body:", err);
    return res.status(400).json({ status: 400, message: "Invalid JSON in request body" });
  }
  next(err);
}); 


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
    
})