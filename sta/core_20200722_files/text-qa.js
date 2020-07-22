/**
 * @file
 * QA テンプレートのアコーディオンアニメーションの実装.
 */
(function($, Drupal) {
  Drupal.behaviors.textQa = {
    attach: function(context, settings) {

      var $accordionUnit = $('.js-accordion');
      var $accordionHead = $accordionUnit.children('dt');

      $accordionHead.once('textAaAccordion').on('click', function(e) {
        var $this = $(this);
        $this.next('dd').slideToggle(200);
        $this.toggleClass('is-open')
      });
    }
  };
})(jQuery, Drupal);
