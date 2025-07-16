const userModel = require("../Model/user.model")
const generateAccountNumber = require("./generateAccountNo.controller")
const Account = require('../Model/account.model')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const verifyToken = require("../Middleware/verifyToke")
const secretKey = process.env.SECRET_KEY

const register = async (req,res) => {
    console.log(req.body);
    try{
        const {fullName, email, password, phoneNumber} = req.body
        let existingUser = await userModel.findOne({email: req.body.email})
        if (existingUser){
            res.status(400).json({status:400, message: "Email already exist" });
        } 
        else{
            const newUser = await userModel.create({
                fullName,
                email,
                phoneNumber,
                password,
                isVerify: false
            })
        
            const accountNumber = await generateAccountNumber();
            
            const accounts = await Account.create({
                userId: newUser._id,
                user: newUser._id,
                accountNumber,
                type: "checking",
                balance: 100
            })

            console.log(accounts)
    
            res.status(201).json({
                message: 'User registered successfully!',
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    phoneNumber: newUser.email,
                },
                account: {
                    id: accounts._id,
                    accountNumber: accounts.accountNumber,
                    type: accounts.type,
                    balance: accounts.balance
                }
            })
        }

            

    }
    catch(err){
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Server error during registration." });
    }
 
        
 
}

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email })
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" });

      user.validatePassword(password, (err, same) => {
        if (err || !same) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: user._id, email },
          process.env.SECRET_KEY,
          { expiresIn: "1hr" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 3600000,
          path: "/",
        });

        res.json({
          message: "Login successful",
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
          }
        });
      });
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};
const getToken =  async (req, res) => {
    // console.log(req);
    try {
        const user = await userModel.findOne({email: req.user.email})
        if(!user) return(404).json({message: "user not found"});

        const account = await Account.findOne({userId: user._id});
        if(!account) {
            return res.status(404).json({message: "Account not found"});
        }

        res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      account: {
        id: account._id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        type: account.type
      }
    });

    }catch(error){
        console.error("Error in /me route:", error);
        res.status(500).json({ message: "Server error" });
    }
    }

module.exports = {register, login, getToken}