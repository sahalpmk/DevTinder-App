const express = require("express");
const app = express();
const {connectDB} = require("./config/database.js");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const feedRouter = require("./routes/feed.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use("/", authRouter);
app.use("/", feedRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    app.listen(7777, ()=>{
    console.log("Listening on port 7777")})
}).catch(() => {
    console.log("Couldnt connnect to the DB");
})