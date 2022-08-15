const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doc");
const bcrypt = require("bcryptjs");
const authFile = require("../services/authentication");

//signup for user
router.post("/signup", async (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
    await User.create({
      username: req.body.username,  
      useremail: req.body.useremail,
      password: hash,
    });
  
    return res.send("User created");
  });
    // get all users
    router.get("/fetchusers", authFile.authenticationChecker, async (req, res) => {
      const users = await User.find({});
    
      return res.send(users);
    });
  //login user 
  router.post("/signin", async (req, res) => {
    const user = await User.findOne({useremail : req.body.useremail})
    if(!user){
      return res.status(500).send("user not found");
    }
    //find return array
    //findone return object
    
  const check = bcrypt.compareSync(req.body.password, user.password);
    if(!check){
      return res.status(500).send("user password is not correct");

    }
  
    const token = authFile.genToken(user._id);

    return res.send({token : token,
    userid : user._id});
  });

  //update user by run
  router.post("/updateuser", async (req, res) =>{
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
  });

  //delete user
  router.delete("/deleteuser", async (req, res) =>{
    const id = req.body.id;
    await User.findByIdAndDelete(id);

    return res.send("User deleted successfully");
  });
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //signup for doctor
router.post("/signupdoc", authFile.authenticationChecker ,async (req, res) => {
    const DoctorsDetail = {
      Doctorname: req.body.Doctorname,
      About: req.body.About,
      Degree: req.body.Degree,
      Specielity: req.body.Specielity,
      Experience: req.body.Experience,
      Address: req.body.Address,
      Fees: req.body.Fees,
      rating : req.body.rating,
      DoctorImg : req.body.DoctorImg,
    }

    await Doctor.create(DoctorsDetail);
  
    return res.send("doctor created");
  });


  //Find all doctors 

  router.get("/FindallDoctors" , authFile.authenticationChecker, async (req,res) =>
  {
      const doctors = await Doctor.find({});

      return res.send(doctors);
  })

  //Find single Doctor

  router.get("/SingleDoctor/:Doctorid" , authFile.authenticationChecker, async (req,res) =>
  {
      const doctorid = req.params.Doctorid;
      const doctor  = await Doctor.findById((doctorid))
      
      return res.send(doctor);
  })


  //Doctor Booked
  router.post("/DoctorBooked/:doctorid" , authFile.authenticationChecker , async (req,res) =>
  {
    const userid = req.body.id;
    const doctorId = req.params.doctorid;
    const user = await User.findByIdAndUpdate(userid,{ 
      $push : {DoctorBooked : doctorId}
    },
    {
      new : true,
      runValidators : true,
    })
    return res.send(user);
  })


  //delete doctor
  router.delete("/deletedoctor", async (req, res) =>{
    const id = req.body.id;
    await Doctor.findByIdAndDelete(id);

    return res.send("User deleted successfully");
  });


  module.exports = router;