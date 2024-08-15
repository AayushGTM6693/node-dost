const express = require("express");

function getAllUsers(req, res) {}
function createUser(req, res) {}
function getUser(req, res) {}
function updateUser(req, res) {}
function deleteUser(req, res) {}

const router = express.Router();
router.route("/api/v1/user").get(getAllUsers).post(createUser);
router
  .route("/api/v1/user/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// detelte status code => 204

module.exports = router;
