<template>
  <div>
    <h3>订阅后，系统会定期推送招投标信息至您的邮箱</h3>

    <el-form ref="bookingForm" label-width="70px">
      <p class="title">订阅周期</p>
      <el-select v-model="bookingCircle" placeholder="请选择">
        <el-option v-for="day in 15" :key="day" :label="day + '天'" :value="day * 24"></el-option>
      </el-select>

      <p class="title">招投标类型</p>
      <el-checkbox-group v-model="bookingTypes">
        <el-checkbox v-for="(val, key) in BID_TYPE_CN" :label="key" :key="key">{{ key }}</el-checkbox>
      </el-checkbox-group>

      <p class="title">区域</p>
      <el-checkbox-group v-model="bookingRegions">
        <el-checkbox v-for="region in REGIONS" :label="region" :key="region">{{ region }}</el-checkbox>
      </el-checkbox-group>

      <el-button size="mini" type="primary" style="margin-top: 20px;" @click="booking">订阅</el-button>
    </el-form>
  </div>
</template>

<script>
import { REGIONS, BID_TYPE_CN, IT_LEVELS } from "@/utils/const";
import { genUserParams } from "@/store/modules/user";
import { updateUserApi } from "@/api/User.js";

export default {
  props: {
    drawerShow: { type: Boolean, default: false }
  },
  data() {
    return {
      REGIONS,
      BID_TYPE_CN,
      IT_LEVELS
    };
  },
  computed: {
    bookingTypes: {
      get: function() {
        return this.$store.state.user.booking_types;
      },
      set: function(val) {
        this.$store.commit("SET_BOOKING_TYPES", val);
      }
    },
    bookingRegions: {
      get: function() {
        return this.$store.state.user.booking_regions;
      },
      set: function(val) {
        this.$store.commit("SET_BOOKING_REGIONS", val);
      }
    },
    bookingCircle: {
      get: function() {
        return this.$store.state.user.booking_circle;
      },
      set: function(val) {
        this.$store.commit("SET_BOOKING_CIRCLE", val);
      }
    }
  },
  methods: {
    async booking() {
      if (this.bookingCircle == "") {
        this.$message.error("请选择订阅周期");
        return;
      }
      if (this.bookingRegions.length == 0) {
        this.$message.error("请至少选择一个区域");
        return;
      }
      if (this.bookingTypes.length == 0) {
        this.$message.error("请至少选择一种订阅类型");
        return;
      }

      let params = genUserParams(this.$store.state.user);
      params.booking_time = this.getTime()
      const res = await updateUserApi(params);
      if (res) this.$message("订阅成功");
    },
    getTime() {
      var date = new Date();
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mi = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return `${y}-${m}-${d} ${h}:${mi}:${s}`;
    }
  }
};
</script>