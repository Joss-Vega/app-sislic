const pool = require("../database");
const jwt = require("jsonwebtoken");
const { hash } = require("bcryptjs");
const { tokenSecret, refreshSecret } = require("../config");

const authController = {};

authController.login = async (req, res) => {
  const user = req.user;
  const access_token = jwt.sign({ user }, tokenSecret, {
    expiresIn: "30m",
  });
  const refresh_token = jwt.sign({ user }, refreshSecret, {
    expiresIn: "1d",
  });

  const tokens = { access_token, refresh_token };
  const hashedRefreshToken = await hash(refresh_token, 10);
  const result = await pool.query(
    "update usuario set hash = $1 where id_usuario = $2",
    [hashedRefreshToken, user.id]
  );
  res.cookie("jwt", tokens, { httpOnly: true });
  res.json(tokens);
};



module.exports = authController;
