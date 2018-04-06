<!--银行卡信息-->
<template>
  <div>
    <headTop headTitle="银行卡信息" goBack='true'></headTop>
    <div class="header_app">
      <ul class="userBox">
        <li>
          <p class="rechargetit">开户行</p>
          <p class="rechargetR">{{bankInfo.branch}}</p>
        </li>
        <li>
          <p class="rechargetit">卡号</p>
          <p class="rechargetR">{{bankInfo.account}}</p>
        </li>
        <li>
           <p class="rechargetit">绑定时间</p>
           <p class="rechargetR">{{bankInfo.atime}}</p>
        </li>
      </ul>
      <p class="lockCard" v-tap="{ methods:lockBank}">锁定银行卡</p>
      <p class="unbindCard"  v-tap="{ methods:openBank}">解绑银行卡</p>
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
          	bankInfo:{},
          	lockStatus:''
          }
      },
      mounted(){
      	this.bankInfo = JSON.parse(this.$route.query.data);
      	this.lockStatus = this.$store.state.lockStatus;
      },
      methods: {
					lockBank(){
							if(this.lockStatus == 3){
								this.$vux.alert.show({
									  content: '银行卡已被锁定'
								})
								return;
							}
						  this.$router.push('/userInfo/bankcheckTwo');
					},
					openBank(){
							if(this.lockStatus == 3){
								this.$vux.alert.show({
									  content: '银行卡已被锁定'
								})
								return;
							}
							this.$router.push({path:'/userInfo/bankcheckThree',query:{'bankId':this.bankInfo.id}});
					}
      }

  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

  .main{
    padding-top:0.05rem;
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
    width:50%;
    text-indent:10%;
  }
  .rechargetR{
    width:42%;
    text-align: right;

  }

  .lockCard{
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
  .unbindCard{
    height:0.8rem;
    line-height:0.8rem;
    color: #000;
    border-radius: 3px;
    background:#fff;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
  }

  </style>
