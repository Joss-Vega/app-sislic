const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");

const { login } = require("../controllers/auth.controller");

require("../auth/strategies/basic.strategy");
require("../auth/strategies/jwt.strategy");
require("../auth/strategies/refresh.strategy");

authRouter.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  login
);
authRouter.post(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
authRouter.post(
  "/refresh",
  passport.authenticate("refresh", { session: false }),
  login
);
authRouter.post("/logout", (req, res) => {
  console.log("hola");
  res.clearCookie("jwt");
  res.json({
    message: "logout",
  });
});

module.exports = authRouter;
