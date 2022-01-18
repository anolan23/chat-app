const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${process.env.REACT_APP_API_URL}/auth/twitter/callback`,
  },
  function (token, tokenSecret, profile, done) {
    Users.findOrCreate({
      twitter_id: profile.id,
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

module.exports = { googleStrategy, twitterStrategy };
