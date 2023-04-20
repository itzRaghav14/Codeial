const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){

    console.log(req.url);

    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log(`Error in finding the post for adding comment : ${err}`);
            return res.redirect('back');
        }
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err, comment){
                if(err){
                    console.log(`Error in creating post`);
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();

                res.redirect('/');

            });
        }
    });
}

module.exports.destroy = function(req, res){
    console.log(req.url);
    console.log(req.user);
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log(`Unable to fetch comment to destory : ${err}`);
            return res.redirect('back');
        }
        console.log(comment.user);
        console.log(req.user.id);
        if(comment.user == req.user.id){
            
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, {
                $pull : {
                    comments : req.params.id
                }
            }, function(err, post){
                return res.redirect('back');
            });
        } else{
            return res.redirect('back');
        }
    });
}
