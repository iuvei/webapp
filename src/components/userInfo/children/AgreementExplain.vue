<!--日工资,日工资协议说明-->
<template>
  <div>
    <headTop :headTitle="text" goBack='true' close="true"></headTop>
    <div class="header_app_v">
      <div class="explain">
        <h3>恒彩{{this.$route.query.textExplain}}：</h3>
        <p>发放时间：每日10:00由系统自动发放前一天工资。</p>
        <br/>
        <h3>{{this.$route.query.textExplain}}规则：</h3>
        <p>1.非同IP，非同银行卡会员。</p>
        <p>
          2.参与投注的流水统计限彩票，且玩法投注不得超过该玩法的（80%），即定位胆必须小于7注，二码必须小于79注，三码必须小于799注，四星必须小于7999注，五星必须小于79999注，如发现违规投注情况，均视作放弃{{this.$route.query.textExplain}}；恒彩娱乐保留最终解释权，并持有终止，修改等权利。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    data() {
      return{
          text: this.$route.query.textExplain + '协议说明'
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.$store.commit('updateAgreement', false)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .explain{
    margin: 0 0.2rem;
    padding: 0.2rem 0;
    font-size: 0.28rem;
  }
</style>

