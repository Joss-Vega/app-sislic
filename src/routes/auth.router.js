const { Router } = require("express");
const authRouter = Router();

const { login } = require("../controllers/auth.controller");

authRouter.post("/login", login);

module.exports = authRouter;
