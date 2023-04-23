// this is a global function so that it can be called in the 'home_posts.js' file
function setUpCommentSection(post){

    createComment();
    deleteCommentAll();

    function createComment(){
        let addCommentForm = $(' .add-comment-form', post);
        addCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : addCommentForm.serialize(),
                success : function(data){
                    let newComment = newCommentDOM(data.data.comment);
                    $(' ul', post).prepend(newComment);
                    deleteComment($(' .comment-delete-button', newComment));
                },
                error : function(err){
                    console.log(`Error in adding comment : ${err.responseText}`);
                }
            });
        });

        function newCommentDOM(comment){
            return $(`
                <li id="comment-${comment._id}" class="comment-container">
                    <span> ${comment.user.name} </span> - 
                    <span> ${comment.content} </span>
                    - <a class="comment-delete-button" href="/comments/destroy/${comment._id}"> delete </a>
                </li>
            `);
        }
    }

    function deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#comment-${data.data.commentId}`).remove();
                },
                error : function(err){
                    console.log(`Error in deleting the comment : ${err.responseText}`);
                }
            });
        });
    }

    function deleteCommentAll(){
        const postCommentsList = $('.post-comments-list', post);
        const allComments = $(' .comment-container', postCommentsList);
        for(let comment of allComments){
            let deleteLink = $(' .comment-delete-button', comment);
            deleteComment(deleteLink);
        }
    }
}
