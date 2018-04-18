<template>
  <div>
    <headTop headTitle="公告详情" goBack='true' contactServer="联系客服"></headTop>
    <div class="header_app_v">
      <ul class="details">
        <li>
          <p class="clear">
            <span class="left">【发布：恒彩】</span>
            <span class="right">{{detail.sendtime}}</span>
          </p>
        </li>
        <li>
          <p>
            {{detail.subject}}
          </p>
        </li>
        <li>
          <p v-html='detail.content'></p>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    components:{
      headTop
    },
    data(){
    	return{
    		detail:''
    	}
    },
    mounted(){
    	this.detail = this.$route.query.data||{}
    	this.getDetails(this.detail.entry)
    },
    methods:{
    	getDetails(){
    			let httpurl = this.httpUrl('NOTICEDETAILS')
	        this.httpAction(httpurl,(res) => {
		      },{nid:this.detail.id})
    	}
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .details{
    margin:0 0.2rem 2rem;
    li{
      padding: 0.3rem 0 0 0;
      &:after{
        .border-1px(100%,solid,#aaa)
      }
    }
    li>p{
      margin:0 0 0.3rem 0;
    }
  }
</style>
