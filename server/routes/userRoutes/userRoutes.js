const { Router } = require("express");
const {
  test,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");
const { verifyToken } = require("../../utils/verifyUser");

const userRouter = Router();

userRouter.get("/", test);
userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

module.exports = userRouter; // Export the router directly, not an object
