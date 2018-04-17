<!--修改提款密码-->
<template>
  <div>
    <headTop headTitle="设置密保问题" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
           <p class="rechargetit">问题一</p>
           <p class="rechargetR">
             <select id='answerOne'>
               <option value="-1">请选择密保问题</option>
               <option value='4'>您母亲的姓名是？</option>
               <option value='8'>您配偶的生日是？</option>
               <option value='13'>您的学号（或工号）是？</option>
               <option value='5'>您母亲的生日是？</option>
               <option value='12'>您高中班主任的名字是？</option>
               <option value='1'>您父亲的姓名是？</option>
               <option value='10'>您小学班主任的名字是？</option>
               <option value='2'>您父亲的生日是？</option>
               <option value='7'>您配偶的姓名是？</option>
               <option value='11'>您初中班主任的名字是？</option>
               <option value='16'>您最熟悉的童年好友名字是？</option>
               <option value='17'>您最熟悉的学校宿舍室友名字是？</option>
               <option value='18'>对您影响最大的人名字是？</option>
             </select>
           </p>
        </li>
        <li>
           <p class="rechargetit">答案</p>
           <p class="rechargetR"><input type="text" placeholder="请输入答案" v-model='questionOne'></p>
        </li>
        <li class="tipsBox">最长25个字符</li>
        <li>
           <p class="rechargetit">问题二</p>
           <p class="rechargetR">
             <select id='answerTwo'>
               <option value="-1">请选择密保问题</option>
               <option value='4'>您母亲的姓名是？</option>
               <option value='8'>您配偶的生日是？</option>
               <option value='13'>您的学号（或工号）是？</option>
               <option value='5'>您母亲的生日是？</option>
               <option value='12'>您高中班主任的名字是？</option>
               <option value='1'>您父亲的姓名是？</option>
               <option value='10'>您小学班主任的名字是？</option>
               <option value='2'>您父亲的生日是？</option>
               <option value='7'>您配偶的姓名是？</option>
               <option value='11'>您初中班主任的名字是？</option>
               <option value='16'>您最熟悉的童年好友名字是？</option>
               <option value='17'>您最熟悉的学校宿舍室友名字是？</option>
               <option value='18'>对您影响最大的人名字是？</option>
             </select>
           </p>
        </li>
        <li>
           <p class="rechargetit">答案</p>
           <p class="rechargetR"><input type="text" placeholder="请输入您的答案" v-model='questionTwo'></p>
        </li>
      </ul>
      <!-- <p class="submit">提交</p> -->
      <p class="submit" v-tap="{ methods: ok }">提交</p>

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
           		questionOne:'',
           		questionTwo:''
          }
      },
      methods: {
        	ok(){
        			if(!this.validata()){
        				return;
        			};
        			let quesOne = document.getElementById('answerOne').value;
        			let quesTwo = document.getElementById('answerTwo').value;
        			let pwdurl = this.httpUrl('SETQUESTION');
        			let reqdata = {dna_ques_1:quesOne,ans1:this.questionOne,dna_ques_2:quesTwo,ans2:this.questionTwo,flag:'postdata'};
            this.$vux.loading.show({
              text: '修改中'
            })
							this.httpAction(pwdurl,(res)=>{
                this.$vux.loading.hide()
		      			var tempdata = res.data;
		      			if(tempdata.status == 200){
		      					let bankStatus = this.$store.state.bank;
						  			bankStatus.setquestion = 'no';
						  			this.$store.commit('updatebanks',bankStatus);
						  			let _this = this
						  			this.$vux.alert.show({
											  content: '设置成功',
											  onHide () {
											  	_this.$router.replace('/settings/duplicatePwd');
											  }
										})
		      			}else{
		      					this.$vux.alert.show({content: tempdata.msg})
		      			}
		      		},reqdata)
        	},
        	validata(){
        			if(document.getElementById('answerOne').value == -1){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请选择密保问题一'
                })
        					return false;
        			}
        			if(document.getElementById('answerTwo').value == -1){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请选择密保问题二'
                })
        					return false;
        			}
        			if(this.questionOne == ''){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请输入密保问题一答案'
                })
        					return false;
        			}
        			if(this.questionTwo == ''){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请输入密保问题二答案'
                })
        					return false;
        			}
        			return true;
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
    width:20%;
    text-indent:0.28rem;
  }
  .rechargetR{
    width:75%;
    text-align: left;
    text-indent: 0.4rem;
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
    width:94%;
    margin-left: 3%;
  }

  </style>
