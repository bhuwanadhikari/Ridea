const JwtStrategy = require('passport-jwt').Strategy;
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

