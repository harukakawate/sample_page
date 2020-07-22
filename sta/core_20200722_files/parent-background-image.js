/**
 * @file
 * js-background-imageクラスをもつimgがあれば、親要素の背景画像にその画像を設定する.
 */

(function($, Drupal) {
  Drupal.behaviors.parentBackgroundImage = {
    attach: function(context, settings) {
      $('.js-background-image')
        .once('backgroundImage')
        .each(function() {
          var $this = $(this);
          var $image = $this.find('img');
          if ($image.length > 0) {
            $this
              .parent()
              .css('background-image', 'url(' + $image.attr('src') + ')');
            $this.remove();
          }
        });
    }
  };
})(jQuery, Drupal);
