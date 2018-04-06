<template>
  <div>
    <load-more v-if="loading" tip="正在加载"></load-more>
    <headTop headTitle="消息详情" goBack='true' contactServer="联系客服"></headTop>
    <div class="header_app_v"></div>
    <ul class="details">
      <li class="clear">
        <span class="left">【发布：恒彩】</span>
        <span class="right">{{detail.sendtime}}</span>
      </li>
      <li>{{detail.subject}}</li>
    </ul>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import { LoadMore } from 'vux'

  export default {
    components: {
      headTop,
      LoadMore
    },
    data () {
    	return{
    		detail: '',
        loading: true,
    	}
    },
    updated () {
      this.loading = false
      this.$store.commit('updateMessage', false)
    },
    mounted(){
    	this.detail = this.$route.query.data||{}
    	this.setData(this.detail.entry)
    },
    methods:{
    	setData(val){
	        let detailurl = this.httpUrl('READMESSAGE') + '&msgid='+val
	        this.httpAction(detailurl,(res) => {
	        })
	    },
	    //获取url
      httpUrl(val){
        let app = require('../../../../static/ios_hc.json')
        let appData = app
        let serverList = appData.serverList
        let j = Math.floor(Math.random() * serverList.length)
        if (this.$store.state.server == null) {
          this.$store.commit('updateServer', window.location.origin)
        }
        if (this.$store.state.lotteryType == null) {
          this.$store.commit('updateLotteryType', appData.lotteryType)
        }
        let sess
        if (this.$store.state.sess != null) {
          sess = this.$store.state.sess
        } else {
          sess = sessionStorage.getItem('sess')
        }

        return this.$store.state.server + this.mUtils.interFace(val)+'&sess='+sess;
      },
    }
  }
</script>
<style lang="less" scoped>
  .details{
    margin:1rem 0.2rem 2rem;
    li{
      border-bottom:1px solid #aaa;
      padding:0.2rem 0;
    }
  }
  .weui-loadmore {
    top: 1rem;
  }
</style>
