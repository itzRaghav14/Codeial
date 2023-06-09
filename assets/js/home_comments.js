// this is a global function so that it can be called in the 'home_posts.js' file
function setUpCommentSection(post){
    createComment();
    deleteCommentAll();
    
    function createComment(){
        let addCommentForm = $(' .new-comment-form', post);
        addCommentForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : addCommentForm.serialize(),
                success : function(data){
                    let newComment = newCommentDOM(data.data.comment);
                    $(' ul', post).prepend(newComment);
                    console.log('Comment added');
                    deleteComment($(' .comment-delete-button', newComment));

                    // noty
                    new Noty({
                        theme : 'relax',
                        text : 'Comment added successfully!',
                        type : 'success',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                },
                error : function(err){
                    console.log(`Error in adding comment : ${err.responseText}`);
                    new Noty({
                        theme : 'relax',
                        text : 'Failed to add comment',
                        type : 'error',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                }
            });
            $(' input[type="text"]', addCommentForm).val('');
        });

        function newCommentDOM(comment){
            return $(`
                <!-- Comment Container -->
                <li id="comment-${comment._id}" class="comment-container bg-[var(--complementary2)] p-2 rounded-xl text-white">

                    <!-- Delete button -->
                    <a class="comment-delete-button float-right" href="/comments/destroy/${comment._id}"> <i class="fa-solid fa-xmark"></i> </a>

                    <!-- Like button for comment -->
                    <div id="comment-like-container-${comment._id}" class="text-white float-right mr-2">
                        <a id="comment-like-button-${comment._id}" href="/likes/toggle/?id=${comment._id}&type=Comment" data-likes="0" class="toggle-like-button">
                            <span class="likes-count-container"> 0 </span>
                            <i class="fa-solid fa-heart"></i>
                        </a>
                    </div>

                    <!-- User's name and content -->
                    <div class="text-xs"> ${comment.user.name} </div>
                    <div> ${comment.content} </div>
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
                    console.log('Comment has been deleted');

                    // noty
                    new Noty({
                        theme : 'relax',
                        text : 'Comment deleted successfully!',
                        type : 'success',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                },
                error : function(err){
                    console.log(`Error in deleting the comment : ${err.responseText}`);
                    new Noty({
                        theme : 'relax',
                        text : 'Failed to delete comment',
                        type : 'error',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                }
            });
        });
    }

    function deleteCommentAll(){
        const postCommentsList = $(' .post-comments-list', post);
        const allComments = $(' .comment-container', postCommentsList);
        for(let comment of allComments){
            let deleteLink = $(' .comment-delete-button', comment);
            deleteComment(deleteLink);
        }
    }
}
