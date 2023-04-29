const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUser,
  getSingleUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { sendMail } = require("../controllers/sendMail");
const {
  donationController,
  getAllDonations,
} = require("../controllers/donation");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

router.route("/sendMail").post(sendMail);

router.route("/donation").post(donationController).get(getAllDonations);

module.exports = router;
