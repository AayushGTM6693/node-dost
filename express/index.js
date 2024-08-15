const express = require("express");
// const morgan = require("morgan");

const TourRouter = require("./routes/tour.route");
const userRouter = require("./routes/user.route");
// order matters  in express
const app = express();

// app.use(morgan("dev"));
app.use(express.json()); // middleware => modify incoming req data
// data from the body is added to the req , so we can use req.body
// app.use => we use middleware

app.use((req, res, next) => {
  console.log("Hello from the middleware 🤚");
  next();
}); // global middleware should be above the route handler
// route is also middleware that applies for certain url

// routing
// app.get("/", (req, res) => {
//   res.status(200).send("Hello from express server");
// });

// mounting the router
app.use("/api/v1/tours", TourRouter); // tourrouter is being connected with our app
app.use("/api/v1/users", userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`running in port ${port} `);
});
