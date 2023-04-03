// import mongoose library
const mongoose = require('mongoose');

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

// aquiring connection
const db = mongoose.connection;

db.on('error', function(err){
    console.log(`Error in connecting to MongoDB : ${err}`);
});

db.once('open', function(){
    console.log('Connected to Database : MongoDB')
});

module.exports = db;
