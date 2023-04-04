// import express and setup app
const express = require('express');
const app = express();

// declare port number
const port = 8000;

// connecting to database
const db = require('./config/mongoose');

// middlewares
const bodyParser = require('body-parser');
const cookieParserr = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParserr());
app.use(express.static('assets'));


// using express ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extracting styles and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// route handling
app.use('/', require('./routes/index'));

// setup view engine
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
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