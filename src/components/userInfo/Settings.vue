<!--设置-->
<template>
  <div>
    <headTop headTitle="设置" goBack='true'></headTop>
    <div class="topPadding" :class="playPlatform"></div>
    <div class=" header_app_v">
      <ul class="rechargeBox">
        <li v-tap="{ methods: _modifyPwd }">
          <p class="rechargetit setpsw">登录密码</p>
          <p class="rechargetR"><i></i></p>
          <br class="clear">
        </li>
        <li v-tap="{ methods:tkpwd }">
          <p class="rechargetit setzpsw">提款密码</p>
          <p class="rechargetR"><i></i></p>
        </li>
        <!--<li>-->
        <!--<p class="rechargetit setQuestion">密保问题</p>-->
        <!--<p class="rechargetR"><i></i></p>-->
        <!--</li>-->
        <li v-tap="{ methods:updateVersion }" v-if="playPlatform!=='web'">
          <p class="rechargetit update">版本更新</p>
          <p class="rechargetR"><i></i></p>
        </li>
      </ul>
      <p class="outLogin" v-tap="{ methods:exit }">退出账号</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'

  export default {
    components: {
      headTop
    },
    data() {
      return {
        updateV: true
      }
    },
    methods: {
      _modifyPwd() {
        this.$router.push({path: '/settings/modifyPwd'})
      },
      exit() {
        let _this = this
        this.$vux.confirm.show({
          content: '确定退出吗',
          onConfirm() {
            let logouturl = _this.httpUrl('LOGOUT')
            _this.$vux.loading.show({
              text: '退出中'
            })
            _this.httpAction(logouturl, (res) => {
              _this.$vux.loading.hide()
              let tempdata = res.data
              if (tempdata.status == 200) {
                _this.$store.commit('updataShowToast', true)
                _this.mUtils.removeStore('pswd')
                _this.$router.replace('/login/')
              } else {
                _this.$vux.alert.show({
                  content: '网络失败'
                })
              }
            })
          }
        })
      },
      tkpwd() {
        let bankStatus = this.$store.state.bank
        if (bankStatus.setsecurity != 'no') {
          this.$router.replace('/userInfo/settkpwd');
        } else {
          this.$router.replace('/settings/duplicatePwd');
        }
      },
      updateVersion() {
        if (this.updateV) {
          this.updateV = false
          let getStore = require('../../../static/version.json')
//        let stateVersion = this.$store.state.version
//        let appData = require('../../../static/ios_hc.json')
//        let getversion = appData.app_ver.version
//        let updateUrl = appData.app_ver.url
          let httpurl = 'https://dn-outwitinc.qbox.me/hcol/ios_hc_new.json?ver=' + new Date().getTime()
          this.httpAction(httpurl, (res) => {
            this.updateV = true
            let getversion = res.data.app_ver.version
            let updateUrl = res.data.app_ver.url
            if (getStore.version == getversion) {
              this.$vux.alert.show({
                title: '提示',
                content: '您已经是最新版本'
              })
            } else {
              this.$vux.confirm.show({
                title: '提示',
                content: '有版本更新了，是否立即更新！',
                confirmText: '立即更新',
                cancelText: '取消',
                onCancel() {

                },
                onConfirm() {
                  window.location = updateUrl
                }
              })
            }
          })
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .topPadding {
    height: 0.28rem;
  }

  br {
    line-height: 0;
    height: 0px;
  }

  .main {
    margin-top: 0.88rem;
  }

  .rechargeBox > li {
    overflow: hidden;
    width: 100%;
    height: 0.7rem;
    line-height: 0.71rem;
    height: auto;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    background: #fff;
    margin-top: 0.2rem;

  }

  .rechargeBox .setpsw {
    background: url(img/setpsw.png) no-repeat 10% center;
    background-size: 0.3rem auto;
  }

  .setzpsw {
    background: url(img/setzpsw.png) no-repeat 10% center;
    background-size: 0.3rem auto;
  }

  .setQuestion {
    background: url(img/setqa.png) no-repeat 10% center;
    background-size: auto 60%
  }

  .update {
    background: url(img/banben.png) no-repeat 9% center;
    background-size: 0.32rem auto;
  }

  li > p {
    float: left;
    line-height: 0.7rem;
    height: 0.7rem;
    font-size: 0.28rem;
    position: relative;
  }

  .rechargetit {
    width: 50%;
    text-indent: 12%;
  }

  .rechargetR {
    width: 50%;
    i {
      .icon_arrows(0.23rem, 0.4rem, #ccc, 0.2rem, 45deg);
    }
  }

  .outLogin {
    height: 0.8rem;
    line-height: 0.82rem;
    color: #fff;
    border-radius: 3px;
    background: #c7202c;
    text-align: center;
    font-size: 0.28rem;
    margin-top: 0.4rem;
    width: 94%;
    margin-left: 3%;
  }


</style>
