$('.js-col-fixed').each(function() {
    const col = $(this);
    const colOffetTop = col.offset().top;

    console.log(1);

    col.css({
        'width': col.outerWidth(),
        'left': col.offset().left,
        'top': '82px',
    });

    if (window.innerWidth >= 1200) {
        col.css({
            'max-height': `calc(100vh - ${ colOffetTop + 12 }px`
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= (colOffetTop - 82)) {
                col.css({
                    'position': 'fixed',
                    'max-height': 'calc(100vh - 94px)'
                });
            } else {
                col.css({
                    'position': 'static',
                    'max-height': `calc(100vh - ${ colOffetTop - $(window).scrollTop() + 12 }px`
                });
            }
        });
    }
});