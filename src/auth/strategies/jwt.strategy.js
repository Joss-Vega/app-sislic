const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { tokenSecret } = require("../../config");
passport.use(
  new Strategy(
    {
      ignoreExpiration: false,
      secretOrKey: tokenSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const tokens = req.cookies.jwt
          if(!tokens){
            return null
          }
          return tokens.access_token ? tokens.access_token : null
        },
      ]),
    },
    (payload, done) => {
      done(null, payload.user);
    }
  )
);
