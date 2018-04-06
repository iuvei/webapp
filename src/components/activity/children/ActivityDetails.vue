<!--活动详情-->
<template>
  <div class="activity">
    <headTop headTitle="活动详情" goBack='true' contactServer="联系客服"></headTop>
    <div class="header_app_v" style="padding: 0 0.1rem;">
      <div class="text">请点击右上角“联系客服”报名参加活动。</div>
      <ul>
        <li class="activity_content">
          <img :src="srcImg" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  export default{
    data () {
      return {
        srcImg: ''
      }
    },
    components: {
      headTop
    },
    mounted () {
      this._showDetails()
    },
    methods: {
      _showDetails () {
        let activityId = this.$route.query.activityId
        let banner = this.$store.state.banner
        for (let i = 0; i < banner.length; i++) {
          if (banner[i].activity_id === activityId) {
            this.srcImg = banner[i].activity_show
          }
          if (this.srcImg.indexOf('http') > -1) {
            this.srcImg = this.srcImg
          } else {
            this.srcImg = this.$store.state.server + this.srcImg
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  img{
    width:100%;
  }
  .text{
    width:100%;
    height:0.6rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    text-align: center;
    background: #FFF2BB;
    color:#C8A453;
  }
</style>
