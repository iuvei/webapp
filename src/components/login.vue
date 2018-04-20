<!--登录-->
<template>
  <div class="login" id="login">
    <main>
      <div class="log-logo" :class="playPlatform"><img :src='img.logo'></div>
      <div class="log-user" :class="playPlatform" @keydown='keyDownLogin'>
        <p class="userName">
          <span></span>
          <input type="text" placeholder="用户名" :class="'log-input' + (account==''?' log-input-empty':'')"
                 v-model="account" autocapitalize="off" autocorrect="off">
        </p>
        <div class="passWord">
          <span></span>
          <input ref="opneEyes" type="password" placeholder="密码"
                 :class="'log-input' + (password==''?' log-input-empty':'')" v-model="password" autocapitalize="off"
                 autocorrect="off">
          <div class="bigEyes" v-tap="{methods:openPassword}">
            <div :class="['openPs',{'displayPw':openPw}]"></div>
          </div>
          <div class="bigClear" v-tap="{methods:clearPassword}">
            <div class="Clear"></div>
          </div>
        </div>
        <div>
          <div class="remberPw clear" :class="playPlatform">
            <div class="right" v-tap="{methods: remberPassword}">
              <div style="display: inline-block;vertical-align: middle"
                   :class="['remberPw_check',{'remberPw_checked':checkPw}]"></div>
              <span style="vertical-align:middle;">记住密码</span>
            </div>
            <!--<div class="right" v-tap="{methods: register}">-->
            <!--<div style="display: inline-block;vertical-align: middle" class="registerStyle"></div>-->
            <!--<span style="vertical-align:middle; text-decoration:underline">快速注册</span>-->
            <!--</div>-->
          </div>
        </div>
        <a href="javascript:;" class="log-btn" v-tap="{ methods:login }" disabled>
          {{loginText}}
        </a>
      </div>
    </main>
    <div class="selectPc_web" v-if="playPlatform==='web'">
      <ul class="pc_web_list clear">
        <li class="web_style">
          <span class="font_size">手机版</span>
        </li>
        <li class="line"></li>
        <li v-tap="{ methods: _pc}" class="pc_style">
          <span class="font_size">电脑版</span>
        </li>
      </ul>
    </div>
    <p id="copyright" class="copyright" :class="playPlatform">Copyright &copy; 2014 - 2017 恒彩娱乐版权所有</p>
  </div>
</template>

<script>
  import {md5} from 'vux'

  export default {
    data() {
      return {
        img: {
          logo: require('./img/logo.png')
        },
        loginText: '登录',
        footerText: true,
        isLoging: false,
        account: this.mUtils.getStore('userName'),
        password: '',
        sess: '',
        valueFlag: false,
        checkPw: this.$store.state.checkPw,
        openPw: false,
        clear: '',
        times: 0,
        appUpdata: false,
        clickFlag: true
      }
    },
    mounted() {
      // if(window.plus){}else{
      //   document.addEventListener('plusready',function () {})
      // }
      if (sessionStorage.getItem('sess') && this.playPlatform === 'web') {
        sessionStorage.removeItem('sess')
      }

      // 是否记住密码展示密码
      if (this.mUtils.getStore('userName') && this.mUtils.getStore('pswd')) {
        this.account = this.mUtils.getStore('userName');
        this.password = this.mUtils.getStore('pswd');
        this.checkPw = true
      }
      this.$store.dispatch('hideNavbar')
      this.loginText = '登录'
      // 提交mutation到Store
      this.$store.commit('updateHome', 1)
      this.$store.commit('updateLotteryCenter', 1)
      this.$store.commit('updateTrend', 1)
      this.$store.commit('updateAjax', true)

      this.$nextTick(() => {
        this.clickFlag = this._getUpdate()
        if (this.playPlatform !== 'web') {
          this.objBlur()
          this.$store.commit('updateHttpFlag', false)
        }
      })
    },
    methods: {
      objBlur(times) {
        let obj = document.getElementsByTagName('input'),
          timess = times || 300,
          docTouchend = function (event) {
            if (event.target.tagName.toLocaleLowerCase() != 'input') {
              setTimeout(function () {
                for (let i = 0; i < obj.length; i++) {
                  obj[i].blur()
                  document.body.scrollTop = 0
                }
                document.removeEventListener('touchend', docTouchend, false)
              }, timess);
            } else {
              document.removeEventListener('touchend', docTouchend, false)
            }
          }
        if (obj) {
          for (let i = 0; i < obj.length; i++) {
            obj[i].addEventListener('focus', function () {
              document.addEventListener('touchend', docTouchend, false)
            }, false)
            obj[i].addEventListener('keyup', function (e) {
              if (event.keyCode == 13) {
                setTimeout(function () {
                  for (let i = 0; i < obj.length; i++) {
                    obj[i].blur()
                  }
                }, 300);
              }
            })
          }
        }
      },
      _pc() {
        let urlList = [
          'https://www.slxwhg.com',
          'https://xtkjcc.com',
          'https://www.xtkjcc.com',
          'https://gdlyjj.com',
          'https://www.gdlyjj.com',
          'https://bdhdjx.com',
          'https://www.bdhdjx.com',
          'https://lyxljk.com',
          'https://www.lyxljk.com',
          'https://soyook.com',
          'https://www.soyook.com'
        ]
        let j = Math.floor(Math.random() * urlList.length)
        window.location.href = urlList[j]
      },

      // 记住密码
      remberPassword() {
        this.checkPw = !this.checkPw
        this.$store.commit('remberPassword', this.checkPw)
      },
      // 展示密码
      openPassword(params) {
        this.openPw = !this.openPw
        this.openPw ? this.$refs.opneEyes.type = "text" : this.$refs.opneEyes.type = "password"
      },
      // 清除密码
      clearPassword(params) {
        this.$refs.opneEyes.value = ""
        this.password = ""
        this.valueFlag = true
      },
      keyDownLogin() {
        if (event.keyCode == 13) { // 回车键的键值为13
          this.login()
        }
      },
      // 登录逻辑
      login() {
        if (this.account !== '' && this.password !== '') {
          this.toLogin()
        } else if (this.account === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '<div>账户名不能为空</div>'
          })
        } else if (this.password === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '<div>密码不能为空</div>'
          })
        }
      },
      // 登录请求
      toLogin() {
        if (this.clickFlag) {
          this.clickFlag = false
          if (this.$store.getters.getAvailable == '0' && this.playPlatform === 'web') {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: '系统维护中',
              onHide() {
                _this.clickFlag = true
              }
            })
            return
          }
          clearTimeout(this.clear)
          // 密码的加密
          let psw = md5('') + md5(this.password)
          let password_sha = md5(psw)

          // 需要想后端发送的登录参数
          let loginParam = {
            account: this.account,
            password_sha
          }
          // 设置在登录状态
          this.isLoging = true
          this.loginText = '登录中...'
          if (this.$store.state.server == null) {
            this.clear = setTimeout(() => {
              this.clickFlag = true
              if (this.times < 60) {
                this.toLogin()
              } else {
                let _this = this
                this.$vux.alert.show({
                  title: '提示',
                  content: '登录超时，请重新登录',
                  onShow() {
                    clearTimeout(_this.clear)
                    _this.loginText = '登录'
                  }
                })
              }
              this.times++
            }, 1000)
            return
          }
          let httpurl = this.$store.state.server + this.mUtils.interFace('LOGIN')
          this.httpAction(httpurl, (res) => {
            this.clickFlag = true
            this.loginText = '登录'
            this.$store.commit('updateHttpFlag', true)
            let data = res.data
            this.sess = res.data.sess
            if (data.sess) {
              // 提交mutation到Store
              this.$store.commit('updateSess', this.sess)
              // 提交mutation到Store
              this.$store.commit('updateUserName', this.account.toLocaleLowerCase())
              // 提交mutation到Store
              this.$store.commit('updateUsertype', res.data.usertype)
              if (this.playPlatform === 'web') {
                sessionStorage.setItem('sess', this.sess)
              }
              if (this.checkPw) {
                this.mUtils.setStore('userName', this.account);
                this.mUtils.setStore('pswd', this.password);
              } else {
                this.mUtils.removeStore('pswd')
              }
              let bank = {
                'issuebank': res.data.issetbank,
                'setquestion': res.data.setquestion,
                'setsecurity': res.data.setsecurity
              }
              this.$store.commit('updatebanks', bank)
              this.mUtils.setStore('userName', this.account)
              this.$router.push('/home')
            } else {
              let _this = this
              this.$vux.alert.show({
                title: '提示',
                content: data.msg,
                onShow() {
                  _this.loginText = '登录'
                }
              })
            }
          }, {
            'username': this.account,
            'loginpass': loginParam.password_sha,
            'logintype': 'login'
          })
        }
      },
      register() {
        this.$router.push('/Regist')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/style';

  .selectPc_web {
    position: relative;
  }

  .pc_web_list {
    .cl;
    li {
      float: left;
      text-align: center;
      padding-top: 0.75rem;
      color: #363636;
      &:last-child {
        margin-left: 0.77rem;
      }
      span {
        font-size: 14px;
      }
    }
    .line {
      .cl;
      height: 10px;
      border-left: 1px solid #8E8E8E;
    }
    .web_style {
      background: url('./img/icon_web.png') no-repeat center top;
      background-size: 0.7rem auto;
    }
    .pc_style {
      background: url('./img/icon_pc.png') no-repeat center top;
      background-size: 0.7rem auto;
    }
  }

  .remberPw {
    padding: 0.34rem 0 0;
    width: 80%;
    font-size: 0.26rem;
    color: #999;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    .remberPw_check {
      box-sizing: border-box;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      border: 1px solid #999;
    }
    .remberPw_checked {
      width: 0.4rem;
      height: 0.4rem;
      background: url("../assets/images/choose.png");
      background-size: cover;
      border: 1px solid #fff;
    }
    .registerStyle {
      width: 0.32rem;
      height: 0.32rem;
      background: url("./img/register.png");
      background-size: cover;
      border: 1px solid #fff;
    }

  }

  .remberPw.ios {
    width: 90%;
  }

  .bigEyes {
    width: .8rem;
    height: .8rem;
    position: absolute;
    right: 0.55rem;
    top: 0rem;
  }

  .openPs {
    width: 0.29rem;
    height: 0.15rem;
    background: url("../assets/images/unsee.png");
    background-size: cover;
    position: absolute;
    right: 0;
    top: .4rem
  }

  .bigClear {
    width: .5rem;
    height: .8rem;
    position: absolute;
    right: 0;
  }

  .Clear {
    width: 0.3rem;
    height: 0.3rem;
    background: url("../assets/images/Clear.png");
    background-size: cover;
    position: absolute;
    right: 0;
    top: .3rem;

  }

  .displayPw {
    width: 0.35rem;
    height: 0.22rem;
    background: url("../assets/images/displayPassword.png");
    background-size: cover;
    position: absolute;
    right: 0;
    top: .35rem
  }

  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff url("./img/bg.png") no-repeat;
    background-size: 100% auto;
  }

  .log-logo {
    margin: 0.5rem auto 0.5rem;
    text-align: center;
    color: #1fcab3;
    font-weight: bold;
    font-size: 0.8rem;
    img {
      width: 30%;
    }
  }

  .log-logo.ios {
    margin: 1rem auto 0.8rem;
  }

  .log-btn {
    position: relative;
    width: 80%;
    display: block;
    text-align: left;
    height: 0.84rem;
    line-height: 0.84rem;
    margin: 0 auto;
    color: #fff;
    font-size: 0.32rem;
    background-color: #c72023;
    .borderRadius(0.41rem);
  }

  .register-btn {
    position: relative;
    width: 90%;
    display: block;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 auto;
    color: #333333;
    font-size: 0.32rem;
    background-color: #ffffff;
    .borderRadius(0.08rem);
    text-align: center;
    border: 1px solid #333;
  }

  .log-user {
    text-align: center;
    margin: 0.4rem 0 0.6rem;
  }

  .log-user.ios {
    margin: 0.4rem 0 2rem;
  }

  .log-user .log-btn {
    background-color: #c72023;
    text-align: center;
  }

  .log-input-empty {
  }

  .userName {
    width: 80%;
    margin-left: 10%;
    clear: both;
    overflow: hidden;
    margin-bottom: 0.3rem;
    border-bottom: 1px solid #ddd;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url("./../assets/images/name.png") no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
    input::placeholder {
      color: #999;
    }
  }

  .passWord {
    width: 80%;
    margin-left: 10%;
    overflow: hidden;
    clear: both;
    border-bottom: 1px solid #ddd;
    position: relative;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url("./../assets/images/code.png") no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
    input::placeholder {
      color: #999;
    }
  }

  .log-input {
    box-sizing: border-box;
    width: 90%;
    overflow: hidden;
    padding: 0.4rem 0.3rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.32rem;
    border: none;
    .borderRadius(0.08rem);
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  .copyright {
    position: relative;
    bottom: -1.6rem;
    color: #2d2d2d;
    font-size: 0.24rem;
    width: 70%;
    margin-left: 15%;
    text-align: center;
  }

  .copyright.ios {
    position: fixed;
    bottom: 0.2rem;
  }
</style>
