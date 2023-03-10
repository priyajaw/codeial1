const Post=require('../models/post');

const Comment=require('../models/comment');
module.exports.create= async function(req,res){
 try{
    let post=await  Post.create({
        content:req.body.content,
        user:req.user._id
    });

    if(req.xhr){
        post=await post.populate('user','name');
        return res.status(200).json({
            data:{
                post:post
            },
            message:"post created"
        })
        
    }
    req.flash('success','Post published');
        return res.redirect('back');

 }
 catch(err){
    req.flash('error',err);
    console.log(err);
    return res.redirect('back');  
 }
}

module.exports.destroy= async function(req,res){


    try{
        let post=await Post.findById(req.params.id)
        if(post.user==req.user.id){
            post.remove();
    
             await Comment.deleteMany({post:req.params.id});

             if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
             },
             mesaage:"post deleted"
             
                })
                
             }
             req.flash('success','Post and associated comment deleted');

             return res.redirect('back');
        }
        
          
        else{
            req.flash('error','User is not the post owner');
            return res.redirect('back');

        }
    }
    catch(err){
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }
 

}