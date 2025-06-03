const express = require("express");
const app = express();
app.use("/sahal2",(req, res) =>{
    console.log("sahal 3");
    res.send("Hi sahal")
    //next();
})
app.use("/",(req, res) =>{
    console.log("sahal 4");
    res.send("Hi sahal 2")
})
app.listen(7777, ()=>{
    console.log("Listening on port 7777")
})
app.use("/", (req, res)=>{
    res.send("Hi World 4")
})