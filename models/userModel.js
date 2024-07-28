const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your E-mail"],
    },
    password: {
      type: String,
      required: [true, "Please Enter A Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
