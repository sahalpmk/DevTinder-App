const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserID : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    toUserID : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["interested", "ignored", "accepted", "rejected"],
            message : "{VALUE} is incorrect status type"
        }
    }
},
{
    timestamps : true
});
connectionRequestSchema.index({fromUserID : 1, toUserID : 1})
connectionRequestSchema.pre("save", function(next){
    if(this.toUserID.equals(this.fromUserID)){
        throw new Error("You cannot sent request to yourself!")
    }
    next();
});

module.exports = mongoose.model("connectionRequestModel", connectionRequestSchema)
