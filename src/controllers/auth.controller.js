const pool = require("../database");

const jwt = require("jsonwebtoken");
const helpers = require("../libs/helpers");
const bcrypt = require("bcryptjs");
const secret = "oido-amigo-HMDA-access-token";
const refreshTokenSecret = "oido-amigo-HMDA-refresh-access-token";

const authCtr = {};

authCtr.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { rows } = await pool.query(
      "select u.usuario,u.clave,r.nombre from usuario u  join rol r on (u.id_rol=r.id_rol)   where u.usuario = $1",
      [username]
    );

    if (rows.length != 0) {
      const { id_usuario, nombre, clave } = rows[0];
      if (await bcrypt.compare(password, clave)) {
        const usuario = {
          idusuario: id_usuario,
          username,
          rol: nombre,
        };

        const accessToken = jwt.sign({ usuario }, secret, {
          expiresIn: "900s",
        });
        const refreshToken = jwt.sign({ usuario }, refreshTokenSecret);
        const tokens = { accessToken, refreshToken };
        res.cookie("jwt", tokens);

        return res.status(200).json(tokens);
      }
    }
    next(new Error("Credenciales de acceso incorrectas"));
  } catch (e) {
    next(e);
  }
};

module.exports = authCtr;
