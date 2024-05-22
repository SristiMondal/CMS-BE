const express = require("express");
const router = express.Router();
const convertEmailToLower = require("../middlewares/convertEmailToLower");
const userControlller = require("../controllers/usersController");

// Chain HTTP methods for the same route
router.route("/login").post(convertEmailToLower, userControlller.login);
router.route("/logout").post(userControlller.logout);
router.route("/register").post(convertEmailToLower, userControlller.register);

// Chain HTTP methods for the same route with parameter
router
  .route("/:userId")
  .get(userControlller.getUserDetailsById)
  .put(userControlller.updateUser)
  .delete(userControlller.deleteUser);
router.route("/").get(userControlller.getAllUserDetails);

module.exports = router;
