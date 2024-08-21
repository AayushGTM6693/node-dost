/* eslint-disable no-undef */
const fs = require("fs");
const Tour = require("../models/tour.model");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const db = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose.connect(db).then(() => {
  console.log("DB connection success");
});

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync("sample.json", "utf-8"));
// import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully loaded");
  } catch (error) {
    console.log(error);
  }
};

// delete all  data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
