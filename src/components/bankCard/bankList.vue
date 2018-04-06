<!--设置-->
<template>
  <div>
    <headTop headTitle="银行卡设置">
      <span v-tap="{ methods: _userInfo}" slot="goBacks">
          <img style="width: 0.39rem;" src="../header/goBack.png" class="goBacks">
        </span>
    </headTop>
    <div class="main header_app_v">
      <ul class="bankBox">
        <li v-for="(item,index) in bankList" v-tap="{ methods: bankDetail, item: item }" :key="index">
          <dl>
            <dt>{{item.bank_name}}</dt>
            <dd>储蓄卡</dd>
          </dl>
          <p>{{item.account}}</p>
        </li>
      </ul>
      <p class="addCard" v-tap="{ methods: addBank }">添加银行卡<i></i></p>
      <ul class="tips">
        <li>1、一个账户最多只能绑定<i>5</i>张银行卡</li>
        <li>2、银行卡锁定可以增强账户安全,推荐锁定(如：账户被他人盗用后，
       由于锁定的限制，您账户的资金不会被他人提款 )</li>
        <li>3、银行卡锁定后，不能增加新银行卡绑定，自身不能解绑和解锁银
       行卡，联系您的上级申请解锁</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  export default {
      components:{
        headTop
      },
      data(){
          return{
            bankList:[]
          }
      },
      mounted(){
      	this.getList();
      },
      methods: {
          _userInfo () {
            this.$router.push({path: '/userInfo'})
          },
					getList(){
							let check = this.$store.state.check;
						  let banurl = this.httpUrl('BANKLIST');
						  let pwd = this.$store.state.tkpwd;
						  this.httpAction(banurl,(res)=>{
						  		var tempData = res.data;
									if(tempData.status == 200){
										this.bankList = tempData.data;
										let tempid = this.bankList.length == 0 ? '' : this.bankList[0].id;
										let tempLockStatus = this.bankList.length == false ? '' : this.bankList[0].status;
										this.$store.commit('getBankId',tempid);
										this.$store.commit('getLockStatus',tempLockStatus);
									}else{
									}
            	},{'check':check,'secpass':pwd})
					},
					bankDetail(params){
							this.$router.push({path:'/userInfo/bankList/setCard',query:{data:JSON.stringify(params.item)}});
					},
					addBank(){
						if(this.bankList.length == 0){
								this.$router.push('/userInfo/bankList/identityConfirmation');
						}else{
								let tempLockStatus = this.$store.state.lockStatus;
							  if(tempLockStatus == 3){
							  		this.$vux.alert.show({
											content: '银行卡已被锁定'
										})
							  		return;
							  }else{
							  		if(this.bankList.length >= 5){
							  			this.$vux.alert.show({
												content: '最多只能绑定5张银行卡'
											})
							  			return;
								  	}else{
								  			this.$router.push('/userInfo/bankcheckOne');
								  	}
							  }
						}
					},
					//获取url
          httpUrl(val){
            let app = require('../../../static/ios_hc.json')
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
 @import '../../assets/css/style';

  br{
    line-height:0;
    height:0px;
  }
 .main{
   padding-top:0.02rem;
 }
  .bankBox{
    li{
      width: 90%;
      margin-left: 5%;
      border-radius:8px;
      background: #009582 url(img/bank1.png) no-repeat 80% center;
      background-size:30%;
      margin-top:0.3rem;
      dl{
        padding: 0.32rem 0;
        dt{
          color: #fff;
          font-size: 0.32rem;
          text-indent: 0.28rem;
        }
        dd{
          color: #fff;
          font-size:0.24rem;
          text-indent: 0.28rem;

        }
      }
      p{
        color: #fff;
        font-size: 0.44rem;
        text-align: center;
        padding-bottom:0.32rem;
      }
    }
  }
  .addCard{
    height: 0.7rem;
    line-height: 0.7rem;
    text-indent:0.8rem;
    background:#fff url(img/addCard.png) no-repeat 5% center;
    border-top:1px solid #dddddd;
    border-bottom:1px solid #dddddd;
    background-size:auto 50%;
    margin:0.5rem 0 0.4rem 0;
    i{
      display: inline-block;
      height: 0.7rem;
      float: right;
      width: 0.3rem;
      background:url(img/r_icon.png) no-repeat center;
      background-size: 50%;
    }
  }
  .tips{
    padding-bottom: 0.4rem;
    li{
      font-size: 0.22rem;
      padding: 0 5%;
      line-height:0.4rem;
      text-indent:-1.5em;
      margin-left:1.5em;
      color: #686868;
      i{
        color: #c7202a;
        font-style: normal;
      }
    }
  }


  </style>
  }

