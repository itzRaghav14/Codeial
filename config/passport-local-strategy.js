const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    function(username, password, done){
        User.findOne({username : username}, function(err, user){
            if(err){
                console.log(`Error in finding user : ${err}`);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Password');
                return done(null, false);
            }
            return done(null, true);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log(`Error in finding the user while deserializing : ${err}`);
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;
