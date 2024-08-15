const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();
router
  .route("/api/v1/user")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/api/v1/user/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
// detelte status code => 204

module.exports = router;
