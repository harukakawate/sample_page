/**
 * @file
 * CKEditorテンプレート「横幅100% + テキスト」のコンテンツ表示を調整する.
 */
(function($, Drupal) {
  Drupal.behaviors.adjustImageContainer = {
    attach: function(context, settings) {
      /**
       * コンテンツ部分が背景画像エリアから溢れているかどうかを判定して、クラスを付与する.
       * @param {*} $imageContainer 
       */
      function detectOverflow($imageContainer) {
        var $background = $imageContainer.find(
          '.image-container__image,.image-container__video'
        );
        var $content = $imageContainer.find('.image-container__content');
        if ($background.length > 0 && $content.length > 0) {
          $imageContainer.toggleClass(
            'is-overflow',
            $background[0].scrollHeight < $content[0].scrollHeight
          );
        }
      }

      $('body', context)
        .once('adjust-image-container')
        .each(function() {
          var $imageContainers = $('.image-container', context);
          $(window).on('resize', function() {
            $imageContainers.each(function() {
              detectOverflow($(this));
            });
          });

          $imageContainers.each(function() {
            detectOverflow($(this));
          });
        });
    }
  };
})(jQuery, Drupal);
