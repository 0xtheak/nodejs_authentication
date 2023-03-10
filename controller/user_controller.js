const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('profile', {
        title : 'Profile'
    })
}

// rendering Sign Up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title : 'Sign Up | Nodejs Authentication'
    });
}

// rendering Sign In page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title : 'Sign In | Nodejs Authentication'
    });
}

// user sign up
module.exports.create = async function(req, res){
    try{
        // console.log(req.body);
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({email : req.body.email});
        // console.log(user);
        if(!user){
            // creating user account
            let newUser = await User.create(req.body);
            console.log(newUser);
            return res.redirect('/users/signIn');
        }
        return res.redirect('back');

    }catch(err){
        if(err){
            console.log(err);  
        }
        return res.redirect('back');

    }
}

module.exports.createSession = async function(req, res){

    try{
        if(req.body.email == undefined){
            return res.status(401).json({
                message : "Login parameter missing"
            });
        }

        let user = User.findOne({email : req.body.email});
        if(user){
            if(user.password!=req.body.password){
                return res.status(401).json({
                    message : "Invalid Email/Password"
                });
            }else {
                return res.redirect('/users/profile');
            }
        }
    }catch(err){
        if(err){
            console.log(err);
        }
        return res.status(401).json({
            message : "Internal server error"
        });
    }
}