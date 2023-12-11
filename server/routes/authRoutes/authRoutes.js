const { Router } = require("express");
const { signUp, signIn, google } = require("../../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", google);

module.exports = authRouter;
