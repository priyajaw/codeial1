const User=require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>user profile</h1>')

    return res.render('users',{
        title:"users"
    })
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codeial| sign up"
    })
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"codeial| sign in"
    })
} 
//get the sign up data
module.exports.create=function(req,res){
if(req.body.password!=req.body.confirm_password){
  return res.redirect('back');  


}

User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error finding siging up');
        return ;
    }
    if(!user){
        User.create(req.body,function(err,user){
           if(err){
            console.log('error in creating user while signup');
            return;
            
           } 
           return res.redirect('/users/sign-in');
        })
    }
    else{
        return res.redirect('back');
    }
});
}
module.exports.createSession=function(req,res){
return res.redirect('/');
}

module.exports.destroySession=function(req,res,next){

    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
    
}
