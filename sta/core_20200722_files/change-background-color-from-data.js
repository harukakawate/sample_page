/**
 * @file
 * data-bg-color 属性があれば背景色を変えるスタイルシート.
 */

(function($, Drupal) {
  Drupal.behaviors.changeBackgroundColorFromData = {
    attach: function(context, settings) {
      $('.js-change-bg-color')
        .once('changeBackgroundColorFromData')
        .each(function() {
          var $this = $(this);
          var bgColor = $this.attr('data-bg-color');
          $this.css('background-color', bgColor);
        });
    }
  };
})(jQuery, Drupal);
