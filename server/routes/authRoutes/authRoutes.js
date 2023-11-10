const { Router } = require("express");
const { signUp } = require("../../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-up", signUp);

module.exports = authRouter;
