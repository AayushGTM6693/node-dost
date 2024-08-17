const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema); // a model out of the schema

// // a document out of a model
// const testTour = new Tour({
//   name: "The boys rated",

//   price: 496,
// });
// // test tour is an instance of the Tour model
// // this has methods to interact with the database
// testTour
//   .save() // this returns a promise which we can consume
//   .then(() => {})
//   .catch((err) => {
//     console.log("🥵", err);
//   });

module.exports = Tour;
