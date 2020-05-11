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

$(window).on('scroll', function() {
    if ($('.header-search-page')) {
        if (window.width >= 768) {
            if (window.scrollY > 100) {
                $('.header-search-page').addClass('on-change');
            } else {
                $('.header-search-page').removeClass('on-change');
            }
        } else {
            if (window.scrollY > 70) {
                $('.header-search-page').addClass('on-change');
            } else {
                $('.header-search-page').removeClass('on-change');
            }
        }
    }
});

if ($('.js-block-countdown').length) {
    var blockCountdownWidth = $('.js-block-countdown').outerWidth();
    if ($(document).scrollTop() >= $('.js-block-countdown').offset().top - 83) {
        $('.js-block-countdown').css('width', blockCountdownWidth);
        $('.js-block-countdown').addClass('fixed');
    }
    $(document).on('scroll', function() {
        if ($(this).scrollTop() >= 198) {
            $('.js-block-countdown').css('width', blockCountdownWidth);
            $('.js-block-countdown').addClass('fixed')
        } else if ($(this).scrollTop() < 198) {
            $('.js-block-countdown').removeClass('fixed')
        }
    });
}