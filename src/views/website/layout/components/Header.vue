<template>
  <div class="header_wrap" ref="header" :class="{ 'header_bg': headerBg }">
    <div class=" header_box">
      <div class="logo_box" @click="$router.push('/website')">
        <img class="logo" :src="logoUrl" alt="">
        <div class="logo_name">My Web</div>
      </div>
      <div class="nav_box">
        <router-link v-for="(item,index) in websiteMenu" :class="{'cur':$route.meta.activeUrl&&'/website/'+item.path==$route.meta.activeUrl}" :to="{path:'/website/'+item.path}" :key="index" class="nav_li">
          <span>{{item.meta.title}}</span>
        </router-link>
      </div>
      <div class="user_message">
        <div class="user_box" v-if="roles">
            <div class="avatar_item">
                <div class="avatar">
                    <img :src="logoUrl" alt="">
                </div>
                <div class="name">{{name}}</div>
            </div>
            <div class="menu_box">
                <a href="javascript:;" class="item" @click="signOut">退出登录</a>
            </div>
        </div>
        <div class="no_login" v-else>
          <router-link class="btn" to="/login">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return { }
  },
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    name() {
      return this.$store.getters.userName
    },
    headerBg() {
      return this.$store.getters.headerShow
    },
    logoUrl() {
        return require('@/assets/images/logo.png')
    },
    websiteMenu() {
      let websiteMenu = this.$store.getters.websiteMenu
      let data = websiteMenu.filter(item=>{
        return item.name=='website'
      })
      if(data&&data.length){
        let rdata = data[0].children.filter(ritem=>{
          return ritem
        })
        return rdata
      }else{
        return []
      }
    },
  },
  methods:{
    signOut() {
        this.$store.dispatch('signOut').then(()=>{
            this.$router.push({
                path:'/login'
            })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.header_bg
  background rgba(#0B1842, 1)
.header_wrap
  width 100%
  min-width 1000px
  height 60px
  // background rgba(#0B1842, 1)
  position fixed
  top 0
  left 0
  z-index 199
  .container
    min-width 700px
  .header_box
    height 100%
    position relative
    text-align right
    padding 0 82px
    min-width 1200px
    display flex
    align-items center
    .logo_box
      height 40px
      position absolute
      top 10px
      left 82px
      display flex
      align-items center
      .logo
        height 40px
        width auto
        cursor pointer
        margin-right 16px
        border-radius: 50%
      .logo_name
        font-size 14px
        line-height 20px
        color $white
    .nav_box
      flex 0 0 auto
      text-align left
      margin-left auto
      .nav_li
        display inline-block
        vertical-align middle
        font-size: 14px;
        color: rgba($white,.6)
        line-height 20px
        padding 20px 0
        position relative
        cursor pointer
        transition all .2s
        &:hover
          color $white
        &+.nav_li
          margin-left 40px
        &.cur,&.router-link-active
          color $white
          &::after
            content ""
            height 4px
            width 4px
            border-radius 50%
            background $white
            position absolute
            bottom 10px
            left 50%
            transform translateX(-50%)
    .user_message
      flex 0 0 auto
      text-align right
      margin-left auto
      margin-left 62px
      color $white
      .no_login
        display flex
        align-items center
        .btn
          flex 0 0 auto
          font-size 14px
          line-height 20px
          padding 3px 8px
          border-radius 4px
          background $main
        .text_btn
          flex 0 0 auto
          font-size 14px
          line-height 20px
          margin-left 8px
      .user_box
          padding 14px 16px
          cursor pointer
          position relative
          z-index 10
          padding-right 55px
          .avatar_item
              display flex
              align-items center
              .avatar
                  width 32px
                  height 32px
                  border-radius 50%
                  // background rgba($main,.1)
                  margin-right 8px
                  overflow hidden
                  img
                      object-fit cover
                      width 100%
                      height 100%
              .name
                  font-size 14px
                  line-height 20px
                  position relative
                  &::before
                      content ''
                      width 0
                      height 0
                      border-left 3.5px solid transparent
                      border-right 3.5px solid transparent
                      border-top 5px solid currentColor
                      position absolute
                      right -18px
                      top 50%
                      transform translateY(-50%)
          .menu_box
              width 120px
              text-align left
              position absolute
              top 50px
              right 0
              background $white
              box-shadow: 0 2px 8px 0 rgba(#000,0.2)
              border-radius: 2px
              height 0
              padding 0
              overflow hidden
              transition all 0.15s ease
              .item
                  font-size 14px
                  line-height 20px
                  padding 10px 15px
                  color $fontSub2
                  cursor pointer
                  display block
                  &:hover
                      color $main
                      background rgba($main,0.03)
          &:hover
              .menu_box
                  height auto
                  padding 5px 0
</style>