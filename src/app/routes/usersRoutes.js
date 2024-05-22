const express = require("express");
const router = express.Router();
const convertEmailToLower = require("../middlewares/convertEmailToLower");
const userControlller = require("../controllers/usersController");
const authHandler = require("../middlewares/authHandler");

// Chain HTTP methods for the same route
router.route("/login").post(convertEmailToLower, userControlller.login);
router.route("/logout").post(userControlller.logout);
router.route("/register").post(convertEmailToLower, userControlller.register);

// Chain HTTP methods for the same route with parameter
router
  .route("/:userId")
  .get(authHandler.verifyToken, userControlller.getUserDetailsById)
  .put(authHandler.verifyToken, userControlller.updateUser)
  .delete(authHandler.verifyToken, userControlller.deleteUser);
router
  .route("/")
  .get(authHandler.verifyToken, userControlller.getAllUserDetails);

module.exports = router;
