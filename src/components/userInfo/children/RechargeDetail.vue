<!--选择充值方式-->
<template>
  <div>
    <headTop headTitle="选择充值方式" goBack='true'></headTop>
    <div class="header_app_v">
    	<p class="tips" v-show='tip'>请自行打开任意银行，汇款充值即可！</p>
      <div class="rechargeBox">
        <div class="boxList clear">
          <div class="rechargetit">充值金额</div>
          <div class="rechargetR">{{bankInfo.amount}}</div>
          <p @click="_copys('amount_hook',bankInfo.amount)" class="button_copy amount_hook">点击复制</p>
        </div>
        <div class="boxList">
          <div class="rechargetit">收款账号</div>
          <div class="rechargetR copys">{{bankInfo.acc_bankacc == '' ? (bankInfo.email == '' ? bankInfo.spr_account : bankInfo.email) : bankInfo.acc_bankacc}}</div>
          <p @click="_copys('acc_bankacc_hook',bankInfo.acc_bankacc == '' ? (bankInfo.email == '' ? bankInfo.spr_account : bankInfo.email) : bankInfo.acc_bankacc)" class="button_copy acc_bankacc_hook">点击复制</p>
        </div>
        <div class="boxList">
          <div class="rechargetit">收款人</div>
          <div class="rechargetR copys">{{bankInfo.acc_name}}</div>
          <p  @click="_copys('acc_name_hook',bankInfo.acc_name)" class="button_copy acc_name_hook">点击复制</p>
        </div>
        <div class="boxList">
          <div class="rechargetit">附言</div>
          <div class="rechargetR copys">{{bankInfo.key}}</div>
          <p @click="_copys('key_hook',bankInfo.key)" class="button_copy key_hook">点击复制</p>
        </div>
      </div>
      <div class="fuyan copys">
          <dl>
            <dt>充值说明</dt>
            <dd>1.复制“附言内容”粘贴到工行“附言”栏内，否则充值无法到账</dd>
            <dd>2.充值附言随机生成，一个附言只能充值一次，重复使用充值将无法到账</dd>
            <dd>3.收款账户和E-mail会不定时更换，请再获取最新信息后充值</dd>
            <dd>4.登录工行网银后，点击“转账汇款”后选择“E-mail”汇款</dd>
            <dd>5.平台工行充值只支持工行网银转账</dd>
          </dl>
      </div>
      <p class="nextStep" v-tap="{ methods:openUrl}" v-show='showcontent'>立即支付</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  export default {
    components: {
      headTop
    },
    data () {
      return {
        bankInfo: {},
        tip:false,
        showcontent:true
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$vux.toast.hide()
      next(true)
    },
    mounted () {
      let getParam = this.$route.query.data
      if(getParam.bankname == 'abc'){
      	this.tip = true
      	this.showcontent = false
      }
      this.bankInfo = getParam
    },
    methods: {
      _copys(_class,val){
        let _this = this
        let clipboard = new Clipboard('.'+ _class,{
          text:function() {
            return val;
          }
        });
        clipboard.on('success', function(e) {
          _this.$vux.toast.show({
            text: '复制成功'
          })
        });
        clipboard.on('error', function(e) {
         
        });
      },
      openUrl () {
       window.open(this.bankInfo.bank_url);
      }
    }
  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';
  .topPadding{
    height:0.88rem;
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
  .rechargeBox>.boxList{
      overflow: hidden;
      width:100%;
      line-height:0.7rem;
      height:auto;
      border-bottom:1px solid #dddddd;
  }
  .boxList>div{
    float: left;
    line-height: 0.7rem;
    height:0.7rem;
    font-size: 0.28rem;
  }
  .rechargetit{
    width:25%;
    text-indent: 0.32rem;
  }
  .rechargetR{
    width:55%;
    text-align:left;
  }
 .button_copy{
   box-sizing: border-box;
   height:0.5rem;
   width: 18%;
   line-height: 0.5rem;
   text-align: center;
   float:right;
   border:1px solid #aaa;
   .borderRadius(0.05rem);
   margin: 0.1rem 0.1rem 0 0;
   &:active{
     background: #ddd;
   }
 }
  .openquck,.openbank{
    i{
      background: url(../img/close_icon.png) no-repeat 50% center;
      background-size:auto 32%;
    }
  }
  .closequck,.closebank{
    i{
      background: url(../img/open_icon.png) no-repeat 50% center;
      background-size:auto 32%;
    }
  }
  .nextStep{
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    border-radius: 3px;
    background:#c7202a;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
  }
  .fuyan{
    width: 90%;
    margin-left: 5%;
    dt{
      color: #c7202a;
      font-size:0.28rem;
      margin-top:0.5rem;
      margin-bottom: 0.2rem;
    }
    dd{
      color: #7c7c7c;
      font-size:0.26rem;
      line-height:0.36rem;
    }
  }

  </style>
