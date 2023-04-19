const Post = require('../models/post');

// home page
module.exports.home = function(req, res){
    console.log(req.url);

    Post.find({}).populate('user').exec(function(err, posts){
        if(err){
            console.log(`Error in finding posts to display on home page : ${err}`);
            return res.render('home', {
                title : 'Codeial | Home'
            });
        }
        return res.render('home', {
            title : 'Codeial | Home',
            posts : posts
        });
    });

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log(`Error in finding the posts to display : ${err}`);
    //         return res.render('home', {
    //             title : 'Codeial | Home'
    //         });
    //     }
    //     res.render('home', {
    //         title : 'Home',
    //         posts : posts
    //     });
    // });

    // return res.render('home', {
    //     title : 'Home'
    // });
}
