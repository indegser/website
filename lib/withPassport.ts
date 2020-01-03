require('dotenv').config()

import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env

// passport.use('google', new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/api/auth/callback/google",
//   },
//   function(token, tokenSecret, profile, done) {
//     return done(null, profile)
//   }
// ));

export default passport
