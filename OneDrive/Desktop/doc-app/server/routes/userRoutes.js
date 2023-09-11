const express = require('express');
const userModel = require('../models/userModel')
const router = express.Router();
var bcrypt = require('bcryptjs');
const moment = require("moment");
const { body, validationResult } = require("express-validator");
var jwt=require('jsonwebtoken');
const fetchuser=require("../middlewares/fetchuser");
const { authController,applyDoctorController,userAppointmentsController,getAllNotificationController,deleteAllNotificationController, getAllDocotrsController,bookAppointmentController } = require('../controllers/userCtrl');
const JWT_SECRET="Deepanshuisagoodboy"
// ROUTE 1 : Create a user using : POST "/api/auth/createuser" . No Login required
router.post(
  "/register",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid ").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    //Check whwther user with this Email exists already
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPaass=await bcrypt.hash(req.body.password,salt);
      //Create a new user
      user= await userModel.create({
        name: req.body.name,
        password: secPaass,
        email: req.body.email,
      })
      


      res.status(201).send({ message: "Register Sucessfully", success: true });
      //   .then(user => res.json(user)).catch(err=> {console.log(err)
      //   res.json({error: 'Please enter a unique value of email',message:err.message})});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error ");
    }
  }
);
// ROUTE 2 : Authenticate a user using : POST "/api/auth/login" . No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid ").isEmail(),
    body("password",'Password cannot be blank').exists(),
  ],
  async (req, res) => {
      let success=false;
      //If there are errors return Bad Request and Errors
      const errors = validationResult(req);
      try{
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        let user= await userModel.findOne({email});
        if(!user){
          success = false
         return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success=false 
         return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }
        const data= {
          user:{
            id: user.id
          }
        }
// console.log(data);
        const authtoken=jwt.sign(data,JWT_SECRET);
        
        res.status(200).send({ message: "Login Success", success: true, authtoken });
      }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
      }
  });
  router.post('/getUserData',fetchuser,authController);
  router.post("/apply-doctor", fetchuser, applyDoctorController);
  router.post("/get-all-notification",fetchuser,getAllNotificationController);

  router.post("/delete-all-notification",fetchuser,deleteAllNotificationController);
router.get("/getAllDoctors",fetchuser,getAllDocotrsController);
router.post("/book-appointment", fetchuser, bookAppointmentController);
// router.post("/booking-availbility",fetchuser, bookingAvailabilityController);
//Appointments List
router.get("/user-appointments", fetchuser, userAppointmentsController);
module.exports = router;