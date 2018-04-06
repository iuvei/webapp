<!--追号详情-->
<template>
  <div>
    <headTop headTitle="帐变详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail">
        <li>
          <p class="detailTit">时间</p>
          <p class="detailTitR" v-text="dataList.times"></p>
        </li>
        <li>
          <p class="detailTit">账变类型</p>
          <p class="detailTitR" v-text="dataList.title"></p>
        </li>
        <li>
          <p class="detailTit">彩种</p>
          <p class="detailTitR" v-text="dataList.lotteryname"></p>
        </li>
        <li>
          <p class="detailTit">玩法</p>
          <p class="detailTitR" v-text="dataList.methodname"></p>
        </li>
        <li>
          <p class="detailTit">期号</p>
          <p class="detailTitR" v-text="dataList.issue"></p>
        </li>
        <li>
          <p class="detailTit">投注模式</p>
          <p class="detailTitR" v-text="dataList.modes"></p>
        </li>
        <li>
          <p class="detailTit">余额变动</p>
          <p class="detailTitR" v-if='dataList.operations == 0' style="color: #e20000;">-{{dataList.amount}}</p>
          <p class="detailTitR" style="color: #07a83c;" v-else>+{{dataList.amount}}</p>
        </li>
        <li>
          <p class="detailTit">余额</p>
          <p class="detailTitR">{{dataList.availablebalance}}元</p>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    data () {
      return {
        dataList: {}
      }
    },
    components: {
      headTop
    },
    mounted () {
    	this.dataList = this.$route.query.data
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .header_app_v{
    .detail{
      li{
        height: 0.7rem;
        line-height: 0.7rem;
        clear: both;
        background: #fff;
        border-bottom: 1px solid #dddddd;
        p{
          float: left;
          height:0.7rem;
        }
        .detailTit{
          width: 25%;
          text-indent:0.28rem;
          color: #323232;
        }
        .detailTitR{
          width: 75%;
          color: #6e6e6e
        }
        .red{
          color:#ec0b0b
        }
      }
    }
  }
  .seechase{
    background:#c7202a;
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    text-align: center;
    width: 94%;
    margin-left: 3%;
    border-radius: 4px;
    margin-top:0.3rem;
  }

</style>
