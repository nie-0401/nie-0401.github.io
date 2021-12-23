<template>
  <div class="title">
    <div class="en">{{en}}<div class="zh">{{zh}}</div></div>
  </div>
</template>

<script>
export default {
  name: 'HomeTitle',
  props: {
    en: {
      type: String,
      default: () => '',
    },
    zh: {
      type: String,
      default: () => '',
    },
  },

}
</script>

<style lang="stylus" scoped>
.title
  width 100%
  height 90px
  margin-bottom 45px
  font-size: 20px
  .en
    font-size 60px
    font-weight 900
    color rgba(51, 51, 51, 0.06)
    line-height 90px
    text-align center
    position relative
    .zh
      width 100%
      position absolute
      top 41px
      font-size 40px
      font-weight 500
      color $fontMain
      line-height 50px
      text-align center
</style>