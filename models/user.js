const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
    },
    DoctorBooked: [{
      type: String,
    }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
