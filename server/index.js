const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO } = process.env;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
