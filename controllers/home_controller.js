const Post = require('../models/post');
const User = require('../models/user');

// home page
module.exports.home = function(req, res){
    console.log(req.url);

    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log(`Error in finding posts to display on home page : ${err}`);
            return res.render('home', {
                title : 'Codeial | Home'
            });
        }
        User.find({}, function(err, users){
            if(err){
                console.log(`Error in fetching users to display on home page`);
                return res.render('home', {
                    title : 'Codeial | Home',
                    posts : posts
                });
            }
            return res.render('home', {
                title : 'Codeial | Home',
                posts : posts,
                all_users : users
            });
        });
    });

}
