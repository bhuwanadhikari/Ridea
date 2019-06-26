const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
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





const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: '/auth/google/redirect'
   }, (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db

      console.log("token",accessToken);
      User.findOne({ googleId: profile.id })
         .then((currentUser) => {
            if (currentUser) {
               console.log("old user");

               done(null, currentUser);
            } else {
               // if not, create user in our db
               new User({
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value

               }).save().then((newUser) => {
                  console.log('created new user');
                  done(null, newUser);
               });
            }
         })
         .catch(err => console.log("some wring happende", err));
   })
);
