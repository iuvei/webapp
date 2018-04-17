<!--修改提款密码-->
<template>
  <div>
    <headTop headTitle="回答密保问题" goBack='true'></headTop>
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
      </ul>
      <!-- <p class="submit">提交</p> -->
      <p class="submit" v-tap="{ methods:ok }">提交</p>

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
           		ques_num:{},
           		ques_index:''
          }
      },
      mounted(){
      	this.getIfpwd();
      },
      methods: {
      		getIfpwd(){
      			let pwdurl = this.httpUrl('IFSETQUES')
      			this.httpAction(pwdurl,(res)=>{
      					var tempData = res.data;
      					if(tempData.status == 200){
      							this.ques_num = tempData.data;
      					}else{
      						this.$vux.alert.show({
								  content: '网络异常!'
							})
      					}
      			})
      		},
        	ok(){
        			if(!this.validata()){
        				return;
        			};
        			let quesOne = document.getElementById('answerOne').value;
        			for(var val in this.ques_num){
        					if(this.ques_num[val] == quesOne){
        							this.ques_index = val.substring(val.length-1,val.length);
        					}
        			}
        			let quesOneAns = document.getElementById('answerOne');
        			quesOneAns = quesOneAns.options[quesOneAns.selectedIndex].text;
        			let pwdurl = this.httpUrl('ANSWERQUES');
        			let reqdata = {dna_ques:quesOne,ans:this.questionOne,nextcon:'user',nextact:quesOneAns,flag:'check',ques_num:this.ques_index}
							this.httpAction(pwdurl,(res)=>{
									var tempdata = res.data;
									if(tempdata.status == 200){
										let _this = this
										this.$vux.alert.show({
											  content: '回答成功',
											  onHide () {
											  	_this.$router.replace({path:'/userInfo/SecSetpwd',query:{checkValue:tempdata.data.check}});
											  }
										})
									}else{
										this.$vux.alert.show({
										  content: tempdata.msg
										})

									}
		      		},reqdata)
        	},
        	validata(){
        			if(document.getElementById('answerOne').value == -1){
        					this.$vux.alert.show({
							  content: '请选择密保问题'
							})
        					return false;
        			}
        			if(this.questionOne == ''){
        					this.$vux.alert.show({
							  content: '请输入密保问题答案'
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
      input{
        width: 94%;
      }
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
    text-align: right;
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
