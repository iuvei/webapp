<!--添加银行卡-->
<template>
  <div>
    <headTop headTitle="锁定银行卡" goBack='true'></headTop>
    <div class="header_app_v">
      <p class="tips">锁定绑定银行卡需提供最近一次绑定的卡号信息！</p>
      <ul class="userBox">
        <li :style="{marginTop:'0px'}">
          <p class="rechargetit">开户人姓名</p>
          <p class="rechargetR"><input type="text" placeholder="输入开户人姓名" v-model='openname'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">银行卡号</p>
          <p class="rechargetR"><input type="number" placeholder="输入银行卡号" v-model='banknumber'></p>
          <br class="clear">
        </li>
      </ul>
      <p class="sure" v-tap="{ methods: ok }">提交</p>
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
          	openname:'',
          	banknumber:''
          }
      },
      mounted(){
      },
      methods: {
      		ok(){
      				let bkurl = this.httpUrl('LOCKDELBANK');
      				let bankId = this.$store.state.bankId || '';
      				let param = {flag:'lock',account_name:this.openname,account:this.banknumber,'id':bankId};
            this.$vux.loading.show({
              text: '正在提交'
            })
      				this.httpAction(bkurl,(res)=>{
      				    this.$vux.loading.hide()
						  		let tempData = res.data
						  		let _this = this
						  		if(tempData.status == 200){
						  			this.$vux.alert.show({
											  content: '锁定成功',
											  onHide () {
												  	_this.$router.replace('/userInfo/bankList')
												}
										})
						  		}else{
						  			this.$vux.alert.show({
											  content: tempData.msg
										})
						  		}
            	},param)
      		}
      }

  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

	p select{
		text-indent: 0.4rem;
	}
	p input{
		width: 100%;
	}
  .tips{
    line-height:0.7rem;
    padding-left: 10%;
    background:#fff2bb url(../img/tanhao.png) no-repeat 0.28rem center;
    background-size:auto 50%;
    color: #c09743;
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
    width:28%;
    text-indent: 0.28rem;
  }
  .rechargetR{
    width:72%;
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
