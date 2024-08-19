const express = require("express");
const morgan = require("morgan");

const app = express(); // Define app before using it

// Use morgan middleware only in development mode
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const TourRouter = require("./routes/tour.route");
const userRouter = require("./routes/user.route");

app.use(express.json()); // Middleware to parse JSON request bodies

// Mounting the routers
app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
