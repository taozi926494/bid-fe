<template>
  <div class="index-container">
    <div class="index-container-carousel">
      <el-carousel height="250px;">
        <el-carousel-item v-for="item in 1" :key="item">
          <div ><img v-bind:src="require(`../assets/bj.jpg`)" style="min-width:100%; height:250px;"/></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="index-container-content">
      <div class="index-container-content-result">
        <div class="index-container-content-result-item" v-for="(result, index) in dataList" :key="'resultItem_'+index"> 
          <h2 class="index-container-content-result-item-title"><a :href="'/#/detail?uuid='+result.id" style="text-decoration:none; color: #409EFF; text-align:left" target="_blank">{{result.title}}</a></h2>
          <div class="index-container-content-result-item-info">
            <span><label>类型：</label>{{ bid_type_dict[result.bid_type] }}</span>
            <span><label>发布时间：</label>{{ result.public_date }}</span>
            <span><label>地域：</label>{{ result.region }}</span>
            <span><label>采购人：</label>{{ result.institution }}</span>
          </div>
           <!-- 添加标签模块 -->
          <div class="index-container-content-result-item-label" v-show="user.role=='1'?true:false">
            <span>
              <label>相关性：</label>
              <el-switch
                v-model="result.relation"
                active-text="是"
                inactive-text="否"
                @change="editLabel(result.id, result.relation)"
                >
              </el-switch>
            </span>
            <span class="label-grade" v-show="result.relation">
              <label>发展阶段：</label>
              <el-select v-model="result.grade" clearable placeholder="请选择"  @change="editLabel(result.id, result.grade)">
                <el-option
                  v-for="item in label_grade_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </span>          
          </div>
        </div>
        <div class="index-container-content-result-pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-size="pagination.page_size"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getListApi, editeLabelApi } from '@/api/List.js'
  import { getUser } from '@/utils/user';
  export default {
    name: 'Homecomp',
    props: {
      msg: String
    },
    data(){
      return {
        pagination: {
          page: 1,
          page_size: 6,
          total: 0
        },
        dataList: [],
        bid_type_dict: {
          '974': '公开招标',
          '975': '询价公告',
          '978': '竞争性谈判',
          '977': '单一来源',
          '979': '资格预审',
          '976': '邀请公告',
          '982': '中标公告',
          '981': '更正公告',
          '990': '其他公告',
          '984': '其他公告',
          '985': '其他公告',
          '2653': '竞争性磋商',
          '2655': '成交公告',
          '2656': '废标终止',
          '998': '公开招标',
          '997': '询价公告',
          '1000': '竞争性谈判',
          '999': '单一来源',
          '1001': '资格预审',
          '996': '邀请公告',
          '1004': '中标公告',
          '1003': '更正公告',
          '1012': '其他公告',
          '1006': '其他公告',
          '1007': '其他公告',
          '2654': '竞争性磋商',
          '2657': '成交公告',
          '2658': '废标终止'
        },
        label_grade_options: [{
            value: '初级',
            label: '初级'
          }, {
            value: '中级',
            label: '中级'
          }, {
            value: '高级',
            label: '高级'
          }
        ],
        user: null,
      }
    },
    created() {
      this.user = getUser();
      this.getData();
    },
    methods:{
      async getData() {
        var params = {
          page: this.pagination.page,
          page_size: this.pagination.page_size
        }
        const res = await getListApi(params)
        this.pagination.total = res.total
        this.dataList = res.data
        for(var i=0; i < this.dataList.length; i++) {
          if(this.dataList[i]["relation"] === "" || this.dataList[i]["relation"] === "否"){
            this.dataList[i]["relation"] = false
          } else{
            this.dataList[i]["relation"] = true
          }
          if(this.dataList[i]["grade"] === ""){
            this.dataList[i]["grade"] = "初级"
          }
        }
      },
      handleCurrentChange(currentPage) { 
        this.pagination.page = currentPage
        this.getData()
      },
      async editLabel(id, value){
        var params
        if(value instanceof Boolean){
          params = {
            id: Number(id),
            relation: value?"是":"否",
            grade: ''
          }
        }else{
          params = {
            id: Number(id),
            relation: "是",
            grade: value
          } 
        }
        const res = await editeLabelApi(params)
        if(res.data == "ok") {
          this.$message.success('修改成功');
        }
      },
    }
  }
</script>


<style lang="scss">

.index-container {
  @include flex(column, flex-start, flex-start);
  background-color: #f0f0f0;
  min-height: 90vh;
  &-carousel{
    width: 100%;
  }
  &-content{
    @include flex(row);
    width: 100%;
    &-result{
      @include flex(column, flex-start, flex-start);
      width: 60%;
      border: 1px solid #ebebeb;
      background-color: white;
      padding: 20px 0px 20px 50px;
      &-item{
        @include flex(column, flex-start, flex-start, left);
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 12px;
        &-title {
          @include flex(column, flex-start, flex-start, left);
        }
        &-info {
          @include flex(row, flex-start, flex-start);
          width: 100%;
          margin-bottom: 10px;
          span{
            margin-right: 15px;
            color: black;
            font-weight: bold;
            label{
              font-weight: normal;
              color:rgb(43, 38, 38);
            }
          }
        }
        &-label{
          @include flex(row, flex-start, flex-start, left);
          span{
            color: black;
            font-weight: bold;
            label{
              font-weight: normal;
              color:rgb(43, 38, 38);
            }
          }
          .label-grade{
            margin-left: 35px;
            margin-top: -4px;
          }
        }
      }
      &-pagination{
        margin-top: 30px;
      }
    }
  }
  .el-input__inner{
    width: 150px;
    height: 35px;
  }
}

</style>
