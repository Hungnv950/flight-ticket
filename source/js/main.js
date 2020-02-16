//=require node_modules/jquery/dist/jquery.min.js

$(document).ready(function() {
  $('.js-lazy-load').each(function() {
    if ($(this).data('type') == 'background-image') {
      $(this).css('background-image', 'url(' + $(this).data('src') + ')')
    } else {
      $(this).css('src', $(this).data('src'))
    }
  });

  $('.js-dropdown').each(function() {
    var dropdown = $(this);
    dropdown.find('.js-control-show-dropdown').on('click', function() {
      if (dropdown.hasClass('show')) return dropdown.removeClass('show');
      dropdown.addClass('show');
    });
    $(document).on('click', function(e) {
      if (!$(e.target).closest(dropdown).length) {
        dropdown.removeClass('show')
      }
    })
  });

  $('.js-toggle-control').on('click', function() {
    var toggleWrap = $(this).closest('.js-toggle');
    if (toggleWrap.hasClass('show')) return toggleWrap.removeClass('show');
    toggleWrap.addClass('show');
  });

  $('.js-tab').each(function() {
    var tab = $(this);
    var tabNavItem = $(this).find('.js-tab-nav');
    var tabContentItem = $(this).find('.js-tab-content-item');
    tab.find('.js-tab-nav').on('click', function() {
      tabNavItem.removeClass('active');
      tabContentItem.removeClass('active');
      $(this).addClass('active');
      tab.find($(this).data('target')).addClass('active');
    });
  });

  var slider = function(slider, option) {
    var sliderWrap = slider.find('.slider__list-wrap');
    var sliderList = slider.find('.slider__list');
    var sliderWrapWidth = sliderWrap.outerWidth();
    var sliderItem = slider.find('.slider__item');
    var btnPrev = slider.find('.js-prev-slide');
    var btnNext = slider.find('.js-next-slide');
    var firstShowSlide;
    var currentSlide;

    if (option && option.number && option.number > 1) {
      sliderItem.width(sliderWrapWidth / option.number);
      sliderList.width(sliderWrapWidth * sliderItem.length / option.number);
      if (option.activeSlide) {
        $(sliderItem[ option.activeSlide ]).addClass('active');
        firstShowSlide = Math.floor((option.activeSlide + 1) / option.number) * option.number;
        sliderList.css({
          'transform': 'translateX(-' + sliderWrapWidth * firstShowSlide / option.number + 'px)'
        });
        btnPrev.on('click', function() {
          if (firstShowSlide > 0) {
            sliderList.css({
              'transform': 'translateX(-' + sliderWrapWidth * (firstShowSlide - 1) / option.number + 'px)'
            });
            firstShowSlide--;
          }
        });
        btnNext.on('click', function() {
          if (firstShowSlide + option.number < sliderItem.length) {
            sliderList.css({
              'transform': 'translateX(-' + sliderWrapWidth * (firstShowSlide + 1) / option.number + 'px)'
            });
            firstShowSlide++;
          }
        });
      } else {
        currentSlide = 0;
      }
    } else {
      sliderItem.width(sliderWrapWidth);
      sliderList.width(sliderWrapWidth * sliderItem.length);
      if (option && option.activeSlide) {
        currentSlide = option.activeSlide;
      } else {
        currentSlide = 0
      }
      sliderList.css({
        'transform': 'translateX(-' + sliderWrapWidth * currentSlide + 'px)'
      });
      $(sliderItem[ currentSlide ]).addClass('active');
      btnPrev.on('click', function() {
        if (currentSlide > 0) {
          sliderList.css({
            'transform': 'translateX(-' + sliderWrapWidth * (currentSlide - 1) + 'px)'
          });
          currentSlide--;
        }
      });
      btnNext.on('click', function() {
        if (currentSlide < sliderItem.length - 1) {
          sliderList.css({
            'transform': 'translateX(-' + sliderWrapWidth * (currentSlide + 1) + 'px)'
          });
          currentSlide++;
        }
      });
    }
  }

  slider($('.review .js-slider'));

  $('select').on('mousedown', function(e) {
    e.preventDefault()
  })
});
