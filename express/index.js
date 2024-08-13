const express = require("express");

const app = express();

// routing

app.get("/", (req, res) => {
  res.status(200).send("Hello from express server");
});

app.get("/index", (req, res) => {
  res.status(200).send("Hello from express server index");
});

const port = 3000;
app.listen(port, () => {
  console.log(`running in port ${port} `);
});
