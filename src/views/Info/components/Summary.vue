<template>
    <div class="summary">
        <h5>公告概要：</h5>
        <div class="item" v-for="(val, key, index) in summaryDict" :key="index">
            <div class="label"> {{ key }} </div>
            <div class="value"> {{ val }}</div>
        </div>     
    </div>
</template>

<script>


export default {
  name: 'Info',
  props: {
    summaryDict: Object
  }
}
</script>


<style lang="scss">
$height: 50px;
$border: 1px solid rgb(148, 148, 155);
.summary {
    .item{
        background-color: rgb(203, 203, 214);
        height: $height;
        line-height: $height;
        width: 100%;
        display: inline-flex;
        .label{
            margin: -1px -1px -1px 1px;
            border: $border;
            width: 15%;
            text-align: right;
            padding: 0 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
                text-overflow: inherit;
                overflow: visible;
                white-space: pre-line;
            }
        }
        .value{
            margin: -1px -1px -1px -1px;
            border: $border;
            background-color: white;
            width: 85%;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 20px;
            &:hover {
                text-overflow: inherit;
                overflow: visible;
                white-space: pre-line;
            }
            
        }
    }
}
</style>
