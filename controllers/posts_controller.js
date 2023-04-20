const Post = require('../models/post');
const Comment = require('../models/comment');

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
        return res.redirect('/');
    });
}

module.exports.destroy = function(req, res){
    console.log(req.url);
    // find the post
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(`Error in finding post to delete comment : ${err}`);
            return res.redirect('back');
        }
        // if the auther of post is trying to delete the post
        if(post.user == req.user.id){
            // delete the post
            post.remove();
            // delete all comments associated with this post
            Comment.deleteMany({post : req.params.id}, function(err){
                return res.redirect('back');
            });
        } else{
            // if someone else is trying to delete the post then just return back
            return res.redirect('back');
        }
    });
}
