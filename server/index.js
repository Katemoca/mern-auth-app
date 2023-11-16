const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO, PORT } = process.env;
const userRouter = require("./routes/userRoutes/userRoutes");
const authRouter = require("./routes/authRoutes/authRoutes");

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json()).listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);

// CUSTOMIZED MIDDLEWARE TO HANDLE ERRORS
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
