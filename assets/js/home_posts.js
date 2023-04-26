function home_posts(){
    
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
                    setUpCommentSection(newPost);

                    new Noty({
                        theme : 'relax',
                        text : 'Post published successfully!',
                        type : 'success',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                },
                error: function (err) {
                    console.log(err.responseText);
                    new Noty({
                        theme : 'relax',
                        text : 'Failed to published post',
                        type : 'error',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                }
            });
            $(' input[type="text"]', createPost).val('');
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        console.log(post);
        return $(`
            <!-- Post -->
            <li id="post-${post._id}" class="post-container p-2 bg-[var(--complementary)] rounded-xl">
            
                <!-- Post delete button --> 
                <a href="/posts/destroy/${post._id}" class="post-delete-button text-white text-lg float-right mr-2"><i class="fa-solid fa-xmark"></i></a>
            
                <!-- Post heading -->
                <h4 id="post-heading-${post._id}" class="text-lg text-white font-medium"> ${post.user.name} </h4>
            
                <!-- Post Information -->
                <div id="post-info-${post._id}" class="text-xs text-white">
                    <span> Just Now </span>
                </div>
            
                <!-- Post Content (will be designed later) -->
                <div id="post-content-${post._id}" class="text-white text-lg my-2">
                    ${post.content}
                </div>
            
                <!-- Comment Section -->
                <div id="post-comment-section-${post._id}">
                    <h4 class="text-white text-lg">Comments</h4>
                    <!-- New comemnt form -->
                    <div class="py-2 px-3 bg-[var(--complementary)] rounded-3xl">
                        <form id="post-comment-form-${post._id}" action="/comments/create" method="post" class="new-comment-form grid grid-cols-12">
                            <input type="text" name="content" placeholder="Write a comment..." class="bg-[var(--complementary)] focus:outline-0 col-span-9 text-white" required>
                            <input type="hidden" name="post" value="${post._id}" required>
                            <div class="col-span-3 flex items-center justify-center">
                                <button type="submit" id="comment-add-button-${post._id}" class="bg-[var(--accent)] text-white py-1 px-2 rounded-3xl w-full"> Comment </button>
                            </div>
                        </form>
                    </div>
            
                    <!-- Other comments -->
                    <ul id="post-comments-${post._id}" class="post-comments-list space-y-2">
                        
                    </ul>
                </div>
            </li>
        `);
    }

    
    // method to delete a post from the DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme : 'relax',
                        text : 'Post deleted successfully!',
                        type : 'success',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                },
                error : function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme : 'relax',
                        text : 'Failed to delete post',
                        type : 'error',
                        layout : 'topRight',
                        timeout : 1500
                    }).show();
                }
            });
        });
    };

    function deletePostAll(){
        const postsListContainer = $('#posts-list-container');
        const allPosts = $(' .post-container', postsListContainer);
        for(let post of allPosts){
            let deleteLink = $(' .post-delete-button', post);
            deletePost(deleteLink);
            setUpCommentSection(post);
        }
    }
    
    createPost();
    deletePostAll();

};

home_posts();
