const JwtStrategy = require('passport-jwt').Strategy;

const cookie = require('cookie');

const Users = require('../db/repo/Users');

function cookieExtractor(req) {
  let token = null;
  if (req && req.headers && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie || '');
    token = cookies['auth'];
  }
  return token;
}

const jwtStrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(jwtStrategyOptions, async (payload, done) => {
      try {
        const id = payload.sub;
        const user = await Users.findOne(id);
        if (!user) return done(null, false);
        delete user['password'];
        return done(null, { ...user, isSignedIn: true });
      } catch (error) {
        done(error, false);
      }
    })
  );
};
