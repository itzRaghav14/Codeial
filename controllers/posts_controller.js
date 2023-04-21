const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    // print the request url
    console.log(req.url);

    try{
        // create a post
        let new_post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        
        // print the created post
        console.log(`Post has been created : ${new_post}`);
        req.flash('success', 'Post published');

        // redirect back to the home page
        return res.redirect('/');

    } catch(err){
        console.log(`Error in creating a new post : ${err}`);
        req.flash('error', 'The post could not be published');
        return res.redirect('/');
    }
}

module.exports.destroy = async function(req, res){
    // printing the request url
    console.log(req.url);

    try{
        // find the post to be deleted
        let post_to_be_deleted = await Post.findById(req.params.id);

        // if the author is trying to delete the post
        if(post_to_be_deleted.user == req.user.id){
            // delete the post
            post_to_be_deleted.remove();
    
            // delete the comments
            await Comment.deleteMany({post : req.params.id});

            // print that the post has been deleted
            console.log(`Post has been deleted`);
            req.flash('success', 'Post has been deleted');
            
        } else{
            req.flash('You are not authorized to delete this post');
        }

        // redirect back to the last page
        return res.redirect('back');

    } catch(err){
        console.log(`Error in deleting a post : ${err}`);
        req.flash('error', 'The post could not be deleted');
        return res.redirect('back');
    }
}
