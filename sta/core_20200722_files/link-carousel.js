/**
 * @file
 * CKEditorテンプレート 関連ページリンクのスライドショー.
 */

(function($, Drupal) {
  Drupal.behaviors.linkCarousel = {
    attach: function(context, settings) {
      $('.js-link-carousel', context)
        .once('link-carousel')
        .each(function() {
          $(this).slick({
            dots: false,
            draggable: false,
            swipe: true,
            touchMove: true,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2
                }
              }
            ]
          });
        });
    }
  };
})(jQuery, Drupal);
