'use strict'

var productCarouselMainThumb = new Swiper('.js-carousel-thumb', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 2,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

var productCarouselMain = new Swiper('.js-carousel-main', {
  loop: true,
  navigation: {
    nextEl: '.js-carousel-arrow-next',
    prevEl: '.js-carousel-arrow-prev',
  },
  spaceBetween: 0,
  thumbs: {
    swiper: productCarouselMainThumb
  }
})

var productCarouselMainThumbSp = new Swiper('.js-carousel-thumb-sp', {
  spaceBetween: 8,
  slidesPerView: 3,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

var productCarouselMainSp = new Swiper('.js-carousel-main-sp', {
  loop: true,
  navigation: {
    nextEl: '.js-carousel-arrow-next-sp',
    prevEl: '.js-carousel-arrow-prev-sp',
  },
  spaceBetween: 0,
  thumbs: {
    swiper: productCarouselMainThumbSp
  }
})
