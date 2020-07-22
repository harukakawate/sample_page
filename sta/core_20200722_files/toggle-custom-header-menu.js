/**
 * @file
 * カスタムヘッダーのメニュー開閉.
 */
(function($, Drupal) {
  Drupal.behaviors.toggleCustomHeaderMenu = {
    attach: function(context, settings) {
      $('.js-custom-header', context)
        .once('toggle-custom-header-menu')
        .each(function() {
          $customHeader = $(this);
          $customHeaderMenu = $customHeader.find('.js-menu');
          $customHeader.find('.js-menu-open').on('click', function() {
            $customHeaderMenu.addClass('is-menu-open');
          });
          $customHeader.find('.js-menu-close').on('click', function() {
            $customHeaderMenu.removeClass('is-menu-open');
          });
        });
    }
  };
})(jQuery, Drupal);
