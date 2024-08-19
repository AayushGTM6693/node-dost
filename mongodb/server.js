/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const db = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose.connect(db).then(() => {
  console.log("DB connection success");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
