const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const secret = "oido-amigo-HMDA-access-token";
const refreshTokenSecret = "oido-amigo-HMDA-refresh-access-token";

const hasRole = (roles) => (req, res, next) => {
  const unauthorized = {
    success: false,
    message: "Unauthorized",
  };
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json(unauthorized);
  }
  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    console.log(decoded)
    err
      ? res.status(401).json(unauthorized)
      : roles.includes(decoded.usuario.rol)
      ? next()
      : res.status(401).json(unauthorized);
  });
};


module.exports = {
  hasRole,
};
