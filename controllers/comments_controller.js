const { comment } = require('postcss');
const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){

    // printing the request url
    console.log('/comments' + req.url);

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
            
            // push the comment into post and save
            post.comments.push(new_comment);
            post.save();

            // populating the new comment
            await new_comment.populate({
                path : 'user',
                select : {
                    name : 1,
                    username : 1,
                    email : 1
                }
            });

            // send mail to the author for the comment
            // commentsMailer.newComment(new_comment);
            let job = queue.create('emails', new_comment).save(function(err){
                if(err) {console.log('error in creating a queue (comments_controller) ', err); return;}
                console.log('job enqueued : ', job.id);
            });

            // print the new comment
            console.log(`New comment has been added : ${new_comment}`);
            // req.flash('success', 'Comment added');
            
            // if request is through ajax
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment : new_comment
                    },
                    message : 'Comment Added'
                });
            }
        }

        // redirect to home page
        return res.redirect('/');

    } catch(err){
        console.log(`Error in creating a new comment : ${err}`);
        // req.flash('error', 'Failed to add comment');
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){

    // print the request url
    console.log('/comments' + req.url);

    try{

        // find the comment to be deleted
        let comment_to_be_deleted = await Comment.findById(req.params.id);

        // if comment is not found then return back
        if(!comment_to_be_deleted){
            req.flash('error', 'Comment not found');
            return res.redirect('back');
        }

        // find the post from where comment has to be deleted
        let post = await Post.findById(comment_to_be_deleted.post);

        // if the author of post or comment wants to delete the post
        if(req.user.id == comment_to_be_deleted.user || req.user.id == post.user){

            await Like.deleteMany({likeable : comment_to_be_deleted._id, onModel : 'Comment'});

            // remove the comment
            comment_to_be_deleted.remove();
    
            // update the post comments
            await Post.findByIdAndUpdate(post.id, {$pull : {comments : req.params.id}});

            // print that comment has been deleted
            console.log('Comment has been deleted');
            // req.flash('success', 'Comment deleted');

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        commentId : req.params.id
                    },
                    message : 'Comment Deleted'
                });
            }

        } else{
            req.flash('error', 'You cannot delete this comment');
        }

        // redirect back to the last page
        return res.redirect('back');

    }
    catch(err){
        console.log(`Error in deleting the comment : ${err}`);
        // req.flash('error', 'The comment could not be deleted');
        return res.redirect('back');
    }
    
}
