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
            return res.status(401).send('You are not authorized to update this user profile');
        }
        
        // update the user in the database
        await User.findByIdAndUpdate(req.params.id, req.body);

        // redirect user to last page
        return res.redirect('back');
    }
    catch(err){
        console.log(`Error in updating user profile : ${err}`);
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
            return res.redirect('back');
        }

        // check if there is already a user with same username
        let user_with_same_username = await User.findOne({username : req.body.username});
        
        // if the username is already taken then send user back to sign up page
        if(user_with_same_username){
            return res.redirect('/users/sign-up');
        }

        // check if there is already a user with same email
        let user_with_same_email = await User.findOne({email : req.body.email});

        // if the email is already present then redirect user to sign up page
        if(user_with_same_email){
            return res.redirect('/users/sign-up');
        }

        let new_user = await User.create(req.body);

        return res.redirect('/users/sign-in');


    } catch(err){
        console.log(`Error in creating a new user profile : ${err}`);
        return res.redirect('/');
    }

}

module.exports.createSession = function(req, res){

    // print request url
    console.log(req.url);

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

            req.flash('success', 'You have Logged Out!');
        
            // redirecting user to home page
            res.redirect('/');
        });


    }
    catch(err){
        console.log(`Error in logging out the user : ${err}`);
        return res.redirect('back');
    }


}
