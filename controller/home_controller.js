const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){
    // return res.end('<h1>express running</h1>')
// console.log(req.cookies);
// res.cookie('user_id',45);



// Post.find({},function(err,posts){
//     return res.render('home',{
//         title:"Home",
//         posts:posts
//     })
// });


try{
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    
      let users= await User.find({});
            // console.log(posts);
            return res.render('home',{
                title:"Home",
                posts:posts,
                all_users:users
            });  
        }
         

catch(err){
console.log('error',err);
}
}