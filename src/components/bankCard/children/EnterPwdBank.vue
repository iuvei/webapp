<!--输入提款密码-->
<template>
  <div>
    <headTop headTitle="提款" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
          <p class="rechargetit">提款密码</p>
          <p class="rechargetR"><input type="password" placeholder="请输入提款密码" v-model='txpass'></p>
          <br class="clear">
        </li>

      </ul>
      <p class="sure" v-tap="{ methods: actionOk }">确认</p>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'
  export default {
      components:{
        headTop,
      },
      data(){
          return{
          	txpass:''
          }
      },
      methods: {
					actionOk(){
						  let passurl = this.httpUrl('CHECKPASS');
						  this.httpAction(passurl,(res)=>{
						  		if(res.data.status == 200){
						  			this.$store.commit('getCheck', res.data.data.check);
						  			this.$store.commit('getTkpwd',this.txpass);
						  			this.$router.replace('/userInfo/banklist');
						  		}else{
						  			this.$vux.alert.show({
										content: res.data.msg
									})
						  		}
            	},{'secpass':this.txpass})
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
 @import '../../../assets/css/style';

  .main{
    margin-top:1.2rem;
  }
  br{
    line-height:0;
    height:0px;
  }
  .userBox>li{
      overflow: hidden;
      width:100%;
      line-height:0.7rem;
      height:auto;
      border-top:1px solid #dddddd;
      border-bottom:1px solid #dddddd;
      background: #fff;
      margin-top:0.2rem;

  }

  li>p{
    float: left;
    line-height: 0.7rem;
    height:0.7rem;
    font-size: 0.28rem;
  }
  .rechargetit{
    width:25%;
    text-indent: 0.28rem;
  }
  .rechargetR{
    width:75%;
  }

  .sure{
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    border-radius: 3px;
    background:@color_c7202c;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
    &:active{
      background:#8F2F2F;
    }
  }

  </style>
