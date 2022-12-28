const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=4000;


const mongoose=require('mongoose');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assests/scss',
    dest: './assests/css',
    debug:true,
    outputStyle:'extended',
    prefix: '/css'

}))
app.use(express.static('./assests'));
app.use(expressLayouts);



app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router


app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:'false',
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development',
        
    },
    function(err){
        console.log(err)|| 'connect-mongodb setup ok';
    }
    )
}));




app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`);
    
    }
    console.log(`server is running on port:${port}`);
    
});