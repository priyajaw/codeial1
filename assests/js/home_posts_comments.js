// class PostComments{
//     constructor(postId){
//         this.postId=postId;
//         this.postContainer=$(`#post-${postId}`);
//         this.newCommentForm=$(`post-${postId}-comments-form`);

//     }

    
// }



{

    let createComment=function(){
        let newCommentForm=$('#post-${postId}-comments-form');


        newCommentForm.submit(function(e){
            e.preventDefault();
        })
    }
    createComment();
}