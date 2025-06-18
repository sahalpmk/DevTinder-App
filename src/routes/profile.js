const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user.js");
const {userAuth} = require("../middlewares/auth.js");
const validator = require("validator");
const bcrypt = require("bcrypt");


profileRouter.get("/profile", userAuth, async (req, res) => {
    try{
       const user = req.user;
        res.send("User fetched successfully: " + user.firstName);
    }
    catch(err){
        res.status(401).send(err.message)
    }
})

profileRouter.patch("/profile/forgotPassword", async (req, res) => {
    try{
        const emailID = req.body.emailID;
        const newPassword = req.body.password;
        
        const user = await User.findOne({emailID : emailID});

        if(!user){
            throw new Error("Invalid Credentials");
        }
       if(!newPassword){
        throw new Error("New Password Required")
       }
       if(!validator.isStrongPassword(newPassword)){
        throw new Error("Strong Password Required")
       }
       const hashedPassword = await bcrypt.hash(newPassword, 10);

       user.password = hashedPassword;
       await user.save();
       res.status(200).send("Password updated successfully!")
    }
    catch(err){
        res.status(401).send(err.message)
    }
})



module.exports = profileRouter;