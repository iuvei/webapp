import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import './assets/css/base.css'
import './assets/css/pop.css'
import './assets/css/style.less'
import store from './store/store'
import mUtils from './assets/js/mUtils.js'
import {Loadmore} from 'mint-ui'
import './assets/js/clipboard.min'
import {AlertPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin, ToastPlugin} from 'vux'
import tap from 'v-tap'
import Velocity from 'velocity-animate'
import iosPlugin from './assets/ios'
import androidPlugin from './assets/android'
import webPlugin from './assets/web'

Vue.component(Loadmore.name, Loadmore)

Vue.use(VueRouter)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(tap)
Vue.prototype.mUtils = mUtils
// 引入ios、Android、web 插件
// web
Vue.use(webPlugin)
import('./assets/web/index.css')
// android
// Vue.use(androidPlugin)
// import('./assets/android/index.css')
// ios
// Vue.use(iosPlugin)
// import('./assets/ios/index.css')

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

Vue.filter('filterRebate', function (value) {
  return (value * 100).toFixed(1) + '%'
})
Vue.filter('tofixed', function (value, type) {
  let valueflag = parseFloat(value).toFixed(3)
  let valueF = valueflag.substring(0, valueflag.lastIndexOf('.') + 3)
  let newvalue = valueF + type
  if (newvalue == 'Na') {
    newvalue = 0
  }
  return newvalue
})
Vue.filter('toFixed', function (value, val) {
  return parseFloat(value).toFixed(val)
})
Vue.filter('moneyType', function (value, type) {
  let val
  if (value === undefined || !value) {
    val = 0.00
  } else {
    let valFlag = parseFloat(value).toFixed(2)
    val = valFlag + type
  }
  return val
})
Vue.filter('filterCntitle', function (val) {
  let text
  if (val.indexOf('[-]') > -1 || val.indexOf('[+]') > -1 || val.indexOf('[=]') > -1) {
    let value = val.substring(1, 2)
    text = val.substring(3)
  } else {
    text = val
  }
  return text
})
Vue.filter('tfootFilter', function (value, item) {
  if (item == 'buttons_dividend') {
    return '查看'
  } else if (!value) {
    return '--'
  } else if (value == 0) {
    return '0'
  }
  else if (value.toString().indexOf('.') > -1) {
    return parseFloat(value).toFixed(2)
  }
  else {
    return value
  }
})

let _this
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    _this = this.$store
    // if (sessionStorage.getItem('sess') == null) {
    this.checkLogin()
    // }
  },
  methods: {
    checkLogin() {
      if (this.playPlatform === 'web') {
        let roset = window.location.href.indexOf('roset')
        let sess = window.location.href.indexOf('sess')
        if (roset > -1) {
          this.$router.push('/regist')
        } else {
          if (sess > -1) {
            let appData = require('../static/hc.json')
            this.$store.commit('updateIflink', 1)

            let serverList = appData.serverList
            if (process.env.NODE_ENV === 'production') {
              this.$store.commit('updateServer', window.location.origin)
            }
            this.$store.commit('updateLotteryType', appData.lotteryType)
            let httpurl = this.$store.state.server + this.mUtils.interFace('LOGIN') + '&sess=' + this.GetQueryString('sess')
            this.httpAction(httpurl, (res) => {
              this.$store.commit('updateHttpFlag', true)
              let data = res.data
              if (data.sess) {
                // 提交mutation到Store
                this.$store.commit('updateSess', data.sess)
                sessionStorage.setItem('sess', data.sess)

                // 提交mutation到Store
                this.$store.commit('updateUserName', data.username)
                // 提交mutation到Store
                this.$store.commit('updateUsertype', data.usertype)
                let bank = {
                  'issuebank': data.issetbank,
                  'setquestion': data.setquestion,
                  'setsecurity': data.setsecurity
                }
                this.$store.commit('updatebanks', bank)
                this.mUtils.setStore('userName', data.username)
                this.$router.push('/home')
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: data.msg
                })
              }
            }, {
              sType: 'sessLogin'
            })
          } else {
            this.$router.push('/login')
          }
        }
      } else {
        if (window.plus) {
        } else {
          document.addEventListener('plusready', function () {
          })
        }
        /* let versionold = this.mUtils.version */
        let welcome = this.mUtils.getStore('welcome')
        if (welcome == null || welcome == '') {
          this.mUtils.setStore('welcome', 1)
          this.$router.push('/welcome/welcome')
        } else {
          this.$router.push('/login')
        }
      }
    },
    GetQueryString(name) {
      var after = window.location.search.split("?")[1]
      if (after) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        var r = after.match(reg)
        if (r != null) {
          return decodeURIComponent(r[2])
        } else {
          return null
        }
      }
    }
  }
}).$mount('#app-box')

let createxmlHttpRequest = () => {
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
}
let ajax = (httpurl, callback, param, errorAction, timeoutAction) => {
  _this.commit('updateAjax', true)
  var ajaxData = {
    type: 'POST',
    url: httpurl,
    async: "true",
    data: param,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: callback,
    error: () => {
      errorAction && errorAction()
      Vue.$vux.loading.hide()
      if (_this.state.Ajax) {
        _this.commit('updateAjax', false)
        if (_this.state.httpFlag) {
          Vue.$vux.alert.show({
            title: '提示',
            content: '网络连接失败',
            onHide() {
              Vue.$vux.confirm.hide()
            }
          })
        }
      }
    },
    timeout: 30000
  }
  var xhr = createxmlHttpRequest()
  xhr.timeout = ajaxData.timeout
  xhr.responseType = ajaxData.dataType
  xhr.ontimeout = () => {
    timeoutAction && timeoutAction()
    Vue.$vux.loading.hide()
    if (_this.state.Ajax) {
      _this.commit('updateAjax', false)
      if (_this.state.httpFlag) {
        Vue.$vux.alert.show({
          title: '提示',
          content: '连接超时',
          onHide() {
            Vue.$vux.confirm.hide()
          }
        })
      }
    }
  }
  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async)
  xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
  xhr.send(JSON.stringify(ajaxData.data))
  xhr.onreadystatechange = () => {
    Vue.$vux.loading.hide()
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        _this.commit('updateAjax', false)
        let responseData = {"data": xhr.response}
        if (responseData.data == null) {
          ajaxData.success(responseData)
        } else {
          if (responseData.data.msg == '由于您长时间未操作，请重新登录' || responseData.data.status == 997 || responseData.data.status == 998) {
            if (_this.state.httpFlag) {
              Vue.$vux.alert.show({
                title: '提示',
                content: responseData.data.msg,
                onHide() {
                  router.replace('/login/')
                }
              })
            }
            return
          }
          ajaxData.success(responseData)
        }
      } else {
        ajaxData.error()
      }
    }
  }
}
Vue.prototype.httpAction = ajax

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  if (Vue.prototype.playPlatform === 'web') {
    if (from.path === '/regist') {
      next()
      return
    }
    if (to.matched.some(record => record.meta)) {
      if (sessionStorage.getItem('sess') == null) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }

})
