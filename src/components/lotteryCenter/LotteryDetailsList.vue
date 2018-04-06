<!--追号详情-->
<template>
  <div>
    <headTop headTitle="内容详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail clear">
        <li>
          <p class="detailTit">注单编号</p>
          <p class="detailTitR" v-text="dataList.projectid"></p>
        </li>
        <li>
          <p class="detailTit">所投玩法</p>
          <p class="detailTitR" v-text="dataList.methodname"></p>
        </li>
        <li>
          <p class="detailTit">投注内容</p>
          <p class="detailTitR" v-text="dataList.code"></p>
        </li>
        <li>
          <p class="detailTit">奖期</p>
          <p class="detailTitR" v-text="dataList.issue"></p>
        </li>
        <li>
          <p class="detailTit">投单时间</p>
          <p class="detailTitR" v-text="dataList.writetime"></p>
        </li>
        <li>
          <p class="detailTit">投注金额</p>
          <p class="detailTitR" v-text="dataList.totalprice"></p>
        </li>
        <li>
          <p class="detailTit">奖金</p>
          <p class="detailTitR" v-text="dataList.bonus"></p>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  import headTop from '../header/Header.vue'

  export default {
    data () {
      return {
        dataList: []
      }
    },
    components: {
      headTop
    },
    mounted () {
    	this.dataList = this.$route.query.data
    },

  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .header_app_v{
    .detail{
      background: #fff;
      li{
        clear: both;
        background: #fff;
        word-wrap: break-word;
        &:after{
          .border-1px(100%,solid,#ddd)
        }
        p{
          float: left;
          margin: 0.17rem 0;
        }
        .detailTit{
          width: 25%;
          text-indent:0.28rem;
          color: #323232;
        }
        .detailTitR{
          width: 75%;
          color: #6e6e6e;
        }
        .red{
          color:#ec0b0b;
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
	.save{
		  height: 0.8rem;
	    line-height: 0.8rem;
	    color: #fff;
	    border-radius: 3px;
	    background: #c7202a;
	    text-align: center;
	    font-size: 0.28rem;
	    margin: 0.4rem 0;
	    width: 94%;
	    margin-left: 3%;
	}
</style>
