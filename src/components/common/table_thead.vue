<template>
  <div>
    <div class="thead">
      <div class="table_thead_1">
        <div style="position: relative">
          <ul class="table_thead table_dividend clear">
            <li v-for="(item, index) in datas.thead" v-if="index < thead_1">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="table_thead_2">
        <ul class="table_thead table_dividend clear">
          <li v-for="(item, index) in datas.thead" v-if="index >= thead_1">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    // 接收父组件传过来的参数
    props: ['datas', 'starttime','thead_1', 'thead_2']
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .thead{
    height: 0.7rem;
    line-height: 0.73rem;
    font-size: 0.28rem;
    font-weight: bold;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }

  .table_thead_1{
    float: left;
    width: 35%;
    .table_dividend{
      border-right: 1px solid #aaa;
      li{
        float: left;
        text-align: center;
      }
      li:nth-child(1){
        width: 50%;
      }
      li:nth-child(2){
        width: 50%;
      }
    }
  }
  .table_thead_2{
    float: left;
    width: 65%;
    overflow-x:scroll;
    overflow-y: hidden;
    .table_dividend{
      width:1700px;
      li{
        float: left;
        text-align: center;
        width: 80px;
      }
    }
  }

</style>
