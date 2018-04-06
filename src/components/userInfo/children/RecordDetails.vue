<!--充值详情-->
<template>
  <div>
    <headTop headTitle="充值详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail">
        <li>
          <p class="detailTit">帐变编号</p>
          <p class="detailTitR" v-text="dataList.orderno"></p>
        </li>
        <li>
          <p class="detailTit">帐变时间</p>
          <p class="detailTitR" v-text="dataList.times"></p>
        </li>
        <li>
          <p class="detailTit">类型</p>
          <p class="detailTitR">{{dataList.cntitle | filterCntitle}}</p>
        </li>
        <li v-if="dataList.operations != '0'">
          <p class="detailTit">收入</p>
          <p class="detailTitR" style="color:#ec0a0a;">+{{dataList.amount | tofixed('元')}}</p>
        </li>
        <li v-else>
          <p class="detailTit">支出</p>
          <p class="detailTitR" style="color:green;">-{{dataList.amount | tofixed('元')}}</p>
        </li>
        <li>
          <p class="detailTit">余额</p>
          <p class="detailTitR">{{dataList.availablebalance | tofixed('元')}}</p>
        </li>
        <li>
          <p class="detailTit">状态</p>
          <p class="detailTitR">
            <span v-if="dataList.transferstatus == 0" style="color:red;">成功</span>
            <span v-if="dataList.transferstatus == 1" style="color:green;">失败</span>
          </p>
        </li>
        <li>
          <p class="detailTit">备注</p>
          <p class="detailTitR" v-text="dataList.description"></p>
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
        dataList: this.$route.query.item
      }
    },
    components: {
      headTop
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .header_app_v{
    .detail{
      &:after{
        .border-1px(100%,solid,#ddd)
      }
      li{
        height: 0.78rem;
        line-height: 0.79rem;
        clear: both;
        background: #fff;
        &:after{
          .border-1px(100%,solid,#ddd)
        }
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
