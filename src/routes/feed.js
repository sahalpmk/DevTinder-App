const express = require("express");
const feedRouter = express.Router();
const User = require("../models/user.js");

feedRouter.get("/feed", async (req, res) => {
    try{
        const user = await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(401).send("Something went wrong")
    }
})

module.exports = feedRouter;