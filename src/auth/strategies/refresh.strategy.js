const passport = require("passport");
const pool = require("../../database");
const { compare } = require("bcryptjs");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { refreshSecret } = require("../../config");
passport.use(
  "refresh",
  new Strategy(
    {
      ignoreExpiration: false,
      secretOrKey: refreshSecret,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const tokens = req.cookies.jwt;
          if (!tokens) {
            return null;
          }
          return tokens.refresh_token ? tokens.refresh_token : null;
        },
      ]),
    },
    async (req, payload, done) => {
      const { rows } = await pool.query(
        "select hash from usuario where id_usuario = $1",
        [payload.user.id]
      );
      const [user] = rows;
      if (!user) {
        return done(null, false);
      }
      if (!(await compare(req.cookies.jwt.refresh_token, user.hash))) {
        return done(null, false);
      }
      done(null, payload.user);
    }
  )
);
