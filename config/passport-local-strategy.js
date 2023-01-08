
const passport=require('passport');
const User = require('../models/user');


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
passReqToCallback:true
},

function(req,email,password,done){
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
return done(err);
        }
        if(!user||user.password!=password){
            req.flash('error','Invalid username/password');
            return done(null,false);

        }
        return done(null,user);
    })
}
));

//serializing the user to decide which key is to kept in the cookies


passport.serializeUser(function(user,done){
done(null,user.id);
});

//deserializing the user from the key in the cookies 

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in deserializing user');
            return done(err);
        }
        return done(null,user); 
    })

})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    return res.redirect('/users/sign-in');
    
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user current signed user from session cookie and sending this to locals for views

        res.locals.user=req.user;

    }
    next();
}

module.exports=passport;
