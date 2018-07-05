import Store from '../../store/store'
import Utils from '../js/mUtils'

export default {
  install: function (Vue, options) {
    // 实例变量
    Vue.prototype.playPlatform = 'web'
    Vue.prototype.playSource = 6
    // 方法
    Vue.prototype.httpUrl = (val) => {
      let app = require('../../../static/hc_2.0.json')
      let appData = app
      let serverList = appData.serverList
      let j = Math.floor(Math.random() * serverList.length)
      if (Store.state.server == null) {
        Store.commit('updateServer', window.location.origin)
      }
      if (Store.state.lotteryType == null) {
        Store.commit('updateLotteryType', appData.lotteryType)
      }
      let sess
      if (Store.state.sess != null) {
        sess = Store.state.sess
      } else {
        sess = sessionStorage.getItem('sess')
      }
      Store.commit('updateSess', sess)
      return Store.state.server + Utils.interFace(val) + '&sess=' + sess;
    }
    Vue.prototype.openurl = () => {
      let kefuWin = window.open()
      Vue.prototype.httpAction(Vue.prototype.httpUrl('KEFU'), (res) => {
        if (res.data.status == 200) {
          let data = res.data.repsoneContent
          let lickUrl = data.kefulink
          kefuWin.location.href = lickUrl
        }
      })
    }
    Vue.prototype._getUpdate = () => {
      if (Store.state.ifLink == null) {
        let appData = require('../../../static/hc_2.0.json')
        Store.commit('updateIflink', 1)
        let available = appData.app_ver.available
        Store.commit('updateAvailable', available)
        if (available == '0') {
          Vue.$vux.alert.show({
            title: '提示',
            content: '系统维护中'
          })
          return false
        } else {
          if (process.env.NODE_ENV === 'production') {
            Store.commit('updateServer', window.location.origin)
          } else {
            let serverList = appData.serverList
            let j = Math.floor(Math.random() * serverList.length) // webapp下用
            Store.commit('updateServer', serverList[j]) // webapp下用
          }
          Store.commit('updateLotteryType', appData.lotteryType)
          return true
        }
      } else {
        return true
      }
    }
  }
}
