<template>
  <div class="data-item">
    <a class="data-item-title" :href="href" target="_blank">{{ title }}</a>
    <div class="data-item-info">
      <span>
        <label>类型：</label>
        {{ bidTypeDict[type] }}
      </span>
      <span>
        <label>发布时间：</label>
        {{ publicDate }}
      </span>
      <span>
        <label>地域：</label>
        {{ region }}
      </span>
      <span>
        <label>采购人：</label>
        {{ institution }}
      </span>
    </div>
    <!-- 添加标签模块 -->
    <div class="data-item-label" v-show="role=='1'?true:false">
      <span>
        <label>相关性：</label>
        <el-switch
          v-model="relationData"
          active-text="是"
          inactive-text="否"
          @change="changeRelation({id, relationData})"
        ></el-switch>
      </span>
      <span class="label-grade" v-show="relation">
        <label>发展阶段：</label>
        <el-select
          v-model="gradeData"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in labelGradeOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, default: "" },
    href: { type: String, default: "" },
    title: { type: String, default: "" },
    type: { type: String, default: "" },
    publicDate: { type: String, default: "" },
    region: { type: String, default: "" },
    institution: { type: String, default: "" },
    role: { type: String, default: "0" },
    grade: { type: String, default: "0" },
    relation: {}
  },
  data() {
    return {
      relationData: this.relation,
      gradeData: this.grade,
      bidTypeDict: {
        "974": "公开招标",
        "975": "询价公告",
        "978": "竞争性谈判",
        "977": "单一来源",
        "979": "资格预审",
        "976": "邀请公告",
        "982": "中标公告",
        "981": "更正公告",
        "990": "其他公告",
        "984": "其他公告",
        "985": "其他公告",
        "2653": "竞争性磋商",
        "2655": "成交公告",
        "2656": "废标终止",
        "998": "公开招标",
        "997": "询价公告",
        "1000": "竞争性谈判",
        "999": "单一来源",
        "1001": "资格预审",
        "996": "邀请公告",
        "1004": "中标公告",
        "1003": "更正公告",
        "1012": "其他公告",
        "1006": "其他公告",
        "1007": "其他公告",
        "2654": "竞争性磋商",
        "2657": "成交公告",
        "2658": "废标终止"
      },
      // label_grade_options: [{
      //       value: '初级',
      //       label: '初级'
      //     }, {
      //       value: '中级',
      //       label: '中级'
      //     }, {
      //       value: '高级',
      //       label: '高级'
      //     }]
      labelGradeOptions: ['初级', '中级', '高级']
    };
  },
  methods: {
    changeRelation(data) {
      this.$emit("changeRelation", data);
    }
  }
};
</script>

<style lang="scss">
.data-item {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 12px;
  &-title {
    width: 100%;
    font-size: 20px;
    font-weight: bolder;
    display: inline-block;
    text-align: left;
    text-decoration: none;
    color: #409eff;
    text-align: left;
  }
  &-info {
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
    span {
      margin-right: 15px;
      color: black;
      font-weight: bold;
      label {
        font-weight: normal;
        color: rgb(43, 38, 38);
      }
    }
  }
  &-label {
    text-align: left;
    span {
      color: black;
      font-weight: bold;
      label {
        font-weight: normal;
        color: rgb(43, 38, 38);
      }
    }
    .label-grade {
      margin-left: 35px;
      margin-top: -4px;
    }
  }
}
</style>