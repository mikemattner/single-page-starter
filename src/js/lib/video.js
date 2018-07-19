export default class VideoLink {
    constructor() {
        var ytModal = `<aside class="video-modal">
                    <div class="video-modal-overlay">
                    </div>
                    <div class="video-modal__container">
                        <iframe class="video-modal__video" src="" allowscriptaccess="always" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <button title="Close" class="video-modal-close">&times;</button>
                    </div>
                </aside>`;

        $(document).on('click', '.play-video', function(event) {
            $('body').prepend(ytModal);
            var videoSrc = $(this).data('src');
            event.preventDefault();
            $('.video-modal')
                .data({ link: this })
                .addClass('video-modal--active');
            $('.video-modal__video')
                .attr('src', "https://www.youtube.com/embed/" + videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" )
                .focus();
        }).on('click', '.video-modal', function() {
            $(this).removeClass('video-modal--active').data('link').focus();
        }).on('transitionend', '.video-modal:not(.video-modal--active)', function() {
            $('.video-modal').remove();
        }).on('click', '.video-modal__video', function(event) {
            event.stopPropagation();
        });
    }
}