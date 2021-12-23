<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: false,
      timer: null,
      surplusTime: 7200,
    }
  },
  created() {
    this.clearLocal()
  },
  methods: {
    clearLocal() {
      let _self = this
      if (_self.interval) {
        return false
      }
      _self.interval = true
      _self.timer = setInterval(() => {
        if (_self.surplusTime == 0) {
          _self.surplusTime = 7200
          _self.interval = false
          localStorage.clear()
          this.$router.push('/')
          clearInterval(_self.timer)
        } else {
          _self.surplusTime--
        }
      }, 1000)
    },
  },
}
</script>