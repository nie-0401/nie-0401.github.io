<template>
    <div class="website_page_box">
        <Header v-if="isPt"></Header>
        <div class="website_content_box" :class="{ 'ptClass' : isPt }">
            <router-view></router-view>
        </div>
        <BackTop></BackTop>
        <Footer v-if="isPt"></Footer>
    </div>
</template>
<script>
import { Header, Footer } from './components'
import { BackTop } from '@/components'
export default {
    components:{ Header, Footer, BackTop },
    computed: {
        isPt() {
            return this.$store.getters.headerShow
        }
    }
}
</script>
<style lang="stylus" scoped>
.website_page_box
    width 100%
    .ptClass
       padding-top 60px 
    .website_content_box
        min-height: 100vh
</style>