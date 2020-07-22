/**
 * @file
 * Waypointsを有効化する.
 */
(function($, Drupal) {
  Drupal.behaviors.waypoints = {
    attach: function(context, settings) {
      $('.js-anime', context)
        .once('waypoints')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              $target.addClass('is-animated');
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      // タイムテーブル全体をアニメーションする.
      $('.js-custom-timetable', context)
        .once('waypointsCustomTimetable')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              var $rows = $target.find('.custom-timetable__row');
              $rows.each(function(index, item) {
                setTimeout(function() {
                  $(item).addClass('is-animated');
                }, Math.floor(index) * 100);
              });
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      $('.js-image-text-motion', context)
        .once('image-text-motion')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              var $box = $target.find('.image-text-motion__box');
              var $img = $target.find('.image-text-motion__image img');
              var $mask = $target.find('.image-text-motion__image .u-mask');
              $mask.addClass('is-animated');
              setTimeout(function() {
                $box.addClass('is-animated');
              }, 100);
              setTimeout(function() {
                $img.addClass('is-animated');
                $mask.addClass('is-animated-back');
              }, 1000);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      $('.js-contact-motion-box')
        .once('contact-motion-box')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              var $mask = $target.find('.js-contact-motion-mask');
              $target.addClass('is-animated');
              setTimeout(function() {
                $mask.addClass('anime-back');
              }, 1000);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      // リード文1
      $('.js-lead-box')
        .once('leadBoxWaypoint')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              $target.addClass('is-animated');
              var $targetChild1 = $target.find('.lead-box__amime--1');
              var $targetChild2 = $target.find('.lead-box__amime--2');
              var $targetChild3 = $target.find('.lead-box__amime--3');

              setTimeout(function() {
                $targetChild1.addClass('is-animated');
              }, 700);
              setTimeout(function() {
                $targetChild2.addClass('is-animated');
              }, 800);
              setTimeout(function() {
                $targetChild3.addClass('is-animated');
              }, 900);

              setTimeout(function() {
                $target.find('.p-btn-unit').addClass('is-animated');
                $targetChild1.addClass('is-animated--back');
              }, 1700);
              setTimeout(function() {
                $targetChild2.addClass('is-animated--back');
              }, 1800);
              setTimeout(function() {
                $targetChild3.addClass('is-animated--back');
              }, 1900);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      // リード文2
      $('.js-lead-motion')
        .once('leadMotion')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              setTimeout(function() {
                $('.js-lead-motion .lead-motion__inner').addClass(
                  'is-animated'
                );
              }, 0);

              setTimeout(function() {
                $('.js-lead-motion .lead-motion__title').addClass(
                  'is-animated'
                );
              }, 500);

              setTimeout(function() {
                $('.js-lead-motion .lead-motion__lead').addClass('is-animated');
              }, 600);

              setTimeout(function() {
                $('.js-lead-motion .lead-motion__title > span').addClass(
                  'is-animated'
                );
                $('.js-lead-motion .lead-motion__title').addClass(
                  'is-animated__back'
                );
              }, 1500);

              setTimeout(function() {
                $('.js-lead-motion .lead-motion__lead > span').addClass(
                  'is-animated'
                );
                $('.js-lead-motion .lead-motion__lead').addClass(
                  'is-animated__back'
                );
              }, 1600);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      // グループパネル.
      $('.js-group-panel-item')
        .once('groupPanelWaypoint')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {
              $target.addClass('is-animated');

              setTimeout(function() {
                $target.find('.group-panel__inner').addClass('is-animated');
                $target.addClass('is-animated');
                $target.addClass('is-animated--back');
              }, 1000);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      // Width 100% パネルリンク 画像 + テキスト.
      $('.js-highlighted-panel')
        .once('highlightedPanelWaypoint')
        .each(function() {
          var $target = $(this);
          $target.waypoint({
            handler: function() {

              setTimeout(function() {
                $target.addClass('is-animated');
              }, 0);
              setTimeout(function() {
                $target.find('.highlighted-panel__section').addClass('is-animated');
              }, 700);

              setTimeout(function() {
                $target.find('.highlighted-panel__block-title-ja').addClass('is-animated');
              }, 800);
              setTimeout(function() {
                $target.find('.highlighted-panel__block-title-en').addClass('is-animated');
              }, 950);
              setTimeout(function() {
                $target.find('.highlighted-panel__block-text').addClass('is-animated');
              }, 1100);
              setTimeout(function() {
                $target.find('.highlighted-panel__block-btn').addClass('is-animated');
              }, 1250);
            },
            offset: function() {
              return waypointsDefaultOffset($target);
            }
          });
        });

      /**
       * デフォルトのオフセットの値を取得する.
       * @param {*} $target
       *   対象となる要素のjQueryオブジェクト.
       */
      function waypointsDefaultOffset($target) {
        var triggerOffsetTop = window.innerHeight / 1.5;
        if (canReachTriggerPoint($target, triggerOffsetTop)) {
          return triggerOffsetTop;
        } else {
          // トリガーポイントまで達せない場合は、要素の下端まで達した段階で発火させる.
          return window.innerHeight - $target.innerHeight();
        }
      }

      /**
       * 指定された要素がトリガーポイントまで達することができるかどうか.
       *
       * @param {*} $target
       *   対象となる要素のjQueryオブジェクト.
       * @param {*} triggerOffsetTop
       *   windowの上端からトリガーポイントまでの距離.
       */
      function canReachTriggerPoint($target, triggerOffsetTop) {
        var triggerOffsetBottom = window.innerHeight - triggerOffsetTop;
        return getScrollableHeight($target) >= triggerOffsetBottom;
      }

      /**
       * 指定された要素が画面内に現れてから、下にスクロール可能な量を取得する.
       *
       * @param {*} $target
       *   対象となる要素のjQueryオブジェクト.
       */
      function getScrollableHeight($target) {
        return $(document).height() - $target.offset().top;
      }
    }
  };
})(jQuery, Drupal);
