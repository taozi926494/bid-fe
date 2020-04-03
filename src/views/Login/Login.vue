<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-width="75px"
      class="login-form"
    >
      <div class="login-form-title">登录</div>
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
      <el-button type="primary" size="small" @click="login">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { loginApi } from "@/api/User";
import { setUser } from "@/utils/user";
export default {
  name: "login",
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
        password: ""
      },
      loginRules: {
        email: [{ required: true, validator: validNumber }],
        password: [{ required: true, validator: validNumber }]
      }
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          const params = {
            email: this.loginForm.email + '@qq.com',
            password: this.loginForm.password
          };
          const data = await loginApi(params);
          setUser(data);
          for (const child of this.$parent.$children) {
            if (child.initUser) {
              child.initUser();
            }
          }
          this.$router.push({ path: "/" });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  @include flex(column);
  .login-form {
    @include shadow-card;
    padding: 40px 20px;
    width: 500px;

    &-title {
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 20px;
    }
  }
}
</style>