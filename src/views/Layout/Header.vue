<template>
  <header>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div class="sys-name">招投标信息发布平台</div>
    
    <div class="user">
      <label>您好：{{ email }}</label>
    </div>
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
    span{
      cursor: pointer;
    }
    .cancel-subscription{
      margin: 0px 40px 0px 10px;
      cursor: pointer;
    }

  }
}

</style>

<script>
import { getUser,setUser } from "@/utils/user";
import { subscription } from "@/api/User.js"
export default {
  name: 'layoutHeader',
  computed: {
    email: function() {
      return this.$store.state.user.email
    }
  },
};
</script>