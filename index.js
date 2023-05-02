// import express and setup app
const express = require('express');
const app = express();

// declare port number
const port = 8000;

// connecting to database
const db = require('./config/mongoose');

// importing passport and express-session 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

// importing flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// mongo store
const MongoStore = require('connect-mongo')(session);

// middlewares
const bodyParser = require('body-parser');
const cookieParserr = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParserr());
app.use(express.static('assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// using express ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extracting styles and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
const path = require('path');
const cookieParser = require('cookie-parser');
const exp = require('constants');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// (it should come after views only)
app.use(session({
    name: 'Codeial',
    // change secret before deploying it in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// route handling
app.use('/', require('./routes/index'));

// app listening
app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`The server is up and running on the port : ${port}`);
})
