require('dotenv').config()

import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env

passport.use('google', new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
    callbackURL: "http://localhost:3000/api/auth/callback/google",
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile)
  }
));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.facebookClientId,
  clientSecret: process.env.facebookClientSecret,
    callbackURL: "http://localhost:3000/api/auth/callback/facebook",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile)
  }
));

export default passport
