export default class scrollAnimate {
    constructor() {
        /*
         * Scroll animation
        */
        $(document).on('click','a.animate', function(event){
                event.preventDefault();
                $('html, body').stop().animate({ scrollTop: ($($(this).attr('href')).offset().top)-65 }, '1000', 'swing'); 
                window.location.hash = $(this).attr('href');
        })
    }
}