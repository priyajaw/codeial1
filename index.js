const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=4000;

const expreessLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')
app.use(express.static('./assests'));
app.use(expreessLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router
app.use('/',require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`);
    
    }
    console.log(`server is running on port:${port}`);
    
});