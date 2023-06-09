class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }
    
    toggleLike() {
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type : 'post',
                url : $(self).attr('href')
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                likesCount -= (data.data.deleted ? 1 : -1);
                $(self).attr('data-likes', likesCount);
                $(self).children('.likes-count-container').html(likesCount);
            })
            .fail(function(err){
                console.log('Error in like toggler : '. err);
            });

        });
    }
}

$('.toggle-like-button').each(function(){
    let self = this;
    let toggleLike = new ToggleLike(self);
});
