/**
 * @file
 * 採用メニュー開閉.
 */
(function($, Drupal) {
  Drupal.behaviors.toggleRecruitMenu = {
    attach: function(context, settings) {
      $('.js-recruit-header', context)
        .once('toggle-recruit-menu')
        .each(function() {
          var $recruitHeader = $(this);
          var $toggleButton = $recruitHeader.find('.js-toggle-menu');
          $toggleButton.on('click', function() {
            $recruitHeader.toggleClass('is-menu-open');
            if ($recruitHeader.hasClass('is-menu-open')) {
              $toggleButton.find('img').attr(
                'src',
                '/themes/original/images/custom-header-menu-close.png'
              );
            } else {
              $toggleButton.find('img').attr(
                'src',
                '/themes/original/images/custom-header-menu-open.png'
              );
            }
          });
        });
    }
  };
})(jQuery, Drupal);
