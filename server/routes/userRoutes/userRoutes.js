const { Router } = require("express");
const { test } = require("../../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", test);

module.exports = userRouter; // Export the router directly, not an object
