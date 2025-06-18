const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post("/request/sent/:status/:userID", userAuth, async (req, res) =>{

    try{
    const fromUser = req.user;
    const fromUserID = fromUser._id;
    const toUserID = req.params.userID;
    const status = req.params.status;

    const toUser = await User.findOne({_id : toUserID});
    if(!toUser){
        throw new Error("User not found")
    }

    const allowedStatus = ["interested", "ignored"];
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status type")
    }

    const connectionExist = await connectionRequestModel.findOne({$or: [
        {fromUserID, toUserID},{fromUserID : toUserID, toUserID : fromUserID}
    ]});
    if(connectionExist){
        throw new Error("Connection already Exist!")
    }
    const connectionRequest = new connectionRequestModel({fromUserID, toUserID, status});

    await connectionRequest.save();
    res.status(200).send("Connection request successfully sent" + connectionRequest)
    
    }
    catch(err){

        res.status(400).send(err.message);
    }

});

requestRouter.post("/request/review/:status/:userID", userAuth, async (req, res) =>{

    try{
    const requestID = req.params.userID;
    const status = req.params.status;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status type")
    }

    const connectionRequest = await connectionRequestModel.findOne({
        _id : requestID,
        toUserID : req.user._id,
        status : "interested"
    })

    if(!connectionRequest){
        throw new Error("Request not found!")
    }

    connectionRequest.status = status;
    await connectionRequest.save();

    res.status(200).send("Connection request "+status+" successfully")
    
    }
    catch(err){

        res.status(400).send(err.message);
    }

})

module.exports = requestRouter;