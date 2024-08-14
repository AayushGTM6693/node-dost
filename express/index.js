const fs = require("fs");
const express = require("express");

const app = express();

// routing

// app.get("/", (req, res) => {
//   res.status(200).send("Hello from express server");
// });

// app.get("/index", (req, res) => {
//   res.status(200).send("Hello from express server index");
// });

const { tours } = JSON.parse(fs.readFileSync("sample.json"));

app.get("/api/v1/tours", (req, res) => {
  console.log("tttt", tours.length);
  res.status(200).json({
    // halka formatting
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`running in port ${port} `);
});
