const express = require("express");
const tourController = require("../controllers/tour.controller");

const router = express.Router();

router // api aliasing
  .route("/top-route")
  .get(tourController.topRoute, tourController.getAllTour);
// topRoute middleware re query lai prefill gardinxa so, we can access that is getalltour => req.query
router
  .route("/")
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
