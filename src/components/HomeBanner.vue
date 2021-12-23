<template>
  <div class="banner_box">
    <swiper ref="mySwiper" class="swiper_box" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in data" :key="index">
        <img class="img" :src="item" alt="">
      </swiper-slide>
    </swiper>
    <!-- <div class="swiper-pagination"></div> -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: true,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        // },
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner_box
  position relative
  .swiper-pagination
    position: absolute
    bottom 0
    left 50%
    /deep/ .swiper-pagination-bullet
      background $white
  .swiper-button-prev, .swiper-button-next
    width 30px
    height 60px
  .swiper_box
    width 100%
    .swiper-slide
      width 100%
      height 768px
      .img
        width 100%
        height 100%
        object-fit cover
        z-index 1
</style>