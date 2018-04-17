<!--修改登录密码-->
<template>
  <div>
    <headTop headTitle="修改登录密码" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
           <p class="rechargetit">旧密码</p>
           <p class="rechargetR triangle_down"><input type="password" placeholder="请输入登录密码" v-model='oldpwd' autocapitalize="off" autocorrect="off"></p>
        </li>
        <li class="tipsBox">密码由字母和数字组成<i>6</i>-<i>16</i>个字符；且必须包含数字和字母</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">新密码</p>
           <p class="rechargetR"><input type="password" placeholder="请输入您的新登录密码" v-model='newpwd' autocapitalize="off" autocorrect="off"></p>
        </li>
        <li>
           <p class="rechargetit">再次确认</p>
           <p class="rechargetR"><input type="password" placeholder="请再次您的新登录密码" v-model='newconfirmpwd' autocapitalize="off" autocorrect="off"></p>
        </li>
      </ul>
      <p class="submit" v-tap="{ methods: changepwd }">提交</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import { md5 } from 'vux'
//  import AddressName from '../../address/Address.vue'

  export default {
      components:{
        headTop
//        AddressName
      },
      data(){
          return{
						oldpwd:'',
						newpwd:'',
						newconfirmpwd:''
          }
      },
      mounted(){
    	},
      methods: {
				changepwd(){
					let pwdurl = this.httpUrl('CHANGEPASS');
					let userInfo = this.$store.state.account;
					if(!this.validate()){
						return
					}
					let reqdata = {};
					let httpnewpass = md5(this.newpwd);
					let httpconfirmpass = md5(this.newconfirmpwd);
        	let httpoldpass = md5(this.oldpwd);
					reqdata= {'confirm_newpass':httpconfirmpass,
							flag:"H5",'newpass':httpnewpass,'oldpass':httpoldpass,'type':1,'username':userInfo
					};
          this.$vux.loading.show({
            text: '修改中'
          })
					this.httpAction(pwdurl,(res)=>{
            this.$vux.loading.hide()
      			var tempdata = res.data;
      			let _this = this
      			if(tempdata.msg == 'success'){
      					this.$vux.alert.show({
										  content: '修改成功',
										  onHide () {
										  	_this.$router.replace('/settings')
										  }
								})
      			}else{
      				this.$vux.alert.show({content: tempdata.msg})
      			}
      		},reqdata)
				},
				validate(){
					var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/;
					if(this.oldpwd == ''){
            this.$vux.alert.show({
              title: '温馨提示',
              content: '密码不能为空'
            })
						return false
					}
					if(this.newpwd == ''){
            this.$vux.alert.show({
              title: '温馨提示',
              content: '密码不能为空'
            })
						return false
					}
					if(this.newconfirmpwd == ''){
            this.$vux.alert.show({
              title: '温馨提示',
              content: '密码不能为空'
            })
						return false
					}
					if(!reg.test(this.newconfirmpwd)){
            this.$vux.alert.show({
              title: '温馨提示',
              content: '新密码格式不对'
            })
						return false
					}
					if(this.newpwd !== this.newconfirmpwd){
            this.$vux.alert.show({
              title: '温馨提示',
              content: '两次密码输入不符'
            })
						return false
					}
					return true
				},
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
      }

  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

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
    width:20%;
    text-indent:0.28rem;
  }
  .rechargetR{
    width:80%;
    text-align: right;
    select{
      border:none;
      background:none;
      width: 100%;
      height: 100%;
    }
  }

  .submit{
    height:0.8rem;
    line-height:0.81rem;
    color: #fff;
    border-radius: 3px;
    background:#c7202c;
    text-align:center;
    font-size:0.28rem;
    width:94%;
    margin: 0.4rem auto;
  }
  .findPwd{
    float:left;
    height:0.8rem;
    line-height:0.8rem;
    color: #000;
    border-radius: 3px;
    background:#fff;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:46%;
  }
  </style>
