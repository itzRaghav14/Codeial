// import mongoose
const mongoose = require('mongoose');

// import multer and path
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

// creating user schema
const userSchema = mongoose.Schema({
    // email
    email : {
        type: String,
        required: true,
        unique: true
    },
    // username
    username: {
        type: String,
        required: false,
        unique: true
    },
    // password
    password: {
        type: String,
        required: true
    },
    // name
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    friendships : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Friendship'
        }
    ]
}, {
    // this will keep record of the time when we create or update data in database
    timestamps: true
});

// configuring multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// statics methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// creating model for User
const User = mongoose.model('User', userSchema);

// exporting User model
module.exports = User;