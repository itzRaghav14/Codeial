{
    console.log('script is running');

    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .post-delete-button', newPost));
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`
            <div id="post-${post._id}" class="post-container mt-3">
                <li>
                    ${post.user.name} - ${post.content}
                    - <a href="posts/destroy/${post._id}" class="post-delete-button">delete</a>
                </li>
                <div class="post-comments">
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Write a comment..." required>
                        <input type="hidden" name="post" value="${post._id}" required>
                        <button type="submit">Add comment</button>
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">

                        </ul>
                    </div>
                </div>
            </div>
        `);
    };

    
    // method to delete a post from the DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    };



    createPost();
}