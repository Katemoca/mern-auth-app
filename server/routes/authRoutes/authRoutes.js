const { Router } = require("express");
const {
  signUp,
  signIn,
  google,
  signOut,
} = require("../../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", google);
authRouter.get("/sign-out", signOut);

module.exports = authRouter;
