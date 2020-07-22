'use strict';

(function($, Drupal) {
  Drupal.behaviors.common = {
    attach: function(context, settings) {
      $('body', context)
        .once('common')
        .each(function() {
          /**
           *  SmoothScroll: アンカーリンクのスムーススクロール
           */
          var SmoothScroll = function(element, options) {
            this.$window = $(window);
            this.$trigger = $(element);
            this.init(options);
          };

          SmoothScroll.prototype = {
            defaults: {
              easing: 'swing',
              speed: 'normal',
              fixedHeader: false
            },

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.fixedHeaderHeight = 0;
              if (
                this.options.fixedHeader &&
                $(this.options.fixedHeader).length > 0
              ) {
                this.fixedHeaderHeight = $(
                  this.options.fixedHeader
                ).outerHeight();
              }
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;

              _this.$trigger.on('click', $.proxy(_this.clickHandler, _this));
            },

            clickHandler: function() {
              var scrollPos = getScrollPosition(
                this.getHref(),
                this.fixedHeaderHeight
              );

              var _this = this;
              $('html, body').animate(
                {
                  scrollTop: scrollPos
                },
                _this.options.speed,
                _this.options.easing
              );

              return false;
            },

            getHref: function() {
              var _this = this;

              return _this.$trigger.attr('href') || _this.$trigger.data('href');
            }
          };

          $.fn.SmoothScroll = function(options) {
            return this.each(function() {
              new SmoothScroll(this, options);
            });
          };

          /**
           *  Megamenu: メガメニュー
           */
          var Megamenu = function(element, options) {
            this.$window = $(window);
            this.$megamenu = $(element);
            this.init(options);
          };

          Megamenu.prototype = {
            defaults: {
              trigger: '.js-megamenu-trigger',
              hoverTrigger: '.js-megamenu-hover-trigger',
              submenu: 'megamenu',
              close: '.js-megamenu-close',
              overlay: '.js-megamenu-overlay',
              openClass: 'is-opened'
            },

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;
              _this.$megamenu
                .find(_this.options.trigger)
                .on('touchstart', $.proxy(_this.clickHandler, _this));
              _this.$megamenu
                .find(_this.options.hoverTrigger)
                .on('mouseenter', $.proxy(_this.mouseenterHandler, _this));
              _this.$megamenu
                .find(_this.options.hoverTrigger)
                .on('mouseleave', $.proxy(_this.mouseleaveHandler, _this));
              _this.$megamenu
                .find('.p-megamenu a')
                .on('click', $.proxy(_this.clickLinkItem, _this));

              $(_this.options.close).on(
                'click',
                $.proxy(_this.closeHandler, _this)
              );
              $(_this.options.overlay).on(
                'click',
                $.proxy(_this.closeHandler, _this)
              );
            },

            mouseenterHandler: function(e) {
              var _this = this;
              var $targetLink = $(e.currentTarget).find(_this.options.trigger);
              e.preventDefault();
              _this.openSubMenu($targetLink);
            },
            mouseleaveHandler: function(e) {
              var _this = this;
              var $targetLink = $(e.currentTarget).find(_this.options.trigger);
              e.preventDefault();
              _this.closeSubMenu($targetLink);
            },
            clickHandler: function(e) {
              var _this = this;
              var $currentLink = $(e.currentTarget);
              e.preventDefault();
              if (!$currentLink.hasClass(_this.options.openClass)) {
                _this.openSubMenu($currentLink);
              } else {
                _this.closeSubMenu($currentLink);
              }
            },
            closeHandler: function(e) {
              var _this = this;
              e.preventDefault();
              var $currentLink = _this.getCurrentLink();
              if ($currentLink.length > 0) {
                _this.closeSubMenu($currentLink);
              }
            },
            openSubMenu: function($targetLink) {
              var _this = this;
              var $targetSubmenu = _this.getSubmenu(
                $targetLink,
                _this.options.submenu
              );
              if ($targetLink.hasClass(_this.options.openClass)) {
                return;
              }
              var $currentLink = _this.getCurrentLink();
              if ($currentLink.length > 0) {
                _this.closeSubMenu($currentLink);
              }
              $targetSubmenu
                .addClass(_this.options.openClass)
                .css('max-height', $targetSubmenu[0].scrollHeight + 'px');
              _this.$megamenu.addClass(_this.options.openClass);
              $targetLink.addClass(_this.options.openClass);
              $(_this.options.overlay).addClass('is-fixed');
            },
            closeSubMenu: function($targetLink) {
              var _this = this;
              $targetLink.removeClass(_this.options.openClass);
              var $targetSubmenu = _this.getSubmenu(
                $targetLink,
                _this.options.submenu
              );
              $targetSubmenu
                .removeClass(_this.options.openClass)
                .css('max-height', 0);
              $(_this.options.overlay).removeClass('is-fixed');
              _this.$megamenu.removeClass(_this.options.openClass);
            },
            getCurrentLink: function() {
              return this.$megamenu.find(
                this.options.trigger + '.' + this.options.openClass
              );
            },
            getSubmenu: function($targetLink, submenuSelector) {
              return $targetLink.next(submenuSelector);
            },
            clickLinkItem: function(e) {
              var _this = this;
              var href = $(e.currentTarget).attr('href');
              var hashIndex = href.indexOf('#');
              var targetPath = href.substring(0, hashIndex);
              var targetHash = href.slice(hashIndex);
              var currentPath = location.pathname;

              var $currentLink = _this.getCurrentLink();
              if ($currentLink.length > 0) {
                _this.closeSubMenu($currentLink);
              }

              if (currentPath === targetPath) {
                var scrollPos =
                  $(targetHash).offset().top - $('.p-header').outerHeight();
                $('html, body').animate(
                  {
                    scrollTop: scrollPos
                  },
                  'normal',
                  'swing'
                );
              }

              return true;
            }
          };

          $.fn.Megamenu = function(options) {
            return this.each(function() {
              new Megamenu(this, options);
            });
          };

          /**
           *  SelectBox: カスタムセレクトボックス
           */
          var SelectBox = function(element, options) {
            this.$window = $(window);
            this.$element = $(element);
            this.$label = this.$element.children().first();
            this.$select = this.$element.find('select');
            this.init(options);
          };

          SelectBox.prototype = {
            defaults: {},

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;
              _this.$select
                .on('change', $.proxy(_this.changeHandler, _this))
                .trigger('change');
            },

            changeHandler: function(e) {
              var _this = this;
              var current = $(e.currentTarget)
                .find('option:selected')
                .text();
              _this.$label.text(current);
            }
          };

          $.fn.SelectBox = function(options) {
            return this.each(function() {
              new SelectBox(this, options);
            });
          };

          /**
           *  LoadHTML: 外部HTMLファイル読み込み
           */
          var LoadHTML = function(element, options) {
            this.$window = $(window);
            this.$element = $(element);
            this.init(options);
          };

          LoadHTML.prototype = {
            defaults: {
              url: ''
            },

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;
              $.proxy(_this.getAjax, _this)();
            },

            getAjax: function() {
              var _this = this;

              $.ajax({
                type: 'GET',
                url: _this.options.url,
                dataType: 'html',
                success: function(data) {
                  _this.$element.append(data);
                  _this.$element.children().trigger('ajaxload');
                },
                error: function() {}
              });
            }
          };

          $.fn.LoadHTML = function(options) {
            return this.each(function() {
              new LoadHTML(this, options);
            });
          };

          /**
           *  DropdownMenu: SPドロップダウンメニュー
           */
          var DropdownMenu = function(element, options) {
            this.$window = $(window);
            this.$element = $(element);
            this.$html = $('html');
            this.init(options);
          };

          DropdownMenu.prototype = {
            defaults: {
              target: '.js-dropdown-target',
              toggle: '.js-dropdown-toggle',
              overlay: '.js-dropdown-overlay',
              openClass: 'is-dropdown-opened',
              htmlOpenClass: 'menu-is-opened'
            },

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.$dropdown = this.$element.find(this.options.target);
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;

              $(_this.options.toggle).on(
                'click',
                $.proxy(_this.toggleHandler, _this)
              );
              $(_this.options.target)
                .find('a')
                .on('click', $.proxy(_this.tapLinkItem, _this));
              $(_this.options.overlay).on(
                'click',
                $.proxy(_this.closeHandler, _this)
              );
            },

            toggleHandler: function(e) {
              var _this = this;
              var dropdownTarget = $(e.currentTarget).data('dropdown');
              e.preventDefault();

              if (_this.$dropdown.hasClass(_this.options.openClass)) {
                if (
                  dropdownTarget ===
                  $('.' + _this.options.openClass).data('dropdown')
                ) {
                  $(e.currentTarget).removeClass(_this.options.openClass);
                  _this.$dropdown
                    .filter('[data-dropdown=' + dropdownTarget + ']')
                    .children('.p-dropdown')
                    .slideUp(250, function() {
                      _this.$dropdown
                        .filter('[data-dropdown=' + dropdownTarget + ']')
                        .hide()
                        .removeClass(_this.options.openClass);
                    });
                  _this.$html.removeClass(_this.options.htmlOpenClass);
                } else {
                  $(_this.options.toggle).removeClass(_this.options.openClass);
                  _this.$dropdown
                    .children('.p-dropdown')
                    .slideUp(250, function() {
                      _this.$dropdown
                        .hide()
                        .removeClass(_this.options.openClass);
                      $(e.currentTarget).addClass(_this.options.openClass);
                      _this.$dropdown
                        .filter('[data-dropdown=' + dropdownTarget + ']')
                        .show()
                        .addClass(_this.options.openClass);
                      _this.$dropdown
                        .filter('[data-dropdown=' + dropdownTarget + ']')
                        .children('.p-dropdown')
                        .slideDown(250);
                    });
                }
              } else {
                $(e.currentTarget).addClass(_this.options.openClass);
                _this.$dropdown
                  .filter('[data-dropdown=' + dropdownTarget + ']')
                  .show()
                  .addClass(_this.options.openClass);
                _this.$dropdown
                  .filter('[data-dropdown=' + dropdownTarget + ']')
                  .children('.p-dropdown')
                  .slideDown(250);
                _this.$html.addClass(_this.options.htmlOpenClass);
              }
            },

            closeHandler: function(e) {
              var _this = this;
              e.preventDefault();
              $(_this.options.toggle).removeClass(_this.options.openClass);
              _this.$dropdown.slideUp(250).removeClass(_this.options.openClass);
              _this.$html.removeClass(_this.options.htmlOpenClass);
            },

            tapLinkItem: function(e) {
              var _this = this;
              var href = $(e.currentTarget).attr('href');
              var hashIndex = href.indexOf('#');
              var targetPath = href.substring(0, hashIndex);
              var targetHash = href.slice(hashIndex);
              var currentPath = location.pathname;

              if (currentPath === targetPath) {
                $(_this.options.toggle).removeClass(_this.options.openClass);
                _this.$dropdown
                  .slideUp(250)
                  .removeClass(_this.options.openClass);
                _this.$html.removeClass(_this.options.htmlOpenClass);

                var scrollPos =
                  $(targetHash).offset().top - $('.p-header').outerHeight();
                $('html, body').animate(
                  {
                    scrollTop: scrollPos
                  },
                  'normal',
                  'swing'
                );
              }

              return true;
            }
          };

          $.fn.DropdownMenu = function(options) {
            return this.each(function() {
              new DropdownMenu(this, options);
            });
          };

          /**
           *  Accordion: アコーディオンメニュー
           */
          var Accordion = function(element, options) {
            this.$window = $(window);
            this.$accordion = $(element);
            this.init(options);
          };

          Accordion.prototype = {
            defaults: {
              toggle: '.js-accordion-toggle',
              openClass: 'is-opened'
            },

            init: function(options) {
              this.options = $.extend({}, this.defaults, options);
              this.initializeEvent();
            },

            initializeEvent: function() {
              var _this = this;

              _this.$accordion
                .find(_this.options.toggle)
                .on('click', $.proxy(_this.toggleHandler, _this));
            },

            toggleHandler: function(e) {
              var _this = this;
              var $current = $(e.currentTarget);
              e.preventDefault();

              $current.toggleClass(_this.options.openClass);
              $current
                .next()
                .slideToggle(250)
                .toggleClass(_this.options.openClass);
            },

            closeHandler: function(e) {
              var _this = this;
              e.preventDefault();
              _this.$accordion
                .slideUp(250)
                .removeClass(_this.options.openClass);
            }
          };

          $.fn.Accordion = function(options) {
            return this.each(function() {
              new Accordion(this, options);
            });
          };

          $(function() {
            $('.js-anchor').SmoothScroll({
              fixedHeader: '.p-header, .js-fixed-header'
            });
            $('.js-pagetop').SmoothScroll({
              fixedHeader: '.p-header'
            });
            $('.js-selectbox').SelectBox();
            $('.js-dropdown').DropdownMenu();
            $('.js-accordion').Accordion({
              toggle: '.p-submenu-toggle'
            });

            $('.js-search-box')
              .find('input[type="text"]')
              .on('focus', function() {
                $(this)
                  .closest('.js-search-box')
                  .addClass('is-focus');
              });
            $('.js-search-box')
              .find('input[type="text"]')
              .on('blur', function() {
                if ($(this).val() === '') {
                  $(this)
                    .closest('.js-search-box')
                    .removeClass('is-focus');
                }
              });

            $(window)
              .on('scroll', function() {
                var scrollClass = 'page-scroll';
                var fixedHeader = '.p-header, .js-fixed-header';

                if ($(window).scrollTop() > $(fixedHeader).outerHeight()) {
                  $('html').addClass(scrollClass);
                } else {
                  $('html').removeClass(scrollClass);
                }
              })
              .trigger('scroll');
          });

          $(window).on('load', function() {
            // メガメニュー初期化.
            // キャッシュによりdomが取得できないことがあるため、load内で行う.
            $('.js-megamenu').Megamenu({
              submenu: '.js-megamenu-submenu'
            });

            if (location.hash !== '') {
              var $fixedHeader = $('.p-header, .js-fixed-header');
              var fixedHeaderHeight =
                $fixedHeader.length > 0 ? $fixedHeader.outerHeight() : 0;
              var scrollPos = getScrollPosition(
                location.hash,
                fixedHeaderHeight
              );

              setTimeout(function() {
                $('html, body')
                  .stop()
                  .animate(
                    {
                      scrollTop: scrollPos
                    },
                    0
                  );
              }, 0);
            }
          });
        });

      /**
       * 固定ヘッダーの高さを考慮したスクロール停止位置を取得.
       *
       * @param {*} href
       *   リンク先.
       * @param {*} fixedHeaderHeight
       *   固定ヘッダー高さ.
       */
      function getScrollPosition(href, fixedHeaderHeight) {
        var scrollPosition = 0;

        if (href !== '#') {
          // ツールバーが表示されているときにスクロールし過ぎないように対応.
          // ツールバーが表示されていたらbodyにツールバー高さ分のpadding-topが設定されることを利用する.
          var $body = $('body');
          var toolbarHeight = $body.hasClass('toolbar-fixed')
            ? parseInt($body.css('padding-top'))
            : 0;
          if ($('.p-header').length > 0) {
            // p-headerはスクロールに応じて高さが変化するため調整が困難。
            // 既存ページへの影響も考慮して、ツールバーの高さは考慮しないままとする.
            scrollPosition = $(href).offset().top - fixedHeaderHeight;
          } else {
            scrollPosition =
              $(href).offset().top - fixedHeaderHeight - toolbarHeight;
          }
        }

        return scrollPosition;
      }
    }
  };
})(jQuery, Drupal);
