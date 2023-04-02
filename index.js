// import express and setup app
const express = require('express');
const app = express();

// declare port number
const port = 8000;

// database
// const db = require('');

// middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

// route handling
app.use('/', require('./routes/index'));

// setup view engine
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app listening
app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`The server is up and running on the port : ${port}`);
})
