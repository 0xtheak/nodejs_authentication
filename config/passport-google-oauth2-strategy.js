const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "680302062468-oplc0bkpn4rkf3f3nmfsp7rhvrl4aqrn.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:5000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log(`error in google strategy passport ${err}`);
                return;
            }
            console.log(profile);
            if(user){
                return done(null, user);

            }else{
                User.create({
                    FirstName: profile.name.givenName,
                    LastName : profile.name.familyName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, 
                function(err, user){
                    if(err){
                        console.log(`error in creating google strategy passport ${err}`);
                        return;
                    }
                    return done(null, user);
                }
                
                )
            }
        });
    }
));

module.exports = passport;