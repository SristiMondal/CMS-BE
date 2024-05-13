const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  deleteUser,
  getUserDetails,
  updateUser,
} = require("../controllers/usersController");

// Chain HTTP methods for the same route
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/register").post(register);

// Chain HTTP methods for the same route with parameter
router.route("/:userId").get(getUserDetails).put(updateUser).delete(deleteUser);

module.exports = router;
