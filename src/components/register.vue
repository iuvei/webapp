<!--注册-->
<template>
  <div class="login" id="login">
    <div class="log-logo"><img src="./img/logo.png"></div>
    <div class="log-user">
      <p class="userName"><span></span><input type="text" placeholder="用户名"
                                              :class="'log-input' + (username==''?' log-input-empty':'')"
                                              v-model="username" @blur="checkUserName(username)">
      </p>
      <p class="passWord"><span></span>
        <input type="password" placeholder="密码" :class="'log-input' + (password==''?' log-input-empty':'')"
               v-model="password" @blur="checkUserPass(password)">
      </p>
      <p class="conformPassWord"><span></span>
        <input type="password" placeholder="密码确认" :class="'log-input' + (password==''?' log-input-empty':'')"
               v-model="repassword" @blur="affirmUserPass(repassword)">
      </p>
      <p class="tencentqq" v-if="playPlatform==='web'"><span></span>
        <input type="text" placeholder="QQ号" :class="'log-input' + (qq==''?' log-input-empty':'')" v-model="qq"
               @blur="affirmqq(qq)">
      </p>

      <a href="javascript:void(0);" class="register-btn" v-tap="{ methods: register}">立即注册</a>
      <div class="log-btn_p clear">
        <router-link to="/login" class="log-btn">已有账号？立即登录</router-link>
      </div>
    </div>
    <p class="copyright">Copyright &copy; 2014 - 2017 恒彩娱乐版权所有
      菲律宾政府合法博彩牌照</p>
  </div>
</template>

<script>
  import {md5, querystring} from 'vux'

  export default {
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        qq: '',
        sess: '',

        flagUserName: false,
        flagUserPass: false,
        flagAffirmUserPass: false,
        flagqq: false,

        appUpdata: false,

        qqtest: true,
      }
    },
    mounted() {
      this._getUpdate()
    },
    methods: {
      // 正则检测用户名
      checkUserName(val) {
//        if (val === '') {
//          return
//        }
//        if (val.length !== 0) {
//          let reg = /^(?=.*[\da-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1\1).{6,16}$/
//          let r = reg.test(val)
//          if (!r) {
//            this.$vux.alert.show({
//              title: '温馨提示',
//              content: '用户名格式不正确,用户名由字母或数字组成的6-16个字符,不能连续四位相同的字符,首字不能以0或者o开头'
//            })
//            this.flagUserName = true
//            return
//          } else {
//            this.flagUserName = false
//          }
//        }
      },
      affirmqq(val) {
//        if (val === '') {
//          return
//        }
//        if (val.length !== 0) {
//          let reg = /^[\d]{5,11}$/
//          let r = reg.test(val)
//          if (!r) {
//            this.$vux.alert.show({
//              title: '温馨提示',
//              content: 'QQ必须为纯数字5-11位'
//            })
//            this.flagqq = true
//            return
//          } else {
//            this.flagqq = false
//          }
//        }
      },
      // 正则检测密码
      checkUserPass(val) {
//        if (val === '') {
//          return
//        }
//        if (val.length !== 0) {
//          let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/
//          let r = reg.test(val)
//          if (!r) {
//            this.$vux.alert.show({
//              title: '温馨提示',
//              content: '密码格式不正确,密码由字母和数字组成6-16个字符；且必须包含数字和字母'
//            })
//            this.flagUserPass = true
//            return
//          } else {
//            this.flagUserPass = false
//          }
//        }
      },
      // 确认密码
      affirmUserPass(val) {
//        if (this.password !== val) {
//          this.$vux.alert.show({
//            title: '温馨提示',
//            content: '确认密码跟密码不相同！'
//          })
//          this.flagAffirmUserPass = true
//        } else {
//          this.flagAffirmUserPass = false
//        }
      },
      // 注册
      register() {
        if (this.username === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '用户名不能为空'
          })
          return
        }
        if (this.password === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '密码不能为空'
          })
          return
        }
        if (this.repassword === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '密码确认不能为空'
          })
          return
        }
        if (this.qq === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: 'QQ不能为空'
          })
          return
        }

        if (this.username !== '') {
          let reg = /^(?=.*[\da-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1\1).{6,16}$/
          let r = reg.test(this.username)
          if (!r) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '用户名格式不正确,用户名由字母或数字组成的6-16个字符,不能连续四位相同的字符,首字不能以0或者o开头'
            })
            return
          }
        }
        if (this.password !== '') {
          let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/
          let r = reg.test(this.password)
          if (!r) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '密码格式不正确,密码由字母和数字组成6-16个字符；且必须包含数字和字母'
            })
            return
          }
        }
        if (this.repassword !== this.password) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '确认密码跟密码不相同!'
          })
          return
        }
        if (this.qq !== '') {
          let reg = /^[\d]{5,11}$/
          let r = reg.test(this.qq)
          if (!r) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: 'QQ必须为纯数字5-11位'
            })
            return
          }
        }

        let registerParam = {
          username: this.username,
          password: this.password,
          repassword: this.repassword,
          tencent: this.qq,
          roset: querystring.parse().roset,
          usertype: querystring.parse().usertype
        }
        this.$vux.loading.show({
          text: '正在注册...'
        })
        let httpurls = this.$store.state.server + '/_api/reguser.php'
        this.httpAction(httpurls, (res) => {
          this.$vux.loading.hide()
          let result = res.data
          if (result.error_code === 0) {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              buttonText: '登录',
              content: result.error_msg,
              onHide() {
                _this.toLogin()
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: result.error_msg,
              onHide() {

              }
            })
          }
        }, registerParam)
      },

      // 登录请求
      toLogin() {
        // 密码的加密
        let psw = md5('') + md5(this.password);
        let password_sha = md5(psw);
        // 需要想后端发送的登录参数
        let loginParam = {
          account: this.username,
          password_sha
        }
        this.$vux.loading.show({
          text: '正在登录...'
        })
        let httpurl = this.$store.state.server + this.mUtils.interFace('LOGIN')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          this.$store.commit('updateHttpFlag', true)
          let data = res.data
          this.sess = data.sess
          if (data.sess) {
            this.mUtils.setStore('userName', this.username);
            this.mUtils.setStore('pswd', this.password);

            // 提交mutation到Store
            this.$store.commit('updateSess', this.sess)
            sessionStorage.setItem('sess', this.sess)
            // 提交mutation到Store
            this.$store.commit('updateUserName', this.username.toLocaleLowerCase())
            // 提交mutation到Store
            this.$store.commit('updateUsertype', res.data.usertype)

            let bank = {
              'issuebank': res.data.issetbank,
              'setquestion': res.data.setquestion,
              'setsecurity': res.data.setsecurity
            }
            this.$store.commit('updatebanks', bank)
            this.$router.push('/home')
          } else {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: data.msg,
              onShow() {

              }
            })
          }
        }, {
          'username': this.username,
          'loginpass': loginParam.password_sha,
          'logintype': 'login'
        })
      },
      _getUpdate() {
        if (this.$store.state.ifLink == null) {
          let appData = require('../../static/hc.json')
          this.$store.commit('updateIflink', 1)
          this.version = appData.app_ver.version
          this.lotteryType = appData.lotteryType
          this.$store.commit('updateServer', window.location.origin)
          this.$store.commit('updateLotteryType', this.lotteryType)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/style';

  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff url(./img/bg.png) no-repeat;
    background-size: 100% auto;
  }

  .log-logo {
    margin: 0.5rem auto 0;
    text-align: center;
    color: #1fcab3;
    font-weight: bold;
    font-size: 0.8rem;
    img {
      width: 30%
    }
  }

  .register-btn {
    position: relative;
    width: 80%;
    display: block;
    height: 0.84rem;
    line-height: 0.84rem;
    margin: 0 auto;
    color: #fff;
    font-size: 0.32rem;
    background-color: #c72023;
    background-clip: padding-box;
    border-radius: 0.41rem;
    text-align: center;
    margin-top: 0.6rem;
  }

  .log-btn_p {
    width: 70%;
    margin: 0 auto;
  }

  .log-btn {
    float: right;
    display: block;
    height: 1rem;
    line-height: 1rem;
    color: #999;
    font-size: 0.24rem;
    background-color: #ffffff;
    border-radius: 0.08rem;
    text-align: center;
    text-decoration: underline;
  }

  .log-user {
    text-align: center;
    margin-top: 20px;
  }

  .log-user {
    text-align: center;
  }

  .log-input-empty {
  }

  .tencentqq {
    width: 80%;
    margin-left: 10%;
    overflow: hidden;
    clear: both;
    margin-bottom: 0.2rem;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url(./img/qq.png) no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
  }

  .userName {
    width: 80%;
    margin-left: 10%;
    clear: both;
    overflow: hidden;
    margin-bottom: 0.3rem;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url(./img/userName_icon.png) no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
  }

  .passWord {
    width: 80%;
    margin-left: 10%;
    overflow: hidden;
    clear: both;
    margin-bottom: 0.3rem;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url(./img/passWord_icon.png) no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
  }

  .conformPassWord {
    width: 80%;
    margin-left: 10%;
    overflow: hidden;
    clear: both;
    margin-bottom: 0.2rem;
    span {
      float: left;
      width: 10%;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url(./img/passWord_icon.png) no-repeat center center;
      background-size: auto 60%;
    }
    input {
      float: left;
    }
  }

  .log-input {
    box-sizing: border-box;
    width: 90%;
    overflow: hidden;
    padding: 0 0.3rem;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #EBEBEB;
    height: 0.8rem;
    line-height: 0.8rem;
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    -ms-border-radius: 0.08rem;
    -o-border-radius: 0.08rem;
    border-radius: 0.08rem;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  .copyright {
    position: relative;
    bottom: -0.2rem;
    color: #2d2d2d;
    font-size: 0.24rem;
    width: 70%;
    margin-left: 15%;
    text-align: center;
  }
</style>
