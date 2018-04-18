<!--团队报表-->
<template>
  <div>
    <headTop headTitle="团队报表" goBack='true'></headTop>
    <div class="header_app_v">
      <p class="username">{{username}}</p>
      <table class="team_table" width="100%" border="0" cellspacing="0" cellpadding="10">
        <thead style="background:#fff;">
        <tr>
          <th>用户名</th>
          <th>盈亏</th>
          <th>中奖金额</th>
          <th>总投注额</th>
        </tr>
        </thead>
        <tbody>
        <tr align="center" v-for="item in dataList">
          <td v-text="item.username"></td>
          <td v-text="item.total_win_lose"></td>
          <td v-text="item.cp_bonus"></td>
          <td v-text="item.ea_bonus"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="fixbottom">
      <p>总计</p>
      <p>+166.00</p>
      <p>588.00</p>
      <p>11188842.00</p>
      <br class="clear">
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'

  export default {
    components: {
      headTop,
      dateSelectView
    },
    data () {
      return {
        username: "weapon989",
        dataList: [], // 团队报表
        postData: {
          end_date: '2017-06-28',
          start_date: '2016-06-22',
          username: 'cszd002',
          ischild: 0
        }
      }
    },
    watch: {
      postData: {
        deep: true,
        handler: function (val, oldVal) {
          this._getSecondaryAgent()
        }
      }
    },
    mounted () {
      this._getSecondaryAgent(this.$route.query.userid)
    },
    methods: {
      // 获取团队报表
      _getSecondaryAgent (val) {
        let httpurl = this.httpUrl('TEAMREPORT') + '&uid=' + val
        this.httpAction(httpurl,(res) => {
          this.dataList = res.data.result
        },this.postData)
      }
    }

  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';
  .input-wrapper{
    padding:0px;
  }
  .topPadding{
    height:0.88rem;
  }
  .searchTime{
    padding:0.1rem 0;
    height:0.7rem;
    p{
      float: left;
      height:0.7rem;
      line-height:0.7rem;
      padding:0 2px;
    }
    .objinput{
      width: 40%;
      float:left;
      line-height:0.4rem;
      input{
        border-radius: 4px;
        border:1px solid #ddd;
        height:0.7rem;
        width: 100%;
        background:#fff;
        text-indent:4px;
      }
    }

  }
  .username{
    text-align: center;
    background: #444444;
    color: #fff;
    line-height: 0.64rem;
    height: 0.64rem;
  }
  .fixbottom{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#fff;
    p{
      float:left;
      width:25%;
      text-align:center;
      height:0.8rem;
      line-height:0.8rem;
    }
  }
</style>
