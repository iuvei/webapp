<!--账号信息-->
<template>
  <div>
    <headTop headTitle="账号信息" goBack='true'></headTop>
    <div class=" header_app_v">
      <ul class="details_lists">
        <li class="list_li">
          <div>
          	<span class="info userid"></span>
            <span class="details_type">当前账号</span>
            <span class="details_text">
              <strong>{{userinfo.userName}}</strong>
            </span>
          </div>
        </li>
        <li class="list_li">
          <div>
          	<span class="info nickname"></span>
            <span class="details_type">昵称</span>
            <div class="input-div"><input type="text" value="" v-model="userinfo.nickName" placeholder="请输入你的昵称"></div>
          </div>
        </li>
        <li class="list_li">
          <div>
          	<span class="info remain"></span>
            <span class="details_type">预留信息</span>
            <div class="input-div"><input type="text" value="" v-model="userinfo.remainInfo" placeholder="请输入你的预留信息"></div>
          </div>
        </li>
        <li class="list_li">
        	<div>
        		<span class="info tel"></span>
            <span class="details_type">联系方式</span>
          </div>
        </li>
        <li class="list_li">
        	<div>
          	<span class="info"></span>
            <span class="details_type">电话</span>
            <div class="input-div"><input type="text" value="" v-model="userinfo.tel" placeholder="请输入你的电话"></div>
          </div>
        </li>
        <li class="list_li">
          <div>
          	<span class="info"></span>
            <span class="details_type">QQ</span>
            <div class="input-div"><input type="text" value="" v-model="userinfo.qq" placeholder="请输入你的QQ"></div>
          </div>
        </li>
        <li class="list_li">
          <div>
          	<span class="info"></span>
            <span class="details_type">邮箱</span>
            <div class="input-div"><input type="text" value="" v-model="userinfo.email" placeholder="请输入你的邮箱"></div>
          </div>
        </li>
      </ul>
      <div class="save" v-tap="{ methods:save}">保存</div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
  	data(){
  		return{
  			userinfo:{
  				userName:'',
  				nickName:'',
  				remainInfo:'',
  				qq:'',
  				email:'',
  				tel:''
  			}
  		}
  	},
  	mounted(){
			this.getInfo();
    },
    methods:{
      	getInfo(){
      		let infourl = this.httpUrl('USERINFO');
      		this.httpAction(infourl,(res)=>{
      			var tempdata = res.data;
      			if(tempdata.status == 200){
	      				this.userinfo = {
		      				userName:tempdata.data.username,
				  				nickName:tempdata.data.nickname,
				  				remainInfo:tempdata.data.preinfo,
				  				qq:tempdata.data.tencent,
				  				email:tempdata.data.email,
				  				tel:tempdata.data.telephone_number
      					};

      			}else{
              this.$vux.alert.show({
                title: '温馨提示',
                content: '获取用户信息失败'
              })
      			}
      		},{'flag':'get'})
      	},
      	save(){
      		if(!this.valite()){
      			return
      		}
      		let infourl = this.httpUrl('USERINFO');
      		let param = {'flag':'post',"nickname":this.userinfo.nickName,"preinfo":this.userinfo.remainInfo,"tencent":this.userinfo.qq,"email":this.userinfo.email,"telephone_number":this.userinfo.tel}
          this.$vux.loading.show({
            text: '正在保存'
          })
      		this.httpAction(infourl,(res)=>{
            this.$vux.loading.hide()
      			var tempdata = res.data;
      			if(tempdata.status == 200){
      				this.$vux.alert.show({
						content: '保存成功',
					})
      			}else{
      				this.$vux.alert.show({
						content: tempdata.msg,
					})
      			}

      		},param)
      	},
      	valite(){
      		if(this.userinfo.nickName == ""){
      			this.$vux.alert.show({
					content: '请输入昵称',
				})
      			return false
      		}
      		return true
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
    },
    components:{
      headTop
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';
  .details_lists{
  	padding: 0 0.3rem;
  }
  .details_type{
  	color: #333;
  	font-weight: bold;
  	width: 1.5rem;
  	vertical-align: middle;
  	position: relative;
  }
  .list_li{
  	position: relative;
  	.input-div{
  	    position: absolute;
  	    width: 100%;
  	    top: 0;
  	    input{
	  	    width: 90%;
	  	    text-indent: 2rem;
	  	    padding: 0.38rem 0 0 0;
	  	    height: 0.3rem;
	  	    line-height: 0.3rem;
		}
	}
  }
  .details_text{
  	vertical-align: middle;
  }
	.save{
		  height: 0.8rem;
	    line-height: 0.82rem;
	    color: #fff;
	    border-radius: 3px;
	    background: #c7202a;
	    text-align: center;
	    font-size: 0.28rem;
	    margin: 0.4rem 0 0.4rem 3%;
	    width: 94%;
	}
	.info{
		display: inline-block;
		width: 0.5rem;
		height: 1rem;
		vertical-align: middle;
	}
	.userid{
		background: url(../img/user.png) left center no-repeat;
		background-size: 0.36rem 0.36rem;
	}
	.nickname{
		background: url(../img/nick.png) left center no-repeat;
		background-size: 0.4rem 0.3rem;
	}
	.remain{
		background: url(../img/remain.png) left center no-repeat;
		background-size: 0.39rem 0.35rem;
	}
	.tel{
		background: url(../img/tel.png) left center no-repeat;
		background-size: 0.34rem 0.34rem;
	}
</style>
