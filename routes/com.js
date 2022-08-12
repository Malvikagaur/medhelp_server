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
      return res.send("user not found");
    }
    //find return array
    //findone return object
    
  const check = bcrypt.compareSync(req.body.password, user.password);

    if(!check){
      return res.status(500).send("user password is not correct");
    }
  
    const token = authFile.genToken(user._id);

    return res.send(token);
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
router.post("/signupdoc", async (req, res) => {
    await Doctor.create({
      Doctorname: req.body.Doctorname,
      Doctoremail: req.body.Doctoremail,
      Degree: req.body.Degree,
      Specielity: req.body.Specielity,
      Experience: req.body.Experience,
      address: req.body.address,
      Fees: req.body.Fees,
    });
  
    return res.send("doctor created");
  });

  //delete doctor
  router.delete("/deletedoctor", async (req, res) =>{
    const id = req.body.id;
    await Doctor.findByIdAndDelete(id);

    return res.send("User deleted successfully");
  });


  module.exports = router;