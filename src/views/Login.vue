<template>
  <div class="login">
    <div class="login_box">
      <div style="flex:1;">
        <el-form :model="userForm" :rules="rules" ref="userForm">
          <el-form-item prop="userName">
            <el-input v-model="userForm.userName" placeholder="userName" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="userForm.passWord" type="password" placeholder="passWord" maxlength="10" @keyup.enter.native="signin"></el-input>
          </el-form-item>
        </el-form>
        <div class="login_button"><el-button class="btn" :disabled="disabledFun" @click="signin" type="primary">登录</el-button></div>
      </div>
    </div>
  </div>
</template>
<script>
import { user } from "@/utils/config";
export default {
  data() {
    return {
      userForm: {
        userName: '',
        passWord: ''
      },
      disabledFun: true,
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            validator:(rule,value,callback)=>{
              if(this.$noZhReg(value)){
                callback('禁止输入中文和空格!')
              }else{
                callback()
              }
            }, trigger: 'change'
          }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  computed:{
    disableFun(){
      let user = this.userForm.userName
      let pass = this.userForm.passWord
      return { user,pass }
    },
  },
  watch:{
    disableFun(val) {
        if(val.user && val.pass) {
          this.disabledFun = false
        }
    }
  },
  created() {
    if (this.userForm.userName && this.userForm.passWord) {
      this.disabledFun = false
    }
  },
  methods:{
    signin() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          let userInfo = user.filter( value => this.userForm.userName == value.userName)
          if (userInfo&&this.userForm.passWord == userInfo[0].passWord) {
            this.$store.commit('setRole',userInfo[0].role)
            this.$store.commit('setName',userInfo[0].userName)
            this.$router.push('/website')
          } else {
            this.$message.error('账号/密码有误');
          }
        }
      })
    }
  }
  
}
</script>
<style lang="stylus" scoped>
.login
  height 100vh
  width 100vw
  position relative
  background-repeat no-repeat
  background-size cover
  background-position center center
  background-image url('../assets/images/list/img3.png')
  overflow hidden
  .login_box
    width 400px
    padding 50px
    // background rgba(255, 255, 255, 0.1)
    border-radius 4px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    display flex
    align-items center
    .login_button
      margin-top 40px
      display flex
      justify-content center
      /deep/ .el-button.el-button--primary.is-disabled
        background $fontSub2
        box-shadow 0px 2px 8px 0px rgba(153, 153, 153, 0.5)
        border-color $fontSub2
      .btn
        width 240px
        box-shadow 0px 2px 8px 0px rgba(31, 123, 255, 0.5)
        border-radius 30px !important
        margin-top 0
</style>
