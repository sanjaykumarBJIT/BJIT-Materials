const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username was not provided"],
        maxLength: 30,
    },
    owner: {
        type: String,
        required: [true, "Username was not provided"],
        maxLength: 10,
    },
    email: {
        type: String,
        required:[true, "Email was not provided"],
    },
    age: {
        type: Number,
        min: 10,
        required:[true, "Email was not provided"],
    },
    createdAt: {
        type: Date,
        required:false,
        default:false,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;