// import mongoose
const mongoose = require('mongoose');

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
        require: true,
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
    }
}, {
    // this will keep record of the time when we create or update data in database
    timestamps: true
});

// creating model for User
const User = mongoose.model('User', userSchema);

// exporting User model
module.exports = User;