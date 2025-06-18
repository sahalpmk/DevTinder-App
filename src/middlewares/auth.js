const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
try
{const {token} = req.cookies;
    if(!token){
        throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "DevTinder@180398");
    const {_id} = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found!")
    }
    req.user = user;
    next();
}
catch(err){
    res.status(404).send(err.message);
}   
};
module.exports = {userAuth};