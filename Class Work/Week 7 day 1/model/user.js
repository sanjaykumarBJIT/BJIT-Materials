const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name was not provided"],
    maxLength: 30,
  },
  email: {
    type: String,
    unique: [true, "Email should be unique"], // Unique property here
    required: [true, "Email was not provided"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  userName: {
    type: String,
    unique: [true, "userName should be unique"],
    required: [true, "Username was not provided"],
    maxLength: 30,
  },
  access: {
    type: String,
    required: [true, "Access was not provided"],
    maxLength: 30,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
