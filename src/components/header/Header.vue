<template>
  <div>
    <div id="head_top">
      <section class="header_goback" v-if="goBack" v-tap="{ methods: _back }">
        <img src="./goBack.png" alt="">
      </section>

      <section class="header_goback" v-if="goBacks">
        <img src="./goBack.png" alt="">
      </section>

      <section class="title_head" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>

      <section class="head_server" v-if="contactServer" v-tap="{ methods: openurl }">
        <span class="server_span">{{contactServer}}</span>
      </section>

      <section class="head_server" v-if="contactMethod" v-tap="{ methods: trial }">
        <span class="server_span">{{contactMethod}}</span>
      </section>

      <section v-tap="{ methods: _message}"  class="email" v-if="Email">
        <span class="emialshow" v-if='emialShow > 0'></span>
        <img src="../userInfo/img/email.png" class="email">
      </section>
      <section v-tap="{ methods: _settings}" class="settings" v-if="Settings">
        <img src="../userInfo/img/settings.png" class="settings">
      </section>

      <section v-tap="{ methods: _agreementExplain}" v-if="AgreementExplain">
        <img src="../userInfo/img/explain.png" class="explain">
      </section>

      <section v-tap="{ methods: _close}" v-if="close">
        <img src="../userInfo/img/close.png" class="close">
      </section>

      <slot name="changelottery"></slot>
      <slot name="lottery"></slot>
      <slot name="carte"></slot>
      <slot name="carte_list"></slot>
      <slot name="email"></slot>
      <slot name="settings"></slot>
      <slot name="AgreementExplain"></slot>
      <slot name="close"></slot>
      <slot name="goBacks"></slot>
      <slot name="help"></slot>
      <slot name="affirm"></slot>

    </div>
  </div>
</template>

<script>
  export default {
    props: ['headTitle', 'goBack', 'contactServer', 'Email', 'Settings', 'AgreementExplain', 'close', 'goBacks', 'emialShow','contactMethod', 'textExplain'],
    methods: {
      _settings () {
        this.$router.push({path: '/settings'})
      },
      _agreementExplain() {
        this.$router.push({path: '/userInfo/Agreement/AgreementExplain', query:{textExplain: this.textExplain}})
      },
      _close() {
        this.$router.push({path: '/userInfo'})
     },
      _message () {
        this.$router.push({path: '/notice/message'})
      },
      _back () {
        this.$router.go(-1)
      },
    	openurl(){
    			let _this = this
		    	let lickUrl = 'https://ngmm.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=12397&configID=50&jid=';
		    	window.open(lickUrl,function(){
			    		_this.$vux.alert.show({
								content: '联系客服失败'
							})
	    	});
	    },
      trial () {
        let lotteryBet = this.$store.state._lotteryBet
        let nav = this.$store.state.nav
        if (lotteryBet[nav] instanceof Array) {
          this.$router.push({path: '/home/selectCody'})
        } else {
          this.$vux.alert.show({
            title: '温馨提示',
            content: lotteryBet[nav].msg
          })
          return
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/style';

  #head_top{
    background-color: #c7202c;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width:100%;
    height:0.88rem;
    .header_goback{
      left: 0.4rem;
      margin-left: .4rem;
      width:0.5rem;
      img{
        z-index: 500 !important;
        .wl(0.38rem,0.12rem);
        .jz;
        padding:0.2rem 0.4rem 0.2rem 0.2rem;
      }
    }
    .title_head{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;
      .title_text{
        font-size: 0.32rem;
        color: #fff;
        text-align: center;
      }
    }
    .head_server{
      right: 0.4rem;
      border:1px solid #fff;
      .borderRadius(0.05rem);
      padding:0.08rem 0.2rem;
      color: #fff;
      /*定位上下居中*/
      .jz;
        .server_span{
          color: #fff;
        }
    }
    .email{
      position: relative;
      .wl(0.4rem,0);
      .jz;
      padding: 0.2rem 0.4rem;
      .emialshow{
        position: absolute;
        right: 0.34rem;
        top: -0.03rem;
        display: inline-block;
        .wh(0.12rem, 0.12rem);
        .borderRadius(50%);
        background:#f1f708;
      }
    }
    .settings{
      .wr(0.4rem,0);
      .jz;
      padding: 0.2rem 0.4rem;
    }
    .close{
      .wl(0.55rem,1rem);
      .jz;
      padding: 0.2rem 0.4rem 0.18rem 0.2rem;
    }
    .explain{
      .wr(0.55rem,0);
      .jz;
      padding: 0.2rem 0.4rem;
    }
  }
</style>
