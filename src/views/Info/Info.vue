<template>
  <div class="container">
    <div class="info">
      <h2 class="title">{{ data.title }}</h2>
      <p class="tip">
        发布时间：
        <span class="pubTime">{{ data.public_date }}</span>
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
