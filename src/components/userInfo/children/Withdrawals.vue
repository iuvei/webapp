
<!--修改提款密码-->
<template>
  <div>
    <headTop headTitle="提款" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
           <p class="rechargetit">收款银行卡</p>
           <p class="rechargetR">
             <select ref="bankinfoId">
               <option v-for='item in bankInfo' v-text='item.account' :dataId='item.id'></option>
             </select>
           </p>
        </li>
        <li>
           <p class="rechargetit">用户名</p>
           <p class="rechargetR">{{username}}</p>
        </li>
        <li>
           <p class="rechargetit">可提款金额</p>
           <p class="rechargetR money"><span>{{money}}</span>元</p>
        </li>
        <li>
           <p class="rechargetit">提款金额</p>
           <p class="rechargetR"><input type="text" v-model='inputMoney' value="0.00" placeholder="请输入提款金额">元</p>
        </li>
        <div class="tips">最大可提款金额<i>{{maxMoney}}</i>元,最小可提款金额<i>{{minMoney}}</i>元</div>
      </ul>
      <p class="nextStep" v-tap="{ methods:ok }">提交</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import AddressName from '../../address/Address.vue'
  export default {
      components:{
        headTop,
        AddressName
      },
      data(){
          return{
           bankInfo:[],
           username:"",
           money:0,
           inputMoney:'',
           maxMoney:0,
           minMoney:0
          }
      },
      mounted(){
      	this.getInfo()
      },
      methods: {
        getInfo(){
        	 let checknumber = this.$store.state.check;
        	 let bkurl = this.httpUrl('WITHDRAWS');
        	 this.httpAction(bkurl,(res)=>{
						  		var tempData = res.data;
						  		if(tempData.status == 200){
						  			this.bankInfo = tempData.data.banks;
						  			this.username = tempData.data.user.username;
						  			this.money = tempData.data.availablebalance;
						  			this.maxMoney = tempData.data.d_max_money;
						  			this.minMoney = tempData.data.d_min_money;
						  			/*this.$router.replace('/userInfo/bankList');*/
						  		}else{
						  			this.$vux.alert.show({
											  content: tempData.msg
										})
						  		}
            	},{check:checknumber})
        },
        ok(){
        	 if(this.inputMoney == ''){
        	 		this.$vux.alert.show({
			            content: '请输入提款金额'
							})
        	 		return
        	 }else{
        	 		let reg = /^\d*\.{0,1}\d{0,1}$/
        	 		if(!reg.test(this.inputMoney)){
        	 			this.$vux.alert.show({
			            content: '提款金额格式不正确'
								})
		        	 	return
        	 		}
        	 }
        	 let checknumber = this.$store.state.check;
        	 let bkurl = this.httpUrl('WITHDRAWS');
        	 let bankId = this.$refs.bankinfoId;
        	 let bankInfoId = bankId.options[bankId.selectedIndex].getAttribute('dataId');
          this.$vux.loading.show({
            text: '正在提款'
          })
        	 this.httpAction(bkurl,(res)=>{
             this.$vux.loading.hide()
						  		var tempData = res.data;
						  		if(tempData.status == 200){
						  				this.inputMoney='';
						  				this.$vux.alert.show({
												  content: tempData.msg
											})
						  				this.getInfo();
						  		}else{
						  			this.$vux.alert.show({
												  content: tempData.msg
										})
						  		}
            	},{check:checknumber,username:this.username,flag:'confirm',cardid:bankInfoId,money:this.inputMoney,ruleset:"withdrawal-hcp"})
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
  .userBox>.tipsBox{
    margin-top:0px;
    border:none;
    background:#f6f6f6;
    color:#a4a4a4;
    text-indent: 0.28rem;
    i{
      color: #c7202a
    }
  }
  li>p{
    float: left;
    line-height: 0.7rem;
    height:0.7rem;
    font-size: 0.28rem;
  }
  .rechargetit{
    width:25%;
    text-align:right;
  }
  .rechargetR{
    width:70%;
    text-indent:0.34rem;
    select{
      border:none;
      background:none;
      width: 100%;
      height: 100%;
    }
  }
  .money{
    color:#c7202a;
    span{
      font-size:0.34rem;
    }
  }

  .nextStep{
    float:left;
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    border-radius: 3px;
    background:#c7202c;
    text-align:center;
    font-size:0.28rem;
    margin: 0.4rem 0 0.4rem 3%;
    width:94%;
  }
 .tips{
    padding-top: 0.3rem;
	  font-size: 0.22rem;
	  line-height:0.4rem;
	  margin-left:0.3rem;
	  color: #686868;
	  i{
	    color: #c7202a;
	    font-style: normal;
	  }
  }
  </style>
