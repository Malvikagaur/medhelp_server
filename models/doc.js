const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    Doctorname: {
      type: String,
      required: true,
    },
    About: {
      type: String,
      required: true,
    },
    Degree: {
      type: String,
      required: true,
    },
    Specielity: {
      type: String,
      required: true,
    },
    Experience: {
      type: String,
      required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Fees: {
        type: String,
        required: true,
    },
    rating : {
      type: Number,
      required : true,
    },
    DoctorImg : {
      type : String,
      required :true
    }
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", docSchema);
module.exports = Doctor;
