<template>
  <div class="home">
    <!-- 数据列表 -->
    <div class="data-list">
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
        :role="user.role"
        :grade="data.grade"
        @changeRelation="changeRelation"
      />
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-size="pagination.page_size"
      :total="pagination.total"
    ></el-pagination>
    </div>
    
  </div>
</template>

<style lang="scss">
@import './home.scss';
</style>

<script>
// @ is an alias to /src
import DataItem from "./components/DataItem";
import { getListApi, editeLabelApi } from "@/api/List.js";
import { getUser } from "@/utils/user.js";

export default {
  name: "Home",
  data() {
    return {
      dataList: [],
      user: {},
      pagination: {
        page: 1,
        page_size: 8,
        total: 0
      }
    };
  },
  components: {
    DataItem
  },
  mounted() {
    this.user = getUser();
    this.getData();
  },
  methods: {
    // 获取数据
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

    // 分页
    handleCurrentChange(currentPage) { 
      this.pagination.page = currentPage;
      this.getData();
    },

    // 编辑标签或者相关性的实现函数
    async editLabel(id, value) {
      // 声明参数
      var params;
      // 判断数据类型, 如果是布尔类型, 则更新的是相关性字段
      if(value instanceof Boolean){
        params = {
          id: Number(id),
          relation: value?"是":"否",
          grade: ''
        }
      } else {
        // 更新发展阶段字段
        params = {
          id: Number(id),
          relation: "是",
          grade: value
        } 
      }
      // 向后端发起请求实现更新
      const res = await editeLabelApi(params);
      if(res.data == "ok") {
        this.$message.success('修改成功');
      }
    },
    
    // 编辑标签或者相关性监听函数
    changeRelation(data) {
      this.editLabel(data.id, data.relationData);
    }
  }
};
</script>
