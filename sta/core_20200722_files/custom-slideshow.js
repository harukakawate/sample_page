/**
 * @file
 * CKEditor テンプレートの画像スライドショーの JS.
 */
// TODO: Drupal 変数が必要かどうか検討
(function($, Drupal) {
  Drupal.behaviors.customSlideshow = {
    attach: function(context, settings) {
      $('.js-custom-slideshow', context)
        .once('custom-slideshow')
        .each(function() {
          var $this = $(this);

          $this.on('init', function(e, slick) {
            var $currentSlide = getCurrentSlide(slick);
            setTimeout(function() {
              playVideoFromTheTop($currentSlide);
            }, 1000);

            // 動画スライドの高さを調整.
            if (isVideoOnly($this)) {
              $this.addClass('is-video-only');
            } else {
              adjustVideoSlideHeight($this);
              $(window).on('resize', function() {
                adjustVideoSlideHeight($this);
              });
            }
          });

          $this.slick({
            infinite: true,
            autoplaySpeed: 5000,
            speed: 2000,
            fade: true,
            arrows: true,
            autoplay: true,
            dots: true,
            cssEase: 'linear'
          });

          $this.on('beforeChange', function(e, slick) {
            var $currentSlide = getCurrentSlide(slick);
            pauseVideo($currentSlide);
          });

          $this.on('afterChange', function(e, slick) {
            var $currentSlide = getCurrentSlide(slick);
            playVideoFromTheTop($currentSlide);
          });
        });

      /**
       * 動画スライドのみで構成されるスライドショーかどうか.
       * @param {*} $slick
       */
      function isVideoOnly($slick) {
        var $slides = $slick.find('.slick-slide li');
        var $videoSlides = $slick.find('.js-video-slide');
        return $slides.length == $videoSlides.length;
      }

      /**
       * 現在のスライドを取得する.
       * @param {*} slick
       */
      function getCurrentSlide(slick) {
        return $(slick.$slider).find('.slick-current');
      }

      /**
       * スライド内の動画を最初から再生する.
       * @param {*} $slide
       */
      function playVideoFromTheTop($slide) {
        var video = $slide.find('video').get(0);
        if (!video) {
          return;
        }
        video.currentTime = 0;
        video.play();
      }

      /**
       * スライド内の動画を一時停止する.
       * @param {*} $slide
       */
      function pauseVideo($slide) {
        var video = $slide.find('video').get(0);
        if (!video) {
          return;
        }
        // スライドがフェードアウトしてから実行.
        setTimeout(function() {
          video.currentTime = 0;
          video.pause();
        }, 2000);
      }

      /**
       * 動画スライドの高さを画像スライドに合わせる.
       * @param {*} $slick
       */
      function adjustVideoSlideHeight($slick) {
        // 動画スライドだけの場合は調整しない.
        if ($slick.hasClass('is-video-only')) {
          return;
        }

        var $videoSlides = $slick.find('.js-video-slide');
        // 動画スライドの高さを一旦クリアして、画像スライドをもとにスライドショーの高さを取得.
        $videoSlides.css('height', '');
        // 高さが反映されるまで少し待つ.
        setTimeout(function() {
          $videoSlides.css(
            'height',
            $slick.find('.slick-track').height() + 'px'
          );
        }, 500);
      }
    }
  };
})(jQuery, Drupal);
