<template>
  <div class="data-item">
    <a class="data-item-title" :href="href" target="_blank">{{ title }}</a>
    <div class="data-item-info">
      <span>
        <label>类型：</label>
        {{ $BID_TYPE[type] }}
      </span>
      <span>
        <label>发布时间：</label>
        {{ publicDate | formatTime }}
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
    <div class="data-item-label" v-show="role==1?true:false">
      <span>
        <label>与公司业务相关性：</label>
        <el-switch
          v-model="relationData"
          active-text="相关"
          inactive-text="不相关"
          :active-value="1"
          :inactive-value="0"
          @change="onDataItemChange"
        ></el-switch>
      </span>
      <span class="label-grade" v-show="relation == 1">
        <label>信息化建设阶段：</label>
        <el-select
          v-model="gradeData"
          clearable
          placeholder="请选择"
          size="small"
          @change="onDataItemChange"
        >
          <el-tooltip
            v-for="(item, key) in $IT_LEVELS"
            :key="key"
            effect="dark"
            :content="item.tip"
            placement="right"
          >
            <el-option :value="key" :label="item.level"></el-option>
          </el-tooltip>
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: { type: Number },
    href: { type: String, default: "" },
    title: { type: String, default: "" },
    type: { type: String, default: "" },
    publicDate: { type: String, default: "" },
    region: { type: String, default: "" },
    institution: { type: String, default: "" },
    role: { type: Number, default: 0 },
    grade: { type: Number },
    relation: { type: Number }
  },
  data() {
    return {
      relationData: this.relation,
      gradeData: this.grade
    };
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
  methods: {
    onDataItemChange() {
      this.$emit("dataItemChange", {
        id: this.id,
        relation: this.relationData,
        grade: this.gradeData
      });
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
    margin: 15px 0px;
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