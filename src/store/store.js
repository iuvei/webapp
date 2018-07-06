import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      domain: 'http://test.example.com', // 保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
      userInfo: { // 保存用户信息
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null,
        tkpwd: null
      },
      selfUserid: '', // 日工资中获取userid

      sess: null,

      account: null, // 登录用户名

      usertype: null, // 用户类型

      methodid: null,

      money: null, // 账户余额

      _lotteryBet: null, // 彩种玩法

      banner: null, // 活动中心图片路径

      notices: null, // 公告列表

      lotteryname: null,

      selectLotteryName: null, // 选择彩种名字cnname

      selectLotteryNameFlag: null, // 选择彩种名字cnname开关

      bank: null,

      lotteryType: null, // 所有彩种

      issueTime: null, // 最新期数

      dataList: [], // 确认投注列表

      nav: null, // nav

      check: null,

      bankId: null,

      lockStatus: null,

      enshrine: null, // 常玩彩种

      taskDetail: null, // 追号

      agentDetail: null, // 代理详情

      layout: null, // 相应彩种位数

      model: null, // 投注完后的相关参数

      lotteryid: null,

      userid: null, // 团队管理点击用户名

      leng: null, // 切换动画

      home: null,

      ifLink: null,

      lotteryCenter: null,

      trend: null,

      server: '',

      typeInput: undefined,

      navflag: null,

      betRecordFlag: null,

      Ajax: true,

      message: null,

      notiveDetails: null,

      teamReport: null,

      LotteryCentreId: null,

      position: null,

      checkPw: false,  //记住密码

      pageTimer: {},

      lotteryMore: null,

      httpFlag: false,

      iosStore: false,

      agreement: null,

      daywageList: null,

      starttime: null,

      dateScope: null,

      dayWage: null,

      dayLoss: null,

      dividend: null,

      showToast: true,
      available: 1, // 网站是否可用（维护）
      nowPlays: [],
      rxSelect: []
    },
    mutations: {
      updateSelfUserid(state, newselfUserid) {
        state.selfUserid = newselfUserid
      },
      updataShowToast(state, newshowToast) {
        state.showToast = newshowToast
      },
      updatedividend(state, newdividend) {
        state.dividend = newdividend
      },
      updatedayLoss(state, newdayLoss) {
        state.dayLoss = newdayLoss
      },
      updatedayWage(state, newdayWage) {
        state.dayWage = newdayWage
      },
      updataDateScope(state, newDateScope) {
        state.dateScope = newDateScope
      },
      updateStarttime(state, newStarttime) {
        state.starttime = newStarttime
      },
      updateDayWageList(state, newDayWageList) {
        state.daywageList = newDayWageList
      },
      updateAgreement(state, newAgreement) {
        state.agreement = newAgreement
      },
      updateIosStore(state, newIosStore) {
        state.iosStore = newIosStore
      },
      updateHttpFlag(state, newhttpFlag) {
        state.httpFlag = newhttpFlag
      },
      lotteryMore(state, newlotteryMore) {
        state.lotteryMore = newlotteryMore
      },
      clearPageTimer(state, newPageTimer) {
        state.pageTimer = newPageTimer
      },
      // 记住密码
      remberPassword(state, newcheckPw) {
        state.checkPw = newcheckPw
      },
      updateIflink(state, newIflink) {
        state.ifLink = newIflink
      },
      updateAjax(state, newAjax) {
        state.Ajax = newAjax
      },
      // 更新用户信息
      updateUserInfo(state, newUserInfo) {
        state.userInfo = newUserInfo
      },
      // 保存sess
      updateSess(state, newSess) {
        state.sess = newSess
      },
      // 保存用户类型
      updateUsertype(state, newUsertype) {
        state.usertype = newUsertype
      },
      // 保存登录用户名
      updateUserName(state, newAccount) {
        state.account = newAccount
      },
      // 保存methodid
      updateMethodid(state, newMethodid) {
        state.methodid = newMethodid
      },
      // 保存账户余额
      updateMoney(state, newMoney) {
        state.money = newMoney
      },
      // 保存彩种玩法
      StoreLotteryBet(state, new_lotteryBet) {
        state._lotteryBet = new_lotteryBet
      },

      // 保存活动中心图片路径
      updateChildImg(state, new_banner) {
        state.banner = new_banner
      },

      // 保存是否设置提款密码
      updatebanks(state, new_bank) {
        state.bank = new_bank
      },
      // 保存公告列表
      updateNotices(state, new_notices) {
        state.notices = new_notices
      },

      // 保存投注号码
      updateCodes(state, new_lotteryname) {
        state.lotteryname = new_lotteryname
      },
      // 保存选择彩种名字
      updateSelectLotteryName(state, newSelectLotteryName) {
        state.selectLotteryName = newSelectLotteryName
      },
      // 保存选择彩种名字开关
      updateSelectLotteryNameFlag(state, newSelectLotteryNameFlag) {
        state.selectLotteryNameFlag = newSelectLotteryNameFlag
      },
      // 保存所有彩种
      updateLotteryType(state, new_lotteryType) {
        state.lotteryType = new_lotteryType
      },

      // 保存最新期数
      updateIssueTime(state, new_issueTime) {
        state.issueTime = new_issueTime
      },

      // 保存投注注数
      updateDataList(state, newDataList) {
        state.dataList = newDataList
      },

      // getNav
      getNav(state, newNav) {
        state.nav = newNav
      },

      // 保存常玩彩种
      updateEnshrine(state, newEnshrine) {
        state.enshrine = newEnshrine
      },

      // 保存追号记录
      updateTaskDetail(state, newTaskDetail) {
        state.taskDetail = newTaskDetail
      },

      // 保存代理详情
      updateAgentDetail(state, newAgentDetail) {
        state.agentDetail = newAgentDetail
      },
      // 保存最新银行状态码
      getCheck(state, newNav) {
        state.check = newNav
      },
      getBankId(state, newNav) {
        state.bankId = newNav
      },
      getLockStatus(state, newNav) {
        state.lockStatus = newNav
      },
      // 得到提款密码
      getTkpwd(state, newNav) {
        state.tkpwd = newNav
      },

      // 保存彩种位数
      updateLayout(state, newLayout) {
        state.layout = newLayout
      },

      // 保存彩种位数
      updateModel(state, newModel) {
        state.model = newModel
      },
      // 保存彩种位数
      updateIotteryid(state, newIotteryid) {
        state.lotteryid = newIotteryid
      },
      updateAgentUserid(state, newUserid) {
        state.userid = newUserid
      },
      // 保存切换动画url长度
      updateLeng(state, newLeng) {
        state.leng = newLeng
      },
      updateHome(state, newHome) {
        state.home = newHome
      },
      updateLotteryCenter(state, newLotteryCenter) {
        state.lotteryCenter = newLotteryCenter
      },
      updateTrend(state, newTrend) {
        state.trend = newTrend
      },
      // updateServer
      updateServer(state, newServer) {
        state.server = newServer
      },
      updateTypeInput(state, newTypeInput) {
        state.typeInput = newTypeInput
      },
      UpdateNewNav(state, newNavflag) {
        state.navflag = newNavflag
      },
      updateUserInfoChildFlag(state, newBetRecordFlag) {
        state.betRecordFlag = newBetRecordFlag
      },
      updateMessage(state, newMessage) {
        state.message = newMessage
      },
      updateNotiveDetails(state, newNotiveDetails) {
        state.notiveDetails = newNotiveDetails
      },
      updateTeamReport(state, newTeamReport) {
        state.teamReport = newTeamReport
      },
      updateLotteryCentreId(state, newLotteryCentreId) {
        state.LotteryCentreId = newLotteryCentreId
      },
      SAVE_POSITION(state, newPosition) {
        state.position = newPosition
      },
      updateAvailable(state, flag) {
        state.available = flag
      },
      updateNowPlays(state, arr) {
        state.nowPlays = arr
      },
      updateRXSelect(state, arr) {
        state.rxSelect = arr
      }
    },
    modules: {
      mutations
    },
    getters: {
      getAvailable: state => state.available,
      getSess: state => state.sess,
      getNowPlays: state =>state.nowPlays,
      getRxSelect:state =>state.rxSelect,
      getServer:state =>state.server,
  },
  actions
})

