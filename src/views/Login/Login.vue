<template>
  <div id="layout">
    <Header />
    <div id="login">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="75px"
        class="login-form"
      >
        <div class="login-form-title" v-if="loginForm.login_type === 'login'">登录</div>
        <div class="login-form-title" v-else>注册</div>

        <el-form-item label="QQ邮箱" prop="email">
          <el-input type="text" v-model="loginForm.email" autocomplete="off">
            <template slot="append">@qq.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="工号" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            @keydown.enter.native="login"
          ></el-input>
        </el-form-item>
        
        <div class="login-form-bottom">
          <el-button type="primary" size="small" @click="login">提交</el-button> 
          <div class="tips" v-if="loginForm.login_type === 'login'" @click="loginForm.login_type = 'register'">没有账号？去注册 >>> </div>
          <div class="tips" v-else @click="loginForm.login_type = 'login'">已有账号？去登录 >>> </div>
        </div>
      </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { loginApi } from "@/api/User";
import { setToken, setEmail, setPassword } from "@/utils/auth";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export default {
  name: "login",
  components: {
    Header,
    Footer
  },
  data() {
    var validNumber = (rule, value, callback) => {
      const exp = new RegExp(/^\d+$/);
      if (value === "") {
        callback(new Error("必填项"));
      } else {
        if (exp.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
        login_type: 'login'
      },
      loginRules: {
        email: [{ required: true, validator: validNumber }],
        password: [{ required: true, validator: validNumber }]
      }
    };
  },
  computed: {
    email: function() {
      return this.loginForm.email + "@qq.com";
    }
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          const params = {
            email: this.email,
            password: this.loginForm.password,
            login_type: this.loginForm.login_type
          };
          const res = await loginApi(params);
          if (res) {
            setToken(res.token);
            setEmail(this.email);
            setPassword(this.loginForm.password);
            this.$router.push({ path: "/" });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
#login {
  @include flex(column);
  flex: 1;
  .login-form {
    @include shadow-card;
    padding: 40px 20px;
    width: 500px;

    &-title {
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 20px;
    }

    &-bottom {
      position: relative;
      .tips {
        position: absolute;
        float: right;
        top: 10px;
        right: 0;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>