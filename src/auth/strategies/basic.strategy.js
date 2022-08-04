const passport = require("passport");
const { BasicStrategy } = require("passport-http");
passport.use(
  new BasicStrategy(async (username, password, done) => {
    const { rows } = await pool.query(
      "select u.usuario,u.clave,r.nombre from usuario u  join rol r on (u.id_rol=r.id_rol)   where u.usuario = $1",
      [username]
    );
    console.log(rows)
  })
);
