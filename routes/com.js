const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doc");
const Support = require("../models/support");
const bcrypt = require("bcryptjs");
const authFile = require("../services/authentication");


//signup for user
router.post("/signup", async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    console.log(req.body.password);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const detail = {
      username: req.body.username,
      useremail: req.body.useremail,
      password: hash,
      usertype: "user"
    }

    console.log(detail);
    await User.create(detail);

    return res.send("User created");
  }
  catch (error) {
    console.log(error);
  }
});


// get all users
router.get("/fetchusers", authFile.authenticationChecker, async (req, res) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});

//login user 
router.post("/signin", async (req,res) => {
  try {

    const user = await User.findOne({ useremail: req.body.useremail })
    if (!user) {
      return res.status(500).send("user not found");
    }
    //find return array
    //findone return object

    console.log(req.body.password);
    const check = await bcrypt.compare(req.body.password, user.password);

    if (!check) {
      return res.status(500).send("user password is not correct");
    }

    const token = authFile.genToken(user._id);

    return res.send({
      token: token,
      userid: user._id
    });
  } catch (error) {
    console.log(error);
  }
});

//update user by run
router.post("/updateuser", async (req, res) => {
  try {
    const id = req.body.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: req.body.password,
      },
      {
        new: true,
        runValidators: true
      }
    );
    return res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

//delete user
router.delete("/deleteuser", async (req, res) => {
  try {
    const id = req.body.id;
    await User.findByIdAndDelete(id);

    return res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//signup for doctor
router.post("/signupdoc", authFile.authenticationChecker, async (req, res) => {
  try {
    const DoctorsDetail = {
      Doctorname: req.body.Doctorname,
      About: req.body.About,
      Degree: req.body.Degree,
      Specielity: req.body.Specielity,
      Experience: req.body.Experience,
      Address: req.body.Address,
      Fees: req.body.Fees,
      rating: req.body.rating,
      DoctorImg: req.body.DoctorImg,
    }

    await Doctor.create(DoctorsDetail);

    return res.send("doctor created");
  } catch (error) {
    console.log(error);
  }
});


//Find all doctors 

router.get("/FindallDoctors", authFile.authenticationChecker, async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    return res.send(doctors);
  } catch (error) {
    console.log(error);
  }
})

//Find single Doctor

router.get("/SingleDoctor/:Doctorid", authFile.authenticationChecker, async (req, res) => {
  try {
    const doctorid = req.params.Doctorid;
    const doctor = await Doctor.findById((doctorid))

    return res.send(doctor);
  } catch (error) {
    console.log(error);
  }
})


//Doctor Booked
router.post("/DoctorBooked/:doctorid", authFile.authenticationChecker, async (req, res) => {
  try {
    const userid = req.body.id;
    const doctorId = req.params.doctorid;
    const user = await User.findByIdAndUpdate(userid, {
      $push: { DoctorBooked: doctorId }
    },
      {
        new: true,
        runValidators: true,
      })
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
})


//delete doctor
router.delete("/deletedoctor", async (req, res) => {
  try {
    const id = req.body.id;
    await Doctor.findByIdAndDelete(id);

    return res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
  }
});
//////////////////////////////support
// message by user
router.post("/message", async (req, res) => {
  try {

    const data = req.body.support;
    console.log(data);
    const supportsave = await Support.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    })

    return res.send(supportsave);
  }
  catch (error) {
    console.log(error);
  }
});


//------------------ Get all Users ----------------------//

router.get("/getUsers", async (req, res) => {
  try {
    const AllUsers = await User.find();
    res.send(AllUsers)
  } catch (error) {
    console.log(error);
  }
})


//------------ Check user type -----------------//

router.post("/checkuser", async (req, res) => {
  try {
    const data = req.body.data;
    console.log(data);
    const user = await User.findById(data._id);
    if (data._id == null) {
      res.send("public")
    } else {
      if (user.usertype == "admin") {
        res.send("admin")
      } else {
        res.send("user")
      }
    }

  } catch (error) {
    console.log(error);
  }
})





module.exports = router;