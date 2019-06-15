/* const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = require('../models/User');


const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: keys.secret
};

module.exports = passport => {
   passport.use(
      new JwtStrategy(opts , (jwt_payload, done) => {
         User.findById(jwt_payload.id)
            .then(user => {
               if(user){
                  return done(null, user);
               }
               return done(null, false);
            })
            .catch(err => console.log(err));
      })
   )
};
 */




const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id).then((user) => {
      done(null, user);
   });
});

passport.use(
   new GoogleStrategy({
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect'
   }, (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db

      console.log(profile.emails[0].value);
      User.findOne({ googleId: profile.id })
         .then((currentUser) => {
            if (currentUser) {
               console.log("old user");

               // already have this user
               console.log('user is: ', currentUser);
               done(null, currentUser);
            } else {
               // if not, create user in our db
               
               console.log("not a old user");
               new User({
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value

               }).save().then((newUser) => {
                  console.log('created new user: ', newUser);
                  done(null, newUser);
               });
            }
         })
         .catch(err => console.log("some wring happende", err));
   })
);
