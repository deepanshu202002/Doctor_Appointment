const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,getDoctorByIdController, doctorAppointmentsController,
} = require("../controllers/doctorCtrl");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", fetchuser, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", fetchuser, updateProfileController);
//POST  GET SINGLE DOC INFO
router.post("/getDoctorById",fetchuser, getDoctorByIdController);
// router.get(
//   "/doctor-appointments",
//   fetchuser,
//   doctorAppointmentsController
// );
module.exports = router;