<template>
    <div class="back_wrap" v-show="scrollTag" @click="backFun" ref="back" :style="{'right': width + 'px'}">
        <img class="img" src="../assets/images/back_top.png" alt="">
        <img class="img hover"  src="../assets/images/back_top_hover.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'BackTop',
    data(){
        return {
            scrollTag: false,
        }
    },
    computed: {
        width(){
            return 20
        },
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        document.removeEventListener('scroll', this.handleScroll)
        document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    methods: {
        backFun() {
            let top = document.documentElement.scrollTop || document.body.scrollTop
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 100
                if (top <= 0) {
                    this.scrollTag = false
                    clearInterval(timeTop)
                }
            }, 10)
            // document.body.scrollTop = document.documentElement.scrollTop = 0
            this.scrollTag = false
        },
        handleScroll() {
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            let height = document.documentElement.clientHeight
            if ( top > height/2 ) {
                this.scrollTag = true;
            } else {
                this.scrollTag = false
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.back_wrap
    width 50px
    height 50px
    border-radius 50%
    box-shadow 0px 0px 10px 0px rgba(0, 0, 0, 0.2)
    cursor pointer
    position fixed
    bottom 60px
    z-index 999999
    transition all .15s
    .img
        width 100%
        height 100%
        opacity 1
        &.hover
            display none
    &:hover
        .img
            display none
        .hover
            display block
</style>