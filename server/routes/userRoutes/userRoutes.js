const { Router } = require("express");
const { test, updateUser } = require("../../controllers/user.controller");
const { verifyToken } = require("../../utils/verifyUser");

const userRouter = Router();

userRouter.get("/", test);
userRouter.post("/update/:id", verifyToken, updateUser);

module.exports = userRouter; // Export the router directly, not an object
