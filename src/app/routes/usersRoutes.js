const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  deleteUser,
  getUserDetailsById,
  getAllUserDetails,
  updateUser,
} = require("../controllers/usersController");

// Chain HTTP methods for the same route
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/register").post(register);

// Chain HTTP methods for the same route with parameter
router
  .route("/:userId")
  .get(getUserDetailsById)
  .put(updateUser)
  .delete(deleteUser);
router.route("/").get(getAllUserDetails);

module.exports = router;
