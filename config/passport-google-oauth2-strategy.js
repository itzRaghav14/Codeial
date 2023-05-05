const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID : '490143196309-6baiqgdbovsv7svrr16lj2i40tbnt0tv.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback',
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err) {console.log('Error in google strategy-passport', err); return done(err);}
            console.log('user profile : ', profile);

            // if user is not found then create a new user and set it as req.user
            if(!user){
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err) {console.log(`Error in creating user google strategy-passport ${err}`); return done(err);}
                    return done(null, user);
                });
            } else {
                // if user is found then return it as req.user
                return done(null, user);
            }
        });
    }
));
