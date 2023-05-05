const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({ email : req.body.email });
        if(!user || user.password != req.body.password){
            return res.status(401).json({
                message : 'Invalid username or password'
            });
        }

        return res.status(200).json({
            message : 'Sign in successful',
            data : {
                token : jwt.sign(user.toJSON(), 'codial', { expiresIn : '1000000' })
            }
        });
    }
    catch(err){
        console.log(`Error in creating session : ${err}`);
        return res.status(500).json({
            message : 'Failed to sign in'
        })
    }
};
