const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupsize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a group size"],
  },

  ratingsAverage: {
    type: Number,
    default: 1.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },

  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, // remove whitespaces at start and end
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
// every thing that isnt in the schema is ignored from the post req

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
