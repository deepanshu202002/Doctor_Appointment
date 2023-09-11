const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const fetchuser = require("../middlewares/fetchuser");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers",fetchuser, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", fetchuser, getAllDoctorsController);
router.post("/changeAccountStatus", fetchuser, changeAccountStatusController);

module.exports = router;