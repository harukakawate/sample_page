/**
 * @file
 * 最新ニュースリストの実装.
 */
(function($, Drupal, drupalSettings) {
  Drupal.behaviors.recentNews = {
    attach: function(context, settings) {
      /**
       * 数値チェック.
       * @param {*} val
       *   チェック対象の文字列.
       * @return boolean
       *   数字の文字列ならtrue、そうでなければfalse.
       */
      function isNumber(val) {
        var pattern = /^[0-9]+$/;
        return pattern.test(val);
      }

      $('.js-recent-news', context)
        .once('recentNews')
        .each(function() {
          var $recentNews = $(this);
          var $readmore = $recentNews.find('.js-recent-news-readmore');
          $readmore.on('click', function() {
            $recentNews.addClass('is-opened');
          });

          var $viewList = $recentNews.find('.js-recent-news-view-list');
          var categoryId = isNumber($recentNews.data('category'))
            ? $recentNews.data('category')
            : '';
          $viewList.attr('href', '/news?category_id=' + categoryId);

          var $newsList = $recentNews.find('.js-recent-news-list');
          var maxCount = isNumber($recentNews.data('max-count'))
            ? $recentNews.data('max-count')
            : null;

          $.templates(
            'newslist',
            '<li class="js-news-list-item p-newslist__item">\
            <a href="{{:href}}" class="p-newsitem p-newsitem--topics {{:is_new}}" target="_blank">\
              <div class="p-newsitem__inner">\
                <time datetime="{{:created_datetime}}" class="p-newsitem__date c-news-date">{{:created}}</time>\
                <div class="p-newsitem__title">{{:title}}</div>\
              </div>\
            </a>\
          </li>'
          );

          var apiUrl = '/api/recent-news';
          if (categoryId) {
            apiUrl = apiUrl + '/' + categoryId;
          }

          var apiUrl = '';
          if ($recentNews.hasClass('js-recent-product-news')) {
            var serviceCategories = drupalSettings.recentNews.categories;
            var nid =
              drupalSettings.recentNews.nid == null
                ? 'all'
                : drupalSettings.recentNews.nid;
            apiUrl =
              '/api/recent-product-news/' +
              serviceCategories.join('+') +
              '/' +
              nid;
          } else {
            apiUrl = '/api/recent-news';
            apiUrl += categoryId ? '/' + categoryId : '';
          }

          $.ajax({
            type: 'GET',
            url: apiUrl
          })
            .done(function(result) {
              var newsHtml = '';
              if (result.length === 0) {
                $recentNews.append('<p class="topics__message">お知らせがありません。</p>');
                $recentNews.addClass('is-no-data');
                return;
              }

              $recentNews.addClass('is-recent-news-ready');

              if (maxCount && maxCount < 5) {
                result = result.slice(0, maxCount);
              }
              result.forEach(function(record) {
                newsHtml += $.render.newslist({
                  title: record.title,
                  category: record.category,
                  href: record.href,
                  created: record.created,
                  created_datetime: record.created_datetime,
                  is_new: record.is_new == 'TRUE' ? 'p-newsitem--new' : ''
                });
              });
              $newsList.append(newsHtml);
              $newsList.find('.js-news-list-item').each(function(idx) {
                var $item = $(this);
                setTimeout(function() {
                  $item.addClass('is-animated');
                }, 100 * idx);
              });
            })
            .fail(function(err) {
              console.error(err);
            });
        });
    }
  };
})(jQuery, Drupal, drupalSettings);
