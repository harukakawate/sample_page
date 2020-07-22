/**
 * @file
 * CKEditor テンプレート内にあるカテゴリタグ関連の JS .
 */

(function($, Drupal) {
  // カテゴリタグの背景色を変更する.
  Drupal.behaviors.customCategoryTags = {
    attach: function(context, settings) {
      $('.js-custom-category-tags li')
        .once('custom-category-tags')
        .each(function() {
          var $this = $(this);
          var bgColor = $this.attr('data-label-color');
          $this.css('background-color', bgColor);
        });
    }
  };
})(jQuery, Drupal);
