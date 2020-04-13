<template>
  <div class="home">
    <!-- 筛选 -->
    <FilterBar @filterChange="getData" />

    <!-- 数据列表 -->
    <div class="data-list" v-if="dataList.length > 0">
      <DataItem
        v-for="data in dataList"
        :key="data.id"
        :id="data.id"
        :title="data.title"
        :region="data.region"
        :institution="data.institution"
        :href="'#/detail?uuid='+data.id"
        :relation="data.relation"
        :type="data.bid_type"
        :publicDate="data.public_date"
        :role="role"
        :grade="data.grade"
        @dataItemChange="updateDataItem"
      />
    </div>
    <div class="data-list" v-else>
      <h3>无数据...</h3>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>

    <div class="order-btn" @click="drawerShow = true">
      <i class="el-icon-circle-plus"></i>
      邮件订阅
    </div>
    <el-drawer :visible.sync="drawerShow" :show-close="false" direction="ltr" class="drawer">
      <BookingDrawer :drawerShow.sync="drawerShow" />
    </el-drawer>
  </div>
</template>

<style lang="scss">
@import "./home.scss";
</style>

<script>
// @ is an alias to /src
import DataItem from "./components/DataItem";
import FilterBar from "./components/FilterBar";
import BookingDrawer from "./components/BookingDrawer";

import { editeLabelApi, listDataApi } from "@/api/List.js";
import { getUser } from "@/utils/user.js";
import { genFilterParams } from "@/store/modules/filter";

export default {
  name: "Home",
  data() {
    return {
      dataList: [],
      drawerShow: false
    };
  },
  components: {
    DataItem,
    FilterBar,
    BookingDrawer
  },
  computed: {
    page: {
      get: function() {
        return this.$store.state.filter.page;
      },
      set: function(val) {
        this.$store.commit("SET_PAGE", val);
      }
    },
    total: {
      get: function() {
        return this.$store.state.filter.total;
      },
      set: function(val) {
        this.$store.commit("SET_TOTAL", val);
      }
    },
    pageSize: {
      get: function() {
        return this.$store.state.filter.page_size;
      }
    },
    role: function() {
      return this.$store.state.user.role;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      const params = genFilterParams(this.$store.state.filter);
      const res = await listDataApi(params);
      this.total = res.total;
      this.dataList = res.data;
    },

    // 分页
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getData();
    },

    // 编辑标签或者相关性监听函数
    async updateDataItem(data) {
      const res = await editeLabelApi(data);
      if (res.data == "ok") {
        this.getData();
        this.$message.success("修改成功");
      }
    }
  }
};
</script>
