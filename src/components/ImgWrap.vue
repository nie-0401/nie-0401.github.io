<template>
  <swiper ref="mySwiper" class="swiper_box" :options="swiperOptions">
    <swiper-slide v-for="(item, index) in data" :key="index">
      <img class="img" :src="item" alt="" @click="lookImgFun(item)">
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'ImgWrap',
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
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false,
        },
      },
    }
  },
  methods: {
    lookImgFun(item) {
      this.$emit('lookImg', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper_box
    width 100%
    padding 40px 20px
    .swiper-slide
        width 360px
        height 340px
        position relative
        box-shadow 0px 2px 20px 0px rgba(0, 0, 0, 0.1)
        border-radius 8px
        transition all .15s
        cursor pointer
        &.swiper-slide-active,.swiper-slide-duplicate-active
            transform scale(1.1)
            z-index 9999
        .img
          width 100%
          height 100%
          object-fit cover
          z-index 1
</style>
