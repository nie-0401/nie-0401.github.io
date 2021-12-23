<template>
  <div class="home">
    <div class="welcome_page" v-if="welcomeShow">
      <video src="@/assets/images/welcome2.mp4" class="video" muted autoplay width="100%" preload loop></video>
      <div class="wel_box">
        <div class="welcome">Welcome To My Web</div>
        <div class="button_box mt20" @click="goHomeFun">点击进入</div>
      </div>
    </div>

    <div class="home_wrap" v-else>
      <Banner :data="ImgList"></Banner>
      <div class="welcome_box container flex_all">Welcome To My Web</div>
      <div class="other_wrap"></div>
      <div class="img_wrap">
        <div class="container">
          <HomeTitle zh="图片" en="IMAGE LIST"></HomeTitle>
          <ImgWrap :data="ImgList" @lookImg="lookFun"></ImgWrap>
          <div class="look_more"><router-link to="/website/image" class="more_button">查看更多</router-link></div>
        </div>
      </div>
      <div class="study_box">
        <div class="container">
          <HomeTitle zh="资料" en="STUDY MATERIALS"></HomeTitle>
          <ul class="study_list">
            <li v-for="(item, index) in studyList" :key="index" class="study_item flex_ai text_hidden">{{ index+1 }}. {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Banner, ImgWrap, HomeTitle } from "@/components";
import { homeImgList, homeStudyList } from "@/utils/config";
export default {
  components: {
    Banner,
    ImgWrap,
    HomeTitle
  },
  data() {
    return {
      ImgList: homeImgList,
      welcomeShow: !localStorage.getItem("headerShow"),
      studyList: homeStudyList
    }
  },
  methods: {
    goHomeFun() {
      this.welcomeShow = !this.welcomeShow
      this.$store.commit('setHeaderShow', true)
    },
    lookFun(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="stylus" scoped>
.home
  width 100%
  min-width 1300px
  position relative
  .chert_num
    font-size 20px
    font-weight 600
    font-family BEBAS
  .welcome_page
    width 100%
    height 100vh
    position relative
    .wel_box
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      .welcome
        font-size 40px
        font-weight 600
        font-family TitleBlack
        color $white
      .button_box
        font-size 30px
        font-weight 600
        font-family TitleBlack
        color $white
        text-align center
        cursor pointer
        -webkit-animation-name scaleDraw
        -webkit-animation-timing-function ease-in-out
        -webkit-animation-iteration-count infinite
        -webkit-animation-duration 5s
      @keyframes scaleDraw
        0%
          transform scale(1)
        25%
          transform scale(.8)
        50%
          transform scale(1)
        75%
          transform scale(.8)
    .video
      width 100%
      height 100%
      background-position center center
      background-repeat no-repeat
      background-size cover
      display block
      object-fit cover
  .welcome_box
    height 375px
    width 100%
    box-shadow 0px 2px 20px 0px rgba(0, 0, 0, 0.08)
    border-radius 8px
    margin-top 50px
    font-size 40px
    font-weight 600
    font-family TitleBlack
  .other_wrap
    width 100%
    height 743px
    background-repeat no-repeat
    background-size cover
    background-position center center
    background-image url('../../assets/images/list/img2.png')
    overflow hidden
    margin-top 50px
  .img_wrap
    width 100%
    height 743px
    padding-top 60px
    background $bg
    .look_more
      width 100%
      display flex
      justify-content center
      margin-top 40px
      .more_button
        width 144px
        height 45px
        background $white
        border-radius 23px
        border 1px solid $main
        font-size 16px
        font-weight 500
        color $main
        line-height 45px
        text-align center
        cursor pointer
  .study_box
    width 100%
    height 100%
    background $white
    padding 60px 0
    .study_list
      width 100%
      max-height 768px
      overflow auto
      .study_item
        height 50px
        margin 10px
        padding 0 20px
        background $bg
        border-radius 4px
        color $fontMain
        cursor pointer
        &:hover
          color $main
</style>
