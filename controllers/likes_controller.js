const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res) {
    console.log('/likes' + req.url);

    try{

        let likeable;
        let deleted = false;

        // find the likeable object and populate its likes
        if(req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if the like already exists or not
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        } else {
            let new_like = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });
            likeable.likes.push(new_like);
            likeable.save();
        }

        return res.status(200).json({
            message : "Toggled successfully",
            data : {
                deleted : deleted
            }
        });

    }
    catch(err){
        console.log(`Error in toggling like (likes_controller) : ${err}`);
        return res.status(500).json({
            message : 'Internal server error in toggling like'
        });
    }
}
