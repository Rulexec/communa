$(function() {
    function scrollTo(el) {
        $('#to_top').addClass('to_top_hover');

        var scrollPos = el.offset().top,
            elHeight = el.height(),
            windowHeight = $(window).height();
        if (elHeight + 30 < windowHeight) {
            scrollPos -= (windowHeight - elHeight) / 2 - 30;
        }

        $('body').animate({
            scrollTop: scrollPos
        }, 300, function() {
            $('#to_top').removeClass('to_top_hover');
        });
    }

    ['projects', 'people', 'info', 'contacts'].forEach(function(id) {
        $('a[href="#' + id + '"]').click(function() {
            return scrollTo($('#' + id)), false;
        });
    });

    $('#to_top').click(function() {
        $('body').animate({
            scrollTop: 0
        }, 300);
    });
});
