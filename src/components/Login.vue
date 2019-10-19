<template>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-form login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="userId">
      <el-input v-model="loginForm.userId" placeholder="账号" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="密码" auto-complete="off"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {userLogin} from '../api/api';
export default {
  name: 'Login',
  data(){
    return {
      loading: false,
      loginForm: {
        userId: 'admin',
        password: '123456'
      },
      loginRules: {
        userId: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: 'blur'}
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(ev){
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.loading = true;
          let param = Object.assign({}, this.loginForm);
          userLogin(param).then(data => {
            this.loading = false;
            let {code, msg, user} = data;
            if(code !== 200){
              this.$message({
                message: msg,
                type: 'error'
              });
            }else{
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push({ path: '/index' });
            }
          });
        }else{
          console.log("登录失败");
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
      /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 180px auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
  }
</style>
