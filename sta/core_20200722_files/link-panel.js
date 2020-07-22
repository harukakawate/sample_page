/**
 * @file
 * 要素全体をリンク化する.
 */
(function($, Drupal) {
  Drupal.behaviors.linkPanel = {
    attach: function(context, settings) {
      $('.js-link-panel', context)
        .once('linkPanel')
        .each(function() {
          var $this = $(this);

          // 元々のリンクをdivに置き換え、新しく生成したaタグで囲う.
          var $link = $this.find('a');
          var linkClasses = $link.attr('class');
          var linkText = $link.text();
          $link.text('');
          $link.removeClass(linkClasses);
          $link.addClass('link-panel-link');
          var $button = $('<div>', {
            class: linkClasses,
            text: linkText
          });
          $button.appendTo($link);
        });
    }
  };
})(jQuery, Drupal);
