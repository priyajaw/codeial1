const express=require('express');
const app=express();
const port=4000;

const expreessLayouts=require('express-ejs-layouts');
app.use(express.static('./assests'));
app.use(expreessLayouts);
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