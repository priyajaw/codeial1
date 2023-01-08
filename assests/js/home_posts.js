
//method to submit form data for new post using ajax
{
 let createPost=function(){
    let newPostForm=$('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();
       


        $.ajax({
            type:'post',
            url:'/posts/create',
            data: newPostForm.serialize(),
            success:function(data){
console.log(data);
let newPost=newPostDom(data.data.post);
console.log(newPost);
$('#posts-list-container>ul').prepend(newPost);
deletePost($(' .delete-post-button',newPost));


new Noty({
  theme:'relax',
  text:'Post published;',
  type:'success',
  layout:'topRight',
  timeout:1500
}).show();




            },error:function(error){
                console.log(error.responseText);
            }
        })
    })

 

 }  
   //method to create a post in DOM


   let newPostDom=function(post){
    return $(`<li id="post-${post._id}">
    <p id="border-post">
    
    
        <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
    
    
        ${post.content}
    
    
        <br >
        <small> ${post.user.name} </small>
      </p>
    
      <div class="post-comments">
       
    
        <form action="/comments/create" id="new-comment-form" method="POST">
          <input type="text" name="content" placeholder="Type here" />
          <input type="text" name="post" value="${post._id}" />
          <input type="submit" value=" add comment" />
        </form>
        
        <div class="post-comments-list">
          <ul id="post-comments-${post._id}">
      
          </ul>
        </div>
      </div>
    
    
</li>`)
   }

///method to delete post

   let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
    


        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
$(`#post-${data.data.post_id}`).remove();





new Noty({
  theme:'relax',
  text:'Post deleted successfully',
  type:'success',
  layout:'topRight',
  timeout:1500
}).show();


            },error:function(error){
                console.log(error.responseText);

            }
        })
    })
   }
 createPost();
}


 



