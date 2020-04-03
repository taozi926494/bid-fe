<template>
  <header>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div class="sys-name">招投标信息发布平台</div>
    <div class="user">您好：{{ name }}</div>
  </header>
</template>

<style lang="scss">
header {
  @include flex(row, flex-start);
  padding: 30px;
  width: 100%;
  height: 60px;
  color: white;
  background-color: $color-main-dark;
  img {
    height: 25px;
    margin-right: 10px;
  }
  .sys-name {
    font-size: 20px;
    font-weight: bolder;
  }
  .user {
    flex: 1;
    text-align: right;
  }
}
</style>

<script>
import { getUser } from "@/utils/user";
export default {
  name: 'layoutHeader',
  data() {
    return {
      name: "请登录"
    };
  },
  mounted() {
    this.initUser();
  },
  methods: {
    initUser() {
      const user = getUser();
      if (user != false) {
        this.name = user.name;
      }
    }
  }
};
</script>