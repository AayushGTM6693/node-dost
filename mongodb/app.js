const express = require("express");

const TourRouter = require("./routes/tour.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());

// mounting the router
app.use("/api/v1/tours", TourRouter);

module.exports = app;
