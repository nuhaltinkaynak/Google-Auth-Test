const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
    clientId = process.env.GOOGLE_CLIENT_ID,  // put your google client id from console.cloud.google.com
    clientSecret = process.env.GOOGLE_CLIENT_SECRET, // put your google client secret from console.cloud.google.com
    callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});