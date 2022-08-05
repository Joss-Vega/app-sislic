const passport = require("passport");
const pool = require("../../database");
const { compare } = require("bcryptjs");

const { BasicStrategy } = require("passport-http");
passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "select u.id_usuario, u.usuario,u.clave,r.nombre from usuario u  join rol r on (u.id_rol=r.id_rol)   where u.usuario = $1",
        [username]
      );
      const [user] = rows;
      if (!user) {
        console.log("no existe");
        return done(null, false);
      }
      if (!(await compare(password, user.clave))) {
        console.log("contraseña incorrecta");

        return done(null, false);
      }
      const { clave, id_usuario, usuario, nombre } = user;
      return done(null, {
        id: id_usuario,
        username: usuario,
        role: nombre,
      });
    } catch (error) {
      done(error);
    }
  })
);
