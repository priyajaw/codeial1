const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create= async function(req,res){
    console.log(req.body);
  try{
    let post= await Post.findById(req.body.post)  //
    if(post){
        let comment=await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
            //handle error


            //handle
            post.comments.push(comment);
            post.save();
            req.flash('success','comment created');
            res.redirect('/');
        
    }
  }
    catch(err){
        req.flash('error','commnet creating error');
        console.log(err);
   return;

    }
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                req.flash('success','comment destroyed');

              return res.redirect('back');
            })
        }
        else{
            req.flash('error','you can not delete this comment');
            return res.redirect('back');
        }
    })
}