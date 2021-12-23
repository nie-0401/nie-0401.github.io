<template>
    <div class="footer_box">
        <div class="content">
            <div class="welcome_box flex_all">Welcome To My Web</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="stylus" scoped>
.footer_box
    background #102866
    width 100%
    position relative
    overflow hidden
    &:before
        content "";
        border 133px solid transparent
        border-left 133px solid rgba($white,0.05)
        border-bottom 133px solid rgba($white,0.05)
        position absolute
        left 0
        bottom 0
    .content
        display flex
        width: 600px
        margin 0 auto
        padding 80px 0
        justify-content: space-between
        .welcome_box
            width 100%
            font-size 40px
            color $white
            font-weight 600
            font-family TitleBlack
</style>