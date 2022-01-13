const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'pebbles',
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  //remove
  const user = {
    name: 'aaron',
    age: 31,
  };
  done(user, false);
});

module.exports = jwtStrategy;
