const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    emailID : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email ID");
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password not strong enough");
            }
        }
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Invalid Gender");
            }
        }
    },
    skills : {
        type : [String]
    }
},{
    timestamps : true
});
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id}, "DevTinder@180398", {expiresIn : "1d"});
    return token;
};
userSchema.methods.verifyPassword = async function(passwordInputByUser){
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);
    return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);