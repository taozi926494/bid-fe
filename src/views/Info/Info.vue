<template>
  <div class="container">
    <div class="info">
      <h2 class="title">{{ data.title }}</h2>
      <p class="tip">
        发布时间：
        <span class="pubTime">{{ data.public_date | formatTime}}</span>
        来源：
        <span class="sourceName">{{ data.institution }}</span>
        <span><a :href="data.url" target="_blank">查看原文</a></span>
      </p>
      <Summary :summaryDict="summary" />
      <div class="text">
        <h5>原文内容：</h5>
        <p>{{data.text}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import Summary  from './components/Summary';
import { getInfoApi } from '@/api/Info.js'
export default {
  name: "Info",
  components: {
    Summary
  },
  data() {
    return {
      summary: null,
      data: {},
    }
  },
  mounted() {
    this.getData();
  },
  filters: {
    formatTime(enTime){
      var date = new Date(enTime+"+0800");
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return `${y}-${m}-${d} ${h}:${mi}:${s}`;
    }
  },
  methods:{
    async getData(){
      var params = {
        id: this.$route.query.uuid
      }
      const data = await getInfoApi(params);
      this.data = data;
      this.summary = JSON.parse(data.meta);
    }
  }
};
</script>

<style lang="scss">
  @import "./Info.scss" 
</style>
