const User = require('../models/user');


module.exports.profile =  function(req, res){
    console.log(req.locals);
    return res.render('profile', {
                        title : 'Profile',
                    })
    
    
    // return res.end('hello');
    // try{

    //     if(req.cookies.user_id){
    //         let user = await User.findById(req.cookies.user_id)
    //         if(user){
    //             return res.render('profile', {
    //                 title : 'Profile',
    //                 user : user
    //             })
    //             }
        
    //         }else{
    //             return res.redirect('/users/signIn');
    //     }
    // }catch(err){
    //     return res.redirect('back');

    // }
   
}

// rendering Sign Up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        console.log('in the sign up')
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title : 'Sign Up | Nodejs Authentication'
    });
}

// rendering Sign In page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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

module.exports.createSession = function(req, res){

    // try{
    //     if(req.body.email == undefined){
    //         return res.status(401).json({
    //             message : "parameter missing"
    //         });
    //     }

    //     let user = await User.findOne({email : req.body.email});
    //     if(user){
            
    //         if(user.password!=req.body.password){
    //             return res.status(401).json({
    //                 message : "Invalid Email/Password"
    //             });
    //         }else {
                
    //             res.cookie('user_id', user.id);
    //             return res.redirect('/users/profile');
    //         }
    //     }else{
    //         return res.redirect('back');
    //     }
    // }catch(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     return res.status(401).json({
    //         message : "Internal server error"
    //     });
    // }
    return res.redirect('/users/profile');

}


module.exports.destroySession = function(req, res){
    req.logout((err) => {
        if(err){
            console.log('Failed to sign out');
            return next(err);
        }
        // req.flash('success', 'You Have Logged out!');
        return res.redirect('/users/signIn');
    });
}