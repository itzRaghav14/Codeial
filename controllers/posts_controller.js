const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    // print the request url
    console.log('/posts' + req.url);

    try{
        // create a post
        let new_post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        // populating the user
        await new_post.populate({
            path: 'user',
            select : {
                name : 1,
                username : 1
            }
        });
        
        // print the created post
        console.log(`Post has been created : ${new_post}`);
        // req.flash('success', 'Post published');

        // check if the request was through AJAX
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : new_post
                },
                message : "Post Created!"
            });
        }

        // redirect back to the home page
        return res.redirect('/');

    } catch(err){
        console.log(`Error in creating a new post : ${err}`);
        // req.flash('error', 'The post could not be published');
        return res.redirect('/');
    }
}

module.exports.destroy = async function(req, res){
    // printing the request url
    console.log('/posts' + req.url);

    try{
        // find the post to be deleted
        let post_to_be_deleted = await Post.findById(req.params.id);

        // if the author is trying to delete the post
        if(post_to_be_deleted.user == req.user.id){
            
            // delete all likes on that post and on the comments
            await Like.deleteMany({likeable : post_to_be_deleted._id, onModel : 'Post'});
            await Like.deleteMany({_id : {$in : post_to_be_deleted.comments}});

            // delete the comments
            await Comment.deleteMany({post : post_to_be_deleted._id});
            
            // delete the post
            post_to_be_deleted.remove();

            // print that the post has been deleted
            console.log(`Post has been deleted`);
            // req.flash('success', 'Post has been deleted');

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : 'Post deleted'
                });
            }
            
        } else{
            req.flash('You are not authorized to delete this post');
        }

        // redirect back to the last page
        return res.redirect('back');

    } catch(err){
        console.log(`Error in deleting a post : ${err}`);
        // req.flash('error', 'The post could not be deleted');
        return res.redirect('back');
    }
}
