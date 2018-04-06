<!--开奖详情查看更多-->
<template>
  <div>
    <headTop headTitle="查看更多" goBack='true'></headTop>
    <div class="header_app_v"></div>
      <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
        <thead style="background:#fff;">
          <tr style=" height: 0.7rem;">
            <th width="8%">序号</th>
            <th width="25%">所投玩法</th>
            <th width="22%">投注内容</th>
            <th width="20%">投注金额</th>
            <th width="25%">奖金</th>
          </tr>
        </thead>
        <tbody>
          <tr v-tap="{ methods: _lotteryDetailsList, item: item }" v-for="(item,index) in dataList" align="center" style=" height: 1.2rem;">
            <td>{{index+1}}</td>
            <td class="ellipsis">{{item.methodname}}</td>
            <td class="ellipsis">{{item.code}}</td>
            <td class="ellipsis">{{item.totalprice}}</td>
            <td style="position: relative">
              <span>{{item.bonus}}</span>
              <span class="icon_right"></span>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

</template>
<script>
  import headTop from '../header/Header.vue'

  export default {
    components: {
      headTop
    },
    data () {
      return {
        dataList: []
      }
    },
    activated () {
      this.dataList = this.$store.state.lotteryMore
    },
    methods: {
      _lotteryDetailsList (params) {
        this.$router.push({path: '/lotteryCentre/lotteryDetails/lotteryMore/lotteryDetailsList', query: {data: params.item}})
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';
</style>
