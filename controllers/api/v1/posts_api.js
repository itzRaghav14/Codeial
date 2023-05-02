const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post
        .find({})
        .sort('-createdAt')
        .populate({
            path : 'user',
            select : {
                name : 1,
                username : 1,
                email : 1
            }
        })
        .populate({
            path : 'comments',
            options : {
                sort : {
                    'createdAt' : -1
                }
            },
            populate : {
                path : 'user',
                select : {
                    name : 1,
                    username : 1, 
                    email : 1
                }
            }
        });

    return res.status(200).json({
        message : "List of posts",
        posts : posts
    });
};

module.exports.destroy = async function(req, res){

    console.log('reached here');

    try{
        // find the post to be deleted
        let post_to_be_deleted = await Post.findById(req.params.id);

        if(!post_to_be_deleted){
            return res.status(404).json({
                message : 'Post not found'
            });
        }

        if(post_to_be_deleted.user != req.user.id){
            console.log('Post : ', post_to_be_deleted);
            console.log('User : ', req.user);
            return res.status(401).json({
                message : 'You cannot delete this post'
            });
        }

        // delete the post
        post_to_be_deleted.remove();

        // delete the comments
        await Comment.deleteMany({post : req.params.id});


        return res.status(200).json({
            message : 'Post and comments deleted successfully'
        });

    } catch(err){
        console.log('Error in destoying a post', err);
        return res.status(500).json({
            message : 'Internal Server Error',
            error : err
        });
    }
}
