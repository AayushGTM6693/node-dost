const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../sample.json`));

function getAllTour(req, res) {
  res.status(200).json({
    // by sending response we end
    // req response cycle

    status: "success",
    results: tours?.length,
    data: {
      tours: tours,
    },
  });
}

function postTour(req, res) {
  // console.log(req.body);
  const newId = tours[tours?.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log("new tour", newTour);

  tours.push(newTour);
  console.log("tours", tours);

  // so now we need this data to persist in the json
  fs.writeFile("sample.json", JSON.stringify(tours), (err) => {
    // we save the new data in our file and send the new data in the response
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
}

function getTour(req, res) {
  // req.params , ? => optional params
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    // halka formatting
    status: "success",

    data: {
      tour,
    },
  });
}

function updateTour(req, res) {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour here:",
    },
  });
}

function deleteTour() {}

module.exports = {
  getAllTour,
  getTour,
  postTour,
  updateTour,
  deleteTour,
};
