const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {validateData} = require("../utils/validation.js");

authRouter.post("/signup", async (req, res) => {
    try{
        validateData(req);
        const {firstName, lastName, emailID, password, gender, skills} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({firstName, lastName, emailID, password : hashedPassword, gender, skills});
        await user.save();
        res.send("User created successfully!");
    }
    catch(err){
        res.status(401).send(err.message)
    }

});

authRouter.post("/login", async (req, res) => {
    try{
        
        const emailID = req.body.emailID;
        const password = req.body.password;
        const user = await User.findOne({emailID : emailID});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.verifyPassword(password);
        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        }
        const token = await user.getJWT();
        res.cookie("token", token)
        res.send("Login successfull!");
    }
    catch(err){
        res.status(401).send(err.message)
    }

});

authRouter.post("/logout", async (req, res) => {
        
        res.cookie("token", null, {expires : new Date(Date.now())})
        res.send("Logout successfull!");
   
});

module.exports = authRouter;