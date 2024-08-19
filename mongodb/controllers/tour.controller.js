const Tour = require("../models/tour.model");

async function getAllTour(req, res) {
  try {
    const tour = await Tour.find(); // return the
    // array of all document

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed boltte",
      message: error,
    });
  }
}

async function createTour(req, res) {
  /* 
  we call the method on the new document
  we had the tour that we created from the model
  and in that tour we used the save method
  */
  // const newTour  = new Tour({})
  // newTour.save()

  try {
    const newTour = await Tour.create(req.body);
    // we call the method directly on the model itself
    res.status(201).json({
      status: "success bolte",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail bolte",
      message: error,
    });
  }
}

async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
    res.status(201).json({
      status: "success boltejhbj",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed bolte",
      message: error,
    });
  }
}
async function updateTour(req, res) {
  try {
    console.log("Received update request for ID:", req.params.id);
    console.log("Update data:", req.body);

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure the updated data is validated against the schema
    });

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "No tour found with that ID",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function deleteTour(req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success boltejhbj",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
