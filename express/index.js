const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json()); // middleware => modify incoming req data
// data from the body is added to the req , so we can use req.body

// routing

// app.get("/", (req, res) => {
//   res.status(200).send("Hello from express server");
// });

// app.get("/index", (req, res) => {
//   res.status(200).send("Hello from express server index");
// });

const tours = JSON.parse(fs.readFileSync("sample.json"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    // halka formatting
    status: "success",
    results: tours?.length,
    data: {
      tours: tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`running in port ${port} `);
});
