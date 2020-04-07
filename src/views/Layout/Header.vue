<template>
  <header>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div class="sys-name">招投标信息发布平台</div>
    
    <div class="user" v-if="JSON.stringify(user) !== '{}'">
        <el-popover
          title="请设置消息推送周期！"
          placement="bottom"
          width="300"
          trigger="click">
          <label for="">周期: </label>
          <el-select v-model="booking_circle" placeholder="请选择" @change="change">
            <el-option
              v-for="item in booking_option"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <span slot="reference">订阅</span>
      </el-popover>

      <span class="cancel-subscription" @click="cancel">取消订阅</span>
      <label>您好：{{ name }}</label>
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
.el-select{
  width: 120px;
  height: 30px;
  .el-input__inner{
    line-height: 30px;
    height: 30px;
  }
  .el-input__icon{
    line-height: 30px;
  }
}



</style>

<script>
import { getUser,setUser } from "@/utils/user";
import { subscription } from "@/api/User.js"
export default {
  name: 'layoutHeader',
  data() {
    return {
      name: "请登录",
      booking_circle: null,
      user: {},
      booking_option: [ '每天', '每两天','每三天', '每四天', '每五天', '每六天', '每七天']
    };
  },
  mounted() {
    this.initUser();
  },
  methods: {
    getTime(){
      var date=new Date();
      var year=date.getFullYear();
      var month=date.getMonth();
      var day=date.getDate();
      var hour=date.getHours();
      var minute=date.getMinutes();
      var second=date.getSeconds();
      if (hour<10) {
        hour='0'+hour;
      }
      if (minute<10) {
        minute='0'+minute;
      }
      if (second<10) {
        second='0'+second;
      }
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    formatDate(value){
      var booking_circle = 24;
      switch(value){
        case "每天":
          booking_circle = 24;
          break;
        case "每两天":
          booking_circle = 48;
          break;
        case "每三天":
          booking_circle = 72;
          break;
        case "每四天":
          booking_circle = 96;
          break;
        case "每五天":
          booking_circle = 120;
          break;
        case "每六天":
          booking_circle = 144;
          break;
        case "每七天":
          booking_circle = 168;
          break;
      }
      return booking_circle;
    },

    async change(value){
      var params = new Object();
      params.email = this.user.email;
      params.booking_circle = this.formatDate(value);
      params.booking_time = this.getTime();
      const res = await subscription(params);
      if(res){
        setUser(res);
        this.$message.success('订阅成功！');
      }else{
        this.$message.success('订阅失败！');
      }
    },
    async cancel(){
      var params = new Object();
      params.email = this.user.email;
      params.booking_circle = 0;
      params.booking_time = this.getTime();
      const res = await subscription(params);
      if(res){
        setUser(res);
        this.$message.success('已经取消订阅！');
      }else{
        this.$message.success('取消失败！');
      }
    },
    initUser() {
      const user = getUser();
      if (user != false) {
        this.user = user;
        this.name = user.name;
        this.booking_circle = this.booking_option[(Number(user.booking_circle) /24) -1];
      }
    },

  }
};
</script>