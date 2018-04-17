<!--输入提款密码-->
<template>
  <div>
    <headTop headTitle="设置提款密码" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
          <p class="rechargetit">提款密码</p>
          <p class="rechargetR"><input type="password" placeholder="请输入提款密码" v-model='tkpass'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">再次确认</p>
          <p class="rechargetR"><input type="password" placeholder="请再次输入提款密码" v-model='confirmpass'></p>
          <br class="clear">
        </li>
      </ul>
      <p class="sure" v-tap="{ methods: actionOk }">确定</p>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'
  import { md5 } from 'vux'
  export default {
      components:{
        headTop,
      },
      data(){
          return{
          	confirmpass:'',
          	tkpass:''
          }
      },
      methods: {
        actionOk(){
		          let okpass =  /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/
		          if(this.tkpass == '' || this.confirmpass == ''){
		          		this.$vux.alert.show({
		              content: '密码不能为空'
		            })
		            return
		          }
		          if(!okpass.test(this.tkpass)){
		            this.$vux.alert.show({
		              content: '密码格式不正确'
		            })
		            return
		          }
        			let tk_password = md5(this.tkpass);
        			let tk_confirmpwd = md5(this.confirmpass);
						  let passurl = this.httpUrl('SETPASS');
						  this.httpAction(passurl,(res)=>{
						  		if(res.data.status == 200){
						  			let bankStatus = this.$store.state.bank;
						  			bankStatus.setsecurity = 'no';
						  			this.$store.commit('updatebanks',bankStatus);
						  			let _this = this
						  			this.$vux.alert.show({
											  content: '设置成功',
											  onHide () {
												  	_this.$router.replace('/userInfo');
												}
										})
						  		}else{
						  			this.$vux.alert.show({
											  content: res.data.msg
										})
						  		}
            	},{secpass:tk_password,confirm_pass:tk_confirmpwd,setsecurity:'yes'})
					},
					//获取url
          httpUrl(val){
            let app = require('../../../../static/hc.json')
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
          }
      }

  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

  .topPadding{
    height:0.88rem;
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
    background:#c7202c;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
  }

  </style>
