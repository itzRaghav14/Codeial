const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
};

passport.use(new JWTStrategy(opts, function(jwt_payload, done){
    User.findById(jwt_payload._id, function(err, user){
        if(err){
            console.log(`Error in finding the user (through jwt) : ${err}`);
            return done(err, false);
        }
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

module.exports = passport;
