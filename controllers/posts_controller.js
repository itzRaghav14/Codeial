const Post = require('../models/post');

module.exports.create = function(req, res){
    console.log(req.url);
    console.log(req.cookies.codeial);
    console.log(req.cookies.Codeial);
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, user){
        if(err){console.log(`Error in creating post : ${err}`); return res.redirect('back');}
        console.log(`Post has been added : ${user}`);
        return res.redirect('/users/profile');
    });
}