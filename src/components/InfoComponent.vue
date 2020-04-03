<template>
    <div class="info-container">
        <div class="info-container-content">
            <div class="info-container-content-header">
                <h2>电子科技大学永宁校区总体规划咨询服务项目（第二次）中标候选人公示</h2>
            </div>
            <p class="info-container-content-tip">
                <span class="pubTime">2020年03月23日 16:29</span>
                 来源：
                <span class="sourceName">中国政府采购网</span>
                <span><a :href="originUrl" target="_blank">查看原文</a></span>
            </p>
            <div class="info-container-content-table">
                <h5>公告概要：</h5>
                <div class="tbody">
                    <div class="tr" v-for="(val, key, index) in meta" :key="'td_'+index">
                        <div class="th">
                            <span>{{ key }}</span>
                        </div>
                        <div class="td">
                            <span>{{ val }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-container-content-text">
                <h5>原文内容：</h5>
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
import { getInfoApi } from '@/api/Info.js'

export default {
  name: 'Info',
  data(){
    return {
      meta: {},
      originUrl: "",
      text: null,
    }
  },
  created(){
      this.getData()
  },
  methods:{
    async getData(){
        var params = {
            id: this.$route.query.uuid
        }
        const data = await getInfoApi(params)
        this.originUrl =data.url
        this.text =data.text
        this.meta = JSON.parse(data.meta)
    }
  }
}
</script>


<style lang="scss" scoped>
.info-container{
    @include flex(row);
    width: 100%;
    background: #f0f0f0; 
    &-content{
        margin: 20px 0px;
        width: 50%;
        background: white;
        padding: 40px 0px;
        &-header{
            float: left;
            margin: 20px 0px;
            width: 100%;
            h2{
                font-size: 26px;
                line-height: 36px;
                font-weight: bolder;
                color: #383940;
                word-wrap: break-word;
                margin-bottom: 20px;
                margin-top: 20px;
                width: 98%;
                text-align: center;
            }
        }
        &-tip{
            .pubTime{
                margin-right: 15px;
            }
            .sourceName{
                margin-right: 15px;
            }
        }
        &-table {
            h5{
                line-height: 24px;
                font-size: 14px;
                color: #a00000;
                font-weight: bolder;
                text-align: center;
                margin-bottom: 15px;
            }
            .tbody{
                display: flex;
                flex-direction: column;
                margin-left: 50px;
                .tr{
                    display: flex;
                    flex-direction: row;
                    margin: 0px 0px -1px -1px;
                    .th {
                        background-color: #F4F4FF;
                        width: 250px;
                        height: 50px;
                        margin-right: -1px;
                        border: 1px solid #bfbfbf;
                        white-space: nowrap;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        justify-items: center;
                        span{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &:hover {
                                text-overflow: inherit;
                                overflow: visible;
                                white-space: pre-line;
                            }
                        }
                    }
                    .td{
                        width: 78%;
                        height: 50px;
                        border: 1px solid #bfbfbf;
                        white-space: nowrap;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        justify-items: center;
                        span{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align: left;
                            padding-left: 20px;
                            &:hover {
                                text-overflow: inherit;
                                overflow: visible;
                                white-space: pre-line;
                            }
                        }
                    }
                }
            }
        }
        &-text{
            margin-top: 50px;
            line-height: 35px;
            text-align: left;
            margin: 0px 50px;
            h5{
                line-height: 24px;
                font-size: 14px;
                color: #a00000;
                font-weight: bolder;
                text-align: center;
                margin-bottom: 15px;
            }
            
        }
    }   
  
}
</style>
