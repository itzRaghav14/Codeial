const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    // printing the request url
    console.log(req.url);

    try{
        // find the post
        let post = await Post.findById(req.body.post);

        // if post is found
        if(post){
            // create a new comment
            let new_comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });

            // print the new comment
            console.log(`New comment has been added : ${new_comment}`);

            // push the comment into post and save
            post.comments.push(new_comment);
            post.save();
        }

        // redirect to home page
        return res.redirect('/');

    } catch(err){
        console.log(`Error in creating a new comment : ${err}`);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){

    // print the request url
    console.log(req.url);

    try{

        // find the comment to be deleted
        let comment_to_be_deleted = await Comment.findById(req.params.id);

        // if comment is not found then return back
        if(!comment_to_be_deleted){
            return res.redirect('back');
        }

        // find the post from where comment has to be deleted
        let post = await Post.findById(comment_to_be_deleted.post);

        // if the author of post or comment wants to delete the post
        if(req.user.id == comment_to_be_deleted.user || req.user.id == post.user){
    
            // remove the comment
            comment_to_be_deleted.remove();
    
            // update the post comments
            await Post.findByIdAndUpdate(post.id, {$pull : {comments : req.params.id}});
        }

        // redirect back to the last page
        return res.redirect('back');

    }
    catch(err){
        console.log(`Error in deleting the comment : ${err}`);
        return res.redirect('back');
    }
    

    // Comment.findById(req.params.id, function(err, comment){
    //     if(err){
    //         console.log(`Unable to fetch comment to destory : ${err}`);
    //         return res.redirect('back');
    //     }
    //     console.log(comment.user);
    //     console.log(req.user.id);
    //     if(comment.user == req.user.id){
            
    //         let postId = comment.post;

    //         comment.remove();

    //         Post.findByIdAndUpdate(postId, {
    //             $pull : {
    //                 comments : req.params.id
    //             }
    //         }, function(err, post){
    //             return res.redirect('back');
    //         });
    //     } else{
    //         return res.redirect('back');
    //     }
    // });
}
