const User = require('../models/user');

module.exports.profile = function(req, res){

    console.log(req.url);

    return res.render('users/profile', {
        title : 'Codeial | Users'
    });
}

module.exports.signUp = function(req, res){

    console.log(req.url);

    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    return res.render('users/sign_up', {
        title : 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res){

    console.log(req.url);

    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    return res.render('users/sign_in', {
        title : 'Codeial | Sign In'
    });
}

module.exports.create = function(req, res){

    console.log(req.url);

    // printing the url
    console.log(req.url);
    
    // checking if the sign up details are valid or not
    if(req.body.password != req.body.confirm_password){
        res.redirect('back');
    }

    // finding the user
    User.findOne({username: req.body.username}, function(err, user){
        // print if error is found then print it
        if(err){console.log(`Error in finding user in signing up: ${err}`); return res.redirect('back');}

        // if user is not found then create and redirect to sign in page
        if(!user){
            User.create(req.body, function(err, user){
                // if error is found then print it
                if(err){console.log(`Error in signing up the user: ${err}`); return;}

                // redirect to the sign in page
                res.redirect('sign-in');
            });
        }
        // if the user is found then go to sign in page
        else{
            res.redirect('back');
        }

    });

}

module.exports.createSession = function(req, res){

    console.log(req.url);

    return res.redirect('profile');
}

module.exports.destroySession = function(req, res){

    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

}
