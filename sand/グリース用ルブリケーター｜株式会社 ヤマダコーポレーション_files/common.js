//追尾ナビ
$(function(){
var navPos = jQuery( '#hd' ).offset().top; // グローバルメニューの位置
var navHeight = jQuery( '#hd' ).outerHeight(); // グローバルメニューの高さ
jQuery( window ).on( 'scroll', function() {
  if ( 100 < jQuery( this ).scrollTop() ) { // 1000px以上スクロールしたら
    jQuery( '#hd' ).addClass( 'scrolled' );
  } else {
    jQuery( '#hd' ).removeClass( 'scrolled' );
  }
});
});

//ページの先頭へ
$(function() {
    var pagetop = $('#btn_fixside03');
    pagetop.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500); //0.5秒かけてトップへ移動
        return false;
    });
});

//SPメニュー
$(function(){
  var state = false;
  var scrollpos;

  $('.toggle01').on('click', function(){
    if(state == false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({'top': -scrollpos});
      $('.menu01').addClass('open');
      state = true;
    } else {
      $('body').removeClass('fixed').css({'top': 0});
      window.scrollTo( 0 , scrollpos );
      $('.menu01').removeClass('open');
      state = false;
    }
  });

  //製品検索ボタンクリック後にSPメニューを非表示にする
  $('.ip_submit01').on('click', function(){
    if(state == false) {
      scrollpos = $(window).scrollTop();
      $('body').removeClass('fixed').css({'top': 0});
      $('.menu01').removeClass('open');
      state = true;
    } else {
      scrollpos = $(window).scrollTop();
      $('body').removeClass('fixed').css({'top': 0});
      $('.menu01').removeClass('open');
      state = false;
    }
  });

});

//ページ内リンク調整
$(function(){
var headerHeight = 130;
var urlHash = location.hash;
if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function(){
        var target = $(urlHash);
        var position = target.offset().top - headerHeight;
        $('body,html').stop().animate({scrollTop:position}, 500);
    }, 100);
}
$('a[href^="#"]').click(function() {
    var href= $(this).attr("href");
    var target = $(href);
    var position = target.offset().top - headerHeight;
    $('body,html').stop().animate({scrollTop:position}, 500);
});
});

//SPヘッダ高さ調整
$.fn.fixedHeaderAdjuster = function(options){
  'use strict';
  options = $.extend({
    property: 'padding-top',  // 固定ヘッダーと同じ値にするプロパティ名
    target: '#mainSecond', // プロパティを調整する要素
    adjust: 0,      // プロパティの値を adjust 分加算
  }, options);
  var $this = $(this),
      $target = $(options.target),
      initial = $this.css(options.property);

  update();
  $(window).on('resize load', update);

  function update(){
    var v;
    if($this.css('position') === 'fixed'){
      v = $this.outerHeight() + options.adjust + 'px';
    }else{
      v = initial;
    }
    $target.css(options.property, v);
  }
};

$(function(){
  $('.headerScond').fixedHeaderAdjuster();
});

/* accordion */
$(function(){
     $(".ac_content01 dt").on("click", function() {
         $(this).next().slideToggle();
         $(this).toggleClass("active");
     });
 });

$(function(){
     $(".ac_content02 dt").on("click", function() {
         $(this).next().slideToggle();
         $(this).toggleClass("active");
     });
 });

 $(function(){
  $(".ac_content03 dt").on("click", function() {
      $(this).next().slideToggle();
      $(this).toggleClass("active");
  });
});
 // 分野別
 $(function(){
  $(".ac_case01 dt").on("click", function() {
      $(this).next().slideToggle();
      $(this).toggleClass("active");
  });
});


$(window).on('load resize',function(){
  var wh = $(window).height();
  if (wh < 810) {
      $('#fixside01').css({'top':'410px'});
  } else {
      $('#fixside01').css({'top':'50%'});
  }
});
