/**
 * @file
 * 採用トップページに表示するオフィスマップの処理.
 */

(function($, Drupal) {
  Drupal.behaviors.officeMap = {
    attach: function(context, settings) {
      $('.js-office-map')
        .once('officeMap')
        .each(function() {
          var $this = $(this);
          var $map = $this.find('img[usemap');

          // レスポンシブ化.
          $map.rwdImageMaps();

          // ホバー時の画像差し替え.
          var defaultImage = $map.attr('src');
          var $areas = $this.find('area');
          $areas.on('mouseenter', function() {
            var hoverImgSrc = $(this).data('hover');
            $map.attr('src', hoverImgSrc);
          });
          $areas.on('mouseleave', function() {
            $map.attr('src', defaultImage);
          });
        });
    }
  };
})(jQuery, Drupal);
