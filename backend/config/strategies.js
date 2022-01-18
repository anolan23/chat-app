const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const Users = require('../db/repo/users');

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.REACT_APP_API_URL}/auth/google/callback`,
    proxy: true,
  },
  function (accessToken, refreshToken, profile, done) {
    Users.findOrCreate({
      google_id: profile.id,
      photo: profile.photos[0].value,
      name: profile.displayName,
      email: profile.emails[0].value,
    })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => done(err, null));
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.REACT_APP_API_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
  },
  function (accessToken, refreshToken, profile, done) {
    Users.FBfindOrCreate({
      facebook_id: profile.id,
      photo: profile.photos[0].value,
      name: profile.displayName,
      email: profile.emails[0].value,
    })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => done(err, null));
  }
);

module.exports = { googleStrategy, facebookStrategy };
