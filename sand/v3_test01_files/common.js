'use strict'

// pickupのカルーセル
const pickupCarousel = new Swiper ('.js-pickup-carousel', {
  grabCursor: true,
  loop: true,
  navigation: {
    nextEl: '.js-pickup-next',
    prevEl: '.js-pickup-prev',
  },
  slidesPerView: 'auto',
  spaceBetween: 25,
  breakpoints: {
    769: {
      spaceBetween: 20,
    },
    1280: {
      spaceBetween: 30,
    },
  }
})

// 新着情報のカルーセル
const latestInfoSwiper = new Swiper ('.js-latest-info-swiper', {
  autoHeight: false,
  grabCursor: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 25,
  breakpoints: {
    769: {
      navigation: {
        nextEl: '.js-latest-info-next',
        prevEl: '.js-latest-info-prev',
      },
      pagination: {
        clickable: true,
        el: '.js-latest-carousel-dot',
      },
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      navigation: {
        nextEl: '.js-latest-carousel-next',
        prevEl: '.js-latest-carousel-prev',
      },
      pagination: {
        clickable: true,
        el: '.js-latest-carousel-dot',
      },
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }
})

$(function() {
  // 宣言
  const active = '-active',
        compact = '-compact',
        header = $('.js-header'), // ヘッダー
        main = $('.js-main'), // メイン
        side = $('.js-side'), // サイド
        trigger01 = $('.js-trigger-01'), // ヘッダーツールバーのサブメニューの開閉トリガー
        target01 = $('.js-target-01'), // ヘッダーツールバーのサブメニュー
        trigger02 = $('.js-trigger-02'), // グロナビの開閉トリガー
        target02 = $('.js-target-02'), // グロナビ
        menuTxt = [$('.js-menu-txt'), 'メニュー', '閉じる'], // グロナビの開閉トリガーのテキスト
        menuIcon = [$('.js-menu-icon'), 'fa-bars', 'fa-times'], // グロナビの開閉トリガーのアイコン
        mdDown = window.matchMedia('screen and (max-width: 768px)'),
        mdUplgDown = window.matchMedia('screen and (min-width: 769px) and (max-width: 1279px)')

  // 760px以上1279px以下での処理
  function mdUplgDownAction(mdUplgDown) {
    if(mdUplgDown.matches) {

      // 固定サイドの横スクロール処理
      $(window).on('scroll', function(){
        side.css('left', -$(window).scrollLeft())
      })

    } else {

      // 固定サイドのleftをリセット
      side.css('left', '')

    }
  }
  // ブレイクポイントの瞬間に発火
  mdUplgDown.addListener(mdUplgDownAction)
  // 初回チェック
  mdUplgDownAction(mdUplgDown)

  var ahash = location.hash

  // 768px以下での処理
  function mdDownAction(mdDown) {
    if(mdDown.matches) {

      if(ahash) {
        header.addClass(compact)
        main.addClass(compact)
        setTimeout(function(){
          var gotoNum = $(ahash).offset().top
          $('html,body').animate({ scrollTop: gotoNum }, 0)
        }, 100)
      }

      // ヘッダーの変形処理
      $(window).on('load scroll resize', function(){
        const scrollTop = 10;
        if($(this).scrollTop() > scrollTop) {
          header.addClass(compact)
          main.addClass(compact)
        } else {
          header.removeClass(compact)
          main.removeClass(compact)
        }
      })

      // ヘッダーツールバーのサブメニューの開閉処理
      trigger01.on('click', function() {
        if(trigger02.hasClass(active)) {
          target02.slideUp()
          trigger02.removeClass(active)
          menuTxt[0].text(menuTxt[1])
          menuIcon[0].removeClass(menuIcon[2]).addClass(menuIcon[1])
        }
        target01.slideToggle()
        $(this).toggleClass(active)
      })

      // グロナビの開閉処理
      trigger02.on('click', function() {
        if(trigger01.hasClass(active)) {
          target01.slideUp()
          trigger01.removeClass(active)
        }
        target02.slideToggle()
        $(this).toggleClass(active)
        if($(this).hasClass(active)) {
          menuTxt[0].text(menuTxt[2])
          menuIcon[0].removeClass(menuIcon[1]).addClass(menuIcon[2])
        } else {
          menuTxt[0].text(menuTxt[1])
          menuIcon[0].removeClass(menuIcon[2]).addClass(menuIcon[1])
        }
      })

      // グロナビの閉じる処理（SPのみ）
      $('.js-gnav-close').on('click', function() {
        target02.slideToggle()
        trigger02.removeClass(active)
        menuTxt[0].text(menuTxt[1])
        menuIcon[0].removeClass(menuIcon[2]).addClass(menuIcon[1])
      })

      // 店舗のご案内ページでページ内リンクをクリックされた場合の処理
      $('.js-inpage-link').on('click', function(e) {
        e.preventDefault()
        var linkUrl = $(this).attr('href')
        var ahash = linkUrl.replace('/shop/', '')
        header.addClass(compact)
        main.addClass(compact)
        target02.slideToggle()
        trigger02.removeClass(active)
        $('.js-trigger-03').removeClass(active)
        $('.js-target-03').slideUp()
        menuTxt[0].text(menuTxt[1])
        menuIcon[0].removeClass(menuIcon[2]).addClass(menuIcon[1])
        setTimeout(function(){
          var gotoNum = $(ahash).offset().top
          $('html,body').animate({ scrollTop: gotoNum }, 0)
        }, 100)
        return false
      })

      // グロナビのサブメニューの開閉処理
      $('.js-trigger-03').on('click', function(e) {
        if(mdDown.matches) {
          e.preventDefault()
        }
        $(this).toggleClass(active).next('.js-target-03').slideToggle()
      })

      // サイトマップのサブメニューの開閉処理
      $('.js-trigger-04').on('click', function() {
        $(this).toggleClass(active).next('.js-target-04').slideToggle()
        return false
      })

    }
  }
  // ブレイクポイントの瞬間に発火
  mdDown.addListener(mdDownAction)
  // 初回チェック
  mdDownAction(mdDown)

})

