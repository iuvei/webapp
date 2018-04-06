<!--追号详情-->
<template>
  <div>
    <headTop headTitle="追号详情" goBack='true'></headTop>
    <div class="main">
      <ul class="details_list">
        <li v-for="i in 8">
          <span class="details_type">追号编号</span>
          <span class="details_text">201738383838383838</span>
        </li>
      </ul>
      <div class="button_chase">
        <p>查看追号信息</p>
      </div>
    </div>
  </div>

</template>
<script>
  import headTop from '../../../header/Header.vue'

  export default {
      components:{
        headTop
      }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/css/style';

  .main{
    margin-top: 0.88rem;
    .details_list{
      padding: 0 0.2rem;
      li{
        .hl(1rem);
        &:before{
          .border-1px(100%,solid,#ccc);
        }
        .details_type{
          display: inline-block;
          width:2rem;
        }
      }
    }
    .button_chase{
      margin-top: 0.2rem;
      text-align: center;
      p{
        .button(90%,0.8rem);
      }

    }
  }

</style>
