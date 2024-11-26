const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
    },
    slackId: String,
    createdAt: {
        type: Date,
        default:Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);