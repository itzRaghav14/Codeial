// importing model
const User = require('../models/user');

// user homepage
module.exports.profile = function(req, res){
    console.log(req.url);
    console.log(req.cookies);

    if(!req.cookies.user_id){
        return res.redirect('sign-in');
    }

    // finding the user
    User.findById(req.cookies.user_id, function(err, user){
        // checking if there is some error or not
        if(err){console.log(`Error in finding the user for profile page: ${err}`); return res.redirect('back');}

        // user found
        if(user){
            return res.render('users/profile', {
                'title': 'User Profile',
                'user' : user
            });
        } else{
            return res.redirect('sign-up');
        }
    })

    // return res.render('users/profile', {
    //     title : 'Codeial | Users'
    // });
}

// sign-up page
module.exports.signUp = function(req, res){
    console.log(req.url);
    return res.render('users/sign_up', {
        title : 'Codeial | Sign Up'
    });
}

// sign-in page
module.exports.signIn = function(req, res){
    console.log(req.url);
    return res.render('users/sign_in', {
        title : 'Codeial | Sign In'
    });
}

// creating a new user profile
module.exports.create = function(req, res){

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

// creating a new session for user
module.exports.createSession = function(req, res){
    
    // print url
    console.log(req.url);

    // find the user handle
    User.findOne({username: req.body.username}, function(err, user){

        // error
        if(err){console.log(`Error in finding the user for sign-in : ${err}`); return;}

        // user handle found
        if(user){
            
            // if the password doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id', String(user._id));
            return res.redirect('profile');

        }
        // user handle not found
        else{
            return res.redirect('back');
        }

    });

}

module.exports.endSession = function(req, res){

    console.log(req.url);
    console.log(req.cookies);

    // remove the user id from cookies
    req.cookies.user_id = '';
    res.cookie('user_id', '');

    // redirect to sign-in page
    return res.redirect('sign-in');

}
