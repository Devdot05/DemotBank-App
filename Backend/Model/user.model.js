const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs")


const mongodb_uri = process.env.URI;

// Connect to MongoDB
mongoose.connect(mongodb_uri)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

// Define the User schema
    const userSchema = mongoose.Schema({
        fullName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phoneNumber: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: [String], default: ['customer']},
        isVerify: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now}

    })

    let saltRound = 10
    userSchema.pre("save", function(next){
        console.log(this.password);
        bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
            if(err){
                console.log(err);
                
            }else{
                console.log(hashedPassword);
                this.password = hashedPassword
                next()
                
            }
        })
    })
 
    userSchema.methods.validatePassword = function(password, callback){
        bcrypt.compare(password, this.password, (err,same)=>{
            if(!err){
                callback(null,same)
            }else{
                next()
            }
        })
    }
 
const User = mongoose.model("User", userSchema);

module.exports = User;