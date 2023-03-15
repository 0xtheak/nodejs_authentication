const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportJWT = require('./config/passport-jwt-strategy');


app.use(expressLayouts);
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// setting the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));


app.use(session({
    name : 'nodejs',
    // TODO change the secret before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1:27017/authentication_development',
            autoRemove : 'disabled'
     },
     function(err){
        if(err){
            console.log(err || 'connect-mongodb setup ok');
        }
     })
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(5000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('server has been started on port 5000');
})