<!--个人中心-->
<template>
  <div class="usre_info">
    <load-more v-if="loading" tip="正在加载"></load-more>
    <headTop headTitle="我的恒彩" Settings="true" Email="true" :emialShow=emialShow @setMessage="onSetMessage"></headTop>
    <div class="usre_info_top">
      <div class="user_activity">
        <img class="pic" src="../../assets/images/d/d1.png" alt=""/>
        <div class="accountInfo">
          <p>账号：<span v-text="this.$store.state.account"></span></p>
          <p>余额：<span style="font-size: 0.28rem;">￥<span  v-text="this.$store.state.money"></span></span></p>
        </div>
        <img class="update_code" v-tap="{ methods: updateCode }" src="./img/update.png" alt="">
        <i v-tap="{ methods: accountinfo }" class="account_info"></i>
        <p class="clear"></p>
      </div>
      <ul class="payList clear">
        <li v-tap="{ methods: Recharge }">充值</li>
        <li v-tap="{ methods: Withdrawals }">提款</li>
        <li v-tap="{ methods: BankList }">银行卡</li>
      </ul>
    </div>
    <!--购彩信息-->
    <div class="service">
      <div class="service_tit">购彩信息</div>
      <ul class="service_list">
          <li v-tap="{ methods: _betRecord }">
            <img src="./img/p_icon1.png" alt="">
            投注记录
          </li>
        <li v-tap="{ methods: _chaseRecord }">
          <img src="./img/p_icon2.png" alt="">
          追号记录
        </li>
        <li v-tap="{ methods: _lotteryChange }">
          <img src="./img/p_icon3.png" alt="">
          彩票帐变
        </li>
        <li v-tap="{ methods: _RechargeRecord }">
          <img src="./img/p_icon4.png" alt="">
          充提记录
        </li>
      </ul>
    </div>
    <!--报表管理-->
    <div class="service" v-if="statement">
      <div class="service_tit">报表管理</div>
      <ul class="service_list statement">
        <router-link to="/userInfo/secondaryAgent" tag="li" v-if="this.$store.state.usertype != 0">
          <img src="./img/p_icon5.png" alt="">
          团队管理
        </router-link>
        <router-link to="/userInfo/TeamReport" tag="li" v-if="this.$store.state.usertype != 0">
          <img src="./img/p_icon6.png" alt="">
          团队报表
        </router-link>
        <router-link to="/userInfo/SubordinateRegistration" tag="li" v-if="this.$store.state.usertype != 0">
          <img src="./img/p_icon7.png" alt="">
          下级注册
        </router-link>
        <router-link to="/userInfo/SponsoredLinks" tag="li" v-if="this.$store.state.usertype != 0">
          <img src="./img/p_icon8.png" alt="">
          推广链接
        </router-link>
        <li v-tap="{ methods: _TeamTable }" v-if="this.$store.state.usertype != 0">
          <img src="./img/p_icon15.png" alt="">
          团队总表
        </li>
        <router-link to="/userInfo/DayWage" tag="li" v-if="this.dayWage == 1">
          <img src="./img/p_icon16.png" alt="">
          日工资
        </router-link>
        <router-link to="/userInfo/DayLoss" tag="li" v-if="this.dayLoss == 1">
          <img src="./img/p_icon13.png" alt="">
          日亏损佣金
        </router-link>
        <li v-tap="{ methods: _Dividend }" v-if="this.dividend == 1">
          <img src="./img/p_icon14.png" alt="">
          团队分红
        </li>
      </ul>
    </div>
    <!--其他-->
    <div class="service" style="margin-bottom: 1.5rem;">
      <div class="service_tit">其他</div>
      <ul class="service_list">
        <li v-tap="{ methods: _activity }" class="notice_msg">
          <img src="./img/p_icon12.png" alt="">
          活动中心
        </li>
        <li v-tap="{ methods: _noticeDetails }" class="notice_msg">
          <img src="./img/p_icon9.png" alt="">
          公告中心
          <div class="unread" v-if="noticeShow != 0">{{noticeShow}}</div>
        </li>
        <li v-tap="{ methods: _help }">
          <img src="./img/p_icon10.png" alt="">
          玩法帮助
        </li>
        <li v-tap="{ methods: openurl }">
          <img src="./img/p_icon11.png" alt="">
          联系客服
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import { LoadMore } from 'vux'

  export default {
    data () {
      return {
        loading: true,
        current: 720,
        bankInfo: this.$store.state.bank,
        emialShow: 0,
        noticeShow: 0,
        money: 0,
        dayWage: '',// 日工资
        dayLoss: '', // 日亏损佣金
        dividend: '', // 团队分红
        statement: true
      }
    },
    components: {
      headTop,
      LoadMore
    },
    created () {
      this.$vux.loading.hide()
    },
    mounted () {

      this._getaccout()
      this._statement()
      this.$store.commit('updateUserInfoChildFlag', true)

      this.loading = false
      this.setData()
      this.getAllDetail()

      this.$store.commit('updateMessage', true)
      this.$store.commit('updateNotiveDetails', true)
      this.$store.commit('updateTeamReport', true)
      this.$nextTick(() => {
        let li = document.getElementsByClassName('statement')[0].getElementsByTagName('li')
        this.statement = li.length === 0 ? false : true
      })
    },
    methods: {
      _getaccout() {
        if (this.$store.state.account != null) {
            return
        }
        let account
        if (localStorage.getItem('userName') != null) {
          account = localStorage.getItem('userName')
        } else {
          account = this.$store.state.account
        }
        this.$store.commit('updateUserName', account.toLocaleLowerCase())
      },
      // 是否显示日工资,日亏损佣金，团队分红
      _statement() {
        let httpurl = this.httpUrl('DAYWAGE'),
          daywageData = {
            check: 1
          }
        this.httpAction(httpurl,(res) => {
          if (res.data.status == 200) {
            this.dayWage = res.data.data.isSalary
            this.dayLoss = res.data.data.isLose
            this.dividend = res.data.data.isDividend
            this.$store.commit('updatedayWage', this.dayWage)
            this.$store.commit('updatedayLoss', this.dayLoss)
            this.$store.commit('updatedividend', this.dividend)
          }
        },daywageData)
      },
      _activity () {
        this.$router.push({path: '/activity'})
      },
      accountinfo () {
        this.$router.push({path: '/userInfo/accountinfo'})
      },
      Recharge () {
        this.$router.push({path: '/userInfo/Recharge'})
      },
      _help () {
        this.$router.push({path: '/userInfo/help'})
      },
      _noticeDetails () {
        this.$router.push({path: '/notice/noticeDetails'})
      },
      _SponsoredLinks () {
        this.$router.push({path: '/userInfo/SponsoredLinks'})
      },
      _SubordinateRegistration () {
        this.$router.push({path: '/userInfo/SubordinateRegistration'})
      },
      _TeamReport () {
        this.$router.push({path: '/userInfo/TeamReport'})
      },
      _secondaryAgent () {
        this.$router.push({path: '/userInfo/secondaryAgent'})
      },
      _RechargeRecord () {
        this.$router.push({path: '/userInfo/RechargeRecord'})
      },
      _lotteryChange () {
        this.$router.push({path: '/userInfo/lotteryChange'})
      },
      _chaseRecord () {
        this.$router.push({path: '/userInfo/chaseRecord'})
      },
      _betRecord () {
        this.$router.push({path: '/userInfo/betRecord'})
      },
      _TeamTable () {
        this.$router.push({path: '/userInfo/TeamTable', query:{ team_table: true, dropclick: true }})
      },
      _DayWage () {
        this.$router.push({path: '/userInfo/DayWage'})
      },
      _DayLoss () {
        this.$router.push({path: '/userInfo/DayLoss'})
      },
      _Dividend () {
        this.$router.push({path: '/userInfo/Dividend', query:{ un_click: true, dividend: true }})
      },
      onSetMessage (val) {
        this.emialShow = parseInt(val)
      },
      getAllDetail () {
      let noticeurl = this.httpUrl('NOTICELIST')
        this.httpAction(noticeurl,(res) => {
          let tempData = res.data.data.results
          let templength = 0
          for(let i=0;i<tempData.length;i++){
             if(tempData[i]['unread_id'] == 1){
              templength += 1
             }
          }
          this.noticeShow = templength
        },this.postData)
      },
        setData () {
            let emailurl = this.httpUrl('MESSAGELIST')+'&maxid=0&count=20'
          this.httpAction(emailurl,(res) => {
            let tempData = res.data;
            for(let i=0;i<tempData.result.length;i++){
               if(tempData.result[i]['isview'] == 0){
                this.emialShow = 1
                break
               }
            }
          })
        },
        Withdrawals (){
          let tkyes = this.bankInfo.setsecurity || 'no';
          if(tkyes == 'no'){
            this.$router.push('/userInfo/EnterPwd');
          }else{
            this.$router.push('/userInfo/noPassword');
          }
        },
        BankList (){
          let tkyes = this.bankInfo.setsecurity || 'no';
          if(tkyes == 'no'){
            this.$router.push('/userInfo/EnterPwdBank');
          }else{
            this.$router.push('/userInfo/noPassword');
          }
      },
        // 刷新
        updateCode(){
          this.getMoney()
          document.getElementsByClassName('update_code')[0].style.transform='rotate('+this.current+'deg)';
          this.current+=720;
        },
        getMoney () {
          let moneyurl = this.httpUrl('GETMONEY')
          this.httpAction(moneyurl,(res) => {
            this.money = res.data
            // 提交mutation到Store
            this.$store.commit('updateMoney', this.money)
          },{'flag': 'getmoney'})
      },
        //获取url
          httpUrl(val){
            let app = require('../../../static/hc.json')
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
          openurl(){
          let _this = this
          let lickUrl = 'https://ngmm.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=12397&configID=50&jid=';
          window.open(lickUrl,function(){
            _this.$vux.alert.show({
        content: '联系客服失败'
      })
          });
        }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .usre_info{
    /*margin:1.2rem 0 1.05rem 0;*/
    .notice_msg{
      position: relative;
      .unread{
        position: absolute;
        top:0.2rem;
        right:0.2rem;
        .wh(0.5rem,0.3rem);
        background:#c7202c;
        border-radius: 0.2rem;
        color:#fff;
        line-height: 0.3rem;
        text-align: center;
      }
    }
  }

  .usre_info_top{
    background:#c7202c;
    margin-top: 0.88rem;
    .user_activity{
      position:relative;
      padding:0 0.1rem;
      .account_info{
        position: absolute;
        right:0.3rem;
        top:0.6rem;
        padding: 0.4rem 0.5rem;
        &:after{
          .icon_arrows(0.3rem,0.3rem,#fff,0.2rem,45deg);
        }
      }
      .pic{
        display:block;
        vertical-align: middle;
        .wh(1.2rem,1.2rem);
        border-radius: 50%;
        margin: 0.2rem;
        float: left;
      };
      .accountInfo{
        padding-top: 0.4rem;
        margin-left:0.1rem;
        float:left;
        p{
          color: #fff;
          line-height:0.42rem;
        }
      }
      .update_code{
        width:0.3rem;
        margin:0.9rem 0 0 0.11rem;
        transition: transform .5s;
        -webkit-transition: -webkit-transform .5s;
        display:block;
        float:left;
      }
    }
  }

  .payList{
    padding:0.3rem 0;
    border-top:1px solid #fff;
    border-bottom:1px solid #e8e8e8;
    text-align: center;
    background: #fff;
    li{
      display: inline-block;
      margin-right:0.2rem;
      border:1px solid #c7202a;
      border-radius:3px;
      .wh(2.1rem,0.6rem);
      line-height:0.6rem;
      text-align:center;
      font-weight:600;
      color: #c7202a;
      &:active{
        background:#c7202a;
        color:#fff;
        a{
          color:#fff
        }

      }
    }
    li:first-child{
        margin-left: 0.2rem
      }
  }
  .service{
    background:#fff;
    border-top:1px solid #e8e8e8;
    border-bottom:1px solid #e8e8e8;
    margin-top: 0.18rem
  }
  .service_tit{
    border-bottom:1px solid #e8e8e8;
    font-size:0.26rem;
    color: #525252;
    height: 0.8rem;
    line-height:0.82rem;
    text-indent:0.18rem;
  }
  .service_list{
    /*text-align:center;*/
    background: #fff;
    li{
      display:inline-block;
      box-sizing:border-box;
      .wh(20%,1.5rem);
      text-align:center;
      line-height: 2;
      padding-top:0.1rem;
      margin:0.1rem 0.15rem;
      font-size:0.22rem;
      color:#5c5c5c;
      img{
        display:block;
        /*.wh(0.6rem,0.6);*/
        height:0.6rem;
        margin:0.13rem auto;
        background:#fff;
      }
    }
  }

</style>
