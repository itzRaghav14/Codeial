const Post = require('../models/post');
const User = require('../models/user');

// home page
module.exports.home = async function(req, res){
    console.log(req.url);
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });

        // posts.forEach(post => {
        //     post.comments.sort('-createdAt');
        // });
    
        let users = await User.find({});
    
        return res.render('home', {
            title : 'Codeial | Home',
            posts : posts,
            all_users : users
        });
    } catch(err){
        console.log(`Error in displaying home page : ${err}`);
        return res.redirect('/');
    }

    
}
