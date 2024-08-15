const fs = require("fs");
const express = require("express");
const tourController = require("../controllers/tour.controller");

const router = express.Router();

// this middleware is specified to this router only
router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTour)
  .post(tourController.checkBody, tourController.postTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
