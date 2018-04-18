<!--修改提款密码-->
<template>
  <div>
    <headTop headTitle="修改提款密码" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
           <p class="rechargetit">旧密码</p>
           <p class="rechargetR triangle_down"><input type="password" placeholder="请输入提款密码" v-model='oldPass' autocapitalize="off" autocorrect="off"></p>
        </li>
        <li class="tipsBox">密码由字母和数字组成<i>6</i>-<i>16</i>个字符；且必须包含数字和字母</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">新密码</p>
           <p class="rechargetR"><input type="password" placeholder="请输入您的新提款密码" v-model='newPass' autocapitalize="off" autocorrect="off"></p>
        </li>
        <li>
           <p class="rechargetit">再次确认</p>
           <p class="rechargetR"><input type="password" placeholder="请再次您的新提款密码" v-model='confirmPass' autocapitalize="off" autocorrect="off"></p>
        </li>
      </ul>
      <p class="submit" v-tap="{ methods: ok }">提交</p>
      <p class="findPwd" to="/settings/findpwd" v-tap="{ methods: findPwd }">提款密码找回</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
//  import AddressName from '../../address/Address.vue'

  export default {
      components:{
        headTop
//        AddressName
      },
      data(){
          return{
							oldPass:'',
							newPass:'',
							confirmPass:''
          }
      },
      methods: {
      		findPwd(){
      				let bankStatus = this.$store.state.bank;
      				if(bankStatus.setquestion != 'no'){
									this.$router.replace('/settings/setquestion');
							}else{
									this.$router.replace('/settings/findpwd');
							}
      		},
					ok(){
							let okpass =  /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/
							if(!okpass.test(this.newPass)){
									this.$vux.alert.show({
										  content: '密码格式不正确'
									})
									return
							}
							let pwdurl = this.httpUrl('UPDATATKPASS');
            this.$vux.loading.show({
              text: '修改中'
            })
							this.httpAction(pwdurl,(res)=>{
                this.$vux.loading.hide()
									let tempData = res.data;
									if(tempData.status == 200){
										let _this = this
										this.$vux.alert.show({
											  content: '修改成功',
											  onHide () {
												  	_this.$router.replace('/settings')
												}
										})
									}else{
										this.$vux.alert.show({
											  content: tempData.msg
										})
									}

	      			},{changetype:'secpass',oldpass:this.oldPass,newpass:this.newPass,confirm_newpass:this.confirmPass})
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
    float:left;
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    border-radius: 3px;
    background:#c7202c;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:46%;
    margin-left: 3%;
    margin-right:2%;
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
