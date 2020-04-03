<template>
  <div class="home">
    <div class="data-list">
      <DataItem
        v-for="data in dataList"
        :key="data.id"
        :id="data.id"
        :title="data.title"
        :region="data.region"
        :institution="data.institution"
        :href="data.url"
        :relation="data.relation"
        :type="data.bid_type"
        :publicDate="data.public_date"
        :role="'1'"
        @changeRelation="changeRelation"
      />
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-size="pagination.page_size"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>

<style lang="scss">
@import './home.scss';
</style>

<script>
// @ is an alias to /src
import DataItem from "./components/DataItem";
import { getListApi, editeLabelApi } from "@/api/List.js";
import request from "@/utils/request";

export default {
  name: "Home",
  data() {
    return {
      dataList: [],
      pagination: {
        page: 1,
        page_size: 10
      }
    };
  },
  components: {
    DataItem
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      var params = {
        page: this.pagination.page,
        page_size: this.pagination.page_size
      };
      const res = await getListApi(params);
      this.pagination.total = res.total;
      this.dataList = res.data;
      for (var i = 0; i < this.dataList.length; i++) {
        if (
          this.dataList[i]["relation"] === "" ||
          this.dataList[i]["relation"] === "否"
        ) {
          this.dataList[i]["relation"] = false;
        } else {
          this.dataList[i]["relation"] = true;
        }
        if (this.dataList[i]["grade"] === "") {
          this.dataList[i]["grade"] = "初级";
        }
      }
    },
    changeRelation(data) {
      console.log("emited ", data);
    }
  }
};
</script>
