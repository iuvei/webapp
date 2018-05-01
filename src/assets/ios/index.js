import Store from '../../store/store'
import Utils from '../js/mUtils'

export default {
  install: function (Vue, options) {
    // 实例变量
    Vue.prototype.playPlatform = 'ios'
    Vue.prototype.playSource = 5
    // 方法
    Vue.prototype.httpUrl = (val) => {
      return Store.state.server + Utils.interFace(val) + '&sess=' + Store.getters.getSess
    }
    Vue.prototype.openurl = () => {
      let lickUrl = 'https://ngmm.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=12397&configID=50&jid=';
      plus.runtime.openURL(lickUrl, function () {
        Vue.$vux.alert.show({
          content: '联系客服失败'
        })
      })
    }
    Vue.prototype._getUpdate = () => {
      if (Store.state.ifLink == null) {
        // let httpurl = 'https://dn-outwitinc.qbox.me/hcol/ios_hc_appstore.json?ver='+new Date().getTime()
        // if (process.env.NODE_ENV === 'production') {
        var httpurl = 'https://dn-outwitinc.qbox.me/hcol/hc_2.0.json?ver=' + new Date().getTime() //上线用
        // } else {
        var appData = require('../../../static/hc.json') // 开发用
        // }
        Vue.prototype.httpAction(httpurl, (res) => {
          Store.commit('updateIflink', 1)
          if (process.env.NODE_ENV === 'production') {
            appData = res.data //上线用
          }
          Store.commit('updateAvailable', appData.app_ver.available)
          let iosStore = appData.app_ver.iosStore
          Store.commit('updateIosStore', iosStore)
          if (appData.app_ver.available == '0') {
            Vue.$vux.alert.show({
              title: '提示',
              content: '系统维护中',
              onHide() {
                plus.runtime.quit()
              }
            })
          } else {
            let updateUrl = appData.app_ver.url
            let serverList = appData.serverList
            let j = Math.floor(Math.random() * serverList.length)
            Store.commit('updateServer', serverList[j])
            Store.commit('updateLotteryType', appData.lotteryType)
            let appV = require('../../../static/version.json')
            if (appData.app_ver.version != appV.version) {
              if (appData.app_ver.updateFlag == 1) {
                Vue.$vux.alert.show({
                  title: '提示',
                  content: '有版本更新了,请立即更新',
                  onHide() {
                    window.location = updateUrl
                  }
                })
              } else {
                Vue.$vux.confirm.show({
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
            }
          }
        })
      }
      return true
    }
  }
}
