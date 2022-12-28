const Post=require('../models/post');


module.exports.home=function(req,res){
    // return res.end('<h1>express running</h1>')
// console.log(req.cookies);
// res.cookie('user_id',45);



// Post.find({},function(err,posts){
//     return res.render('home',{
//         title:"Home",
//         posts:posts
//     })
// });
Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
        title:"Home",
        posts:posts
    })  

})
   
}

