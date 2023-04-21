const User = require('../models/user');

module.exports.profile = async function(req, res){
    // print the request url
    console.log(req.url);

    try{
        // fetch the user
        let user = await User.findById(req.params.id);

        // render profile page
        return res.render('users/profile', {
            title: 'User Profile',
            profile_user: user
        });

    } catch(err){
        console.log(`Error in displaying user profile page : ${err}`);
        return res.redirect('/');
    }    
}

module.exports.update = async function(req, res){
    // print the request url
    console.log(req.url);

    try{
        // check if an unauthorized user is trying to update the profile
        if(req.user.id != req.params.id){
            req.flash('error', 'You are not authorized to update this user profile');
            return res.status(401).send('You are not authorized to update this user profile');
        }
        
        // update the user in the database
        await User.findByIdAndUpdate(req.params.id, req.body);

        // redirect user to last page
        return res.redirect('back');
    }
    catch(err){
        console.log(`Error in updating user profile : ${err}`);
        req.flash('error', 'The profile could not be uploaded');
        return res.redirect('back');
    }
}

module.exports.signUp = function(req, res){

    // print request url
    console.log(req.url);

    // check if the user is already authenticated or not
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    // render the sign up page
    return res.render('users/sign_up', {
        title : 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res){

    // print the request url
    console.log(req.url);

    // check if the user is already signed in
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    // render the sign in page
    return res.render('users/sign_in', {
        title : 'Codeial | Sign In'
    });
}

module.exports.create = async function(req, res){

    // printing the url
    console.log(req.url);
    
    try{
        // checking if the sign up details are valid or not
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Password is mismatching');
            return res.redirect('back');
        }

        // check if there is already a user with same username
        let user_with_same_username = await User.findOne({username : req.body.username});
        
        // if the username is already taken then send user back to sign up page
        if(user_with_same_username){
            req.flash('error', 'Username already taken');
            return res.redirect('/users/sign-up');
        }

        // check if there is already a user with same email
        let user_with_same_email = await User.findOne({email : req.body.email});

        // if the email is already present then redirect user to sign up page
        if(user_with_same_email){
            req.flash('error', 'There exists an account with same email');
            return res.redirect('/users/sign-up');
        }

        // create new user
        let new_user = await User.create(req.body);

        // print the new user profile
        console.log(`A new user profile has been created : ${new_user}`);
        req.flash('success', 'Profile has been created');

        // redirect the user to sign in page
        return res.redirect('/users/sign-in');


    } catch(err){
        console.log(`Error in creating a new user profile : ${err}`);
        req.flash('error', 'Profile could not be created, please try again');
        return res.redirect('/');
    }

}

module.exports.createSession = function(req, res){

    // print request url
    console.log(req.url);

    // print that session has been created
    console.log('A new session has been created');
    req.flash('success', 'Logged In Successfully');

    // redirect to home page
    return res.redirect('/');
}

module.exports.destroySession = async function(req, res){

    // print request url
    console.log(req.url);

    try{
        // logout user (it will destroy the session)
        await req.logout((err) => {

            // print that session has ended
            console.log('session has ended');
            req.flash('success', 'You have logged out successfully!');
        
            // redirecting user to home page
            res.redirect('/');
        });


    }
    catch(err){
        console.log(`Error in logging out the user : ${err}`);
        req.flash('error', 'Could not sign out, please try again');
        return res.redirect('back');
    }


}
