const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect("mongodb+srv://sahalpmk:Lali180398@users.9f99v8h.mongodb.net/DevTinder");
}

module.exports = {connectDB};