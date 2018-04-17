<!--添加银行卡-->
<template>
  <div>
    <headTop headTitle="添加银行卡" goBack='true'></headTop>
    <div class="header_app_v">
      <p class="tips">增加绑定银行卡需提供最近一次绑定的卡号信息！</p>
      <ul class="userBox">
      	<li :style="{marginTop:'0px'}">
          <p class="rechargetit">开户银行</p>
          <p class="rechargetR">
          	<select ref="bankId">
          		<option v-for='item in banklist' v-text='item.bank_name' :dataId="item.bank_id"></option>
          	</select>
          </p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">开户银行省份</p>
          <p class="rechargetR">
          	<select @change='chooseProvince' ref="provinceId">
          		<option v-for='item in bankprovince'  v-text='item.name' :dataId="item.id"></option>
          	</select>
          </p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">开户银行城市</p>
          <p class="rechargetR">
          	<select ref="cityId">
          		<option v-for='item in bankcity' v-text='item.name' :dataId="item.id"></option>
          	</select>
          </p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">支行名称</p>
          <p class="rechargetR"><input type="text" placeholder="输入支行名称" v-model='zhname'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">开户人姓名</p>
          <p class="rechargetR"><input type="text" placeholder="输入开户人姓名" v-model='openname'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">银行卡号</p>
          <p class="rechargetR"><input type="number" placeholder="输入银行卡号" v-model='banknumber'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">确认银行卡号</p>
          <p class="rechargetR"><input type="number" placeholder="再次输入银行卡号" v-model='confirmnumber'></p>
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
          	banklist : [],
          	bankprovince : [],
          	bankcity : [],
          	selected : 2,
          	zhname:'',
          	openname:'',
          	banknumber:'',
          	confirmnumber:''
          }
      },
      watch:{
      	selected : function(val){
      		this.getCity(val);
      	}
      },
      mounted(){
      	this.getList();
	      this.getCity(this.selected);
      },
      methods: {
      		getList(){
      			let bkurl = this.httpUrl('GETCITYLIST')
      			this.httpAction(bkurl,(res)=>{
      			    let _this = this
						  		var tempData = res.data;
						  		if(tempData.status == 200){
						  				this.banklist = tempData.data.banklist;
						  				this.bankprovince = tempData.data.provincelist;
						  		}else{
						  				let _this = this
						  				this.$vux.alert.show({
                        content: tempData.msg,
                        buttonText: '返回上一页',
                        onHide(){
                          _this.$router.replace('/userInfo/bankList')
                        }
											})
						  		}
            	},{flag:'page'})
      		},
      		getCity(val){
      			let bkurl = this.httpUrl('GETCITYLIST');
      			this.httpAction(bkurl,(res)=>{
						  		var tempData = res.data;
						  		if(tempData.status == 200){
						  				this.bankcity = res.data.data;
						  		}
            	},{flag:'getCity',province:val})
      		},
      		chooseProvince(){
      			 let _this = this.$refs.provinceId;
      			 this.selected = _this.options[_this.selectedIndex].getAttribute("dataId");
      		},
      		ok(){
      				let bkurl = this.httpUrl('GETCITYLIST');
      				//获取银行卡ID，省份ID,城市ID
      				let tempbank = this.getObj(this.$refs.bankId);
      				let tempprovince = this.getObj(this.$refs.provinceId);
      				let tempcity = this.getObj(this.$refs.cityId);
      				let param = {account:this.banknumber,account_name:this.openname,bank:tempbank['Name'],
      				bank_id:tempbank['Id'],province_id:tempprovince['Id'],province:tempprovince['Name'],
      				city_id:tempcity['Id'],city:tempcity['Name'],branch:this.zhname,account_again:this.confirmnumber,flag:'confirm'};
      				this.httpAction(bkurl,(res)=>{
						  		let tempData = res.data;
						  		if(tempData.status == 200){
						  			  let _this = this
						  				let bankStatus = this.$store.state.bank;
						  				bankStatus.issuebank = 0;
						  				this.$vux.alert.show({
												  content: '添加成功',
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
          },
      		getObj(_thisId){
      			 var tempId = {};
      			 let tpname = _thisId.options[_thisId.selectedIndex].value;
      			 let tpid = _thisId.options[_thisId.selectedIndex].getAttribute("dataId");
      			 return tempId={'Id':tpid,'Name':tpname};
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
    input{
      text-indent: 0.4rem;
    }
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
