import Welcome from '../components/welcome/welcome.vue'
import Login from '../components/login.vue'
import Regist from '../components/register.vue'
import LotteryCentre from '../components/lotteryCenter/LotteryCentre.vue'
import LotteryDetails from '../components/lotteryCenter/LotteryDetails.vue'
import lotteryMore from '../components/lotteryCenter/lotteryMore.vue'
import lotteryDetailsList from '../components/lotteryCenter/lotteryDetailsList.vue'
import Home from '../components/home/Home.vue'
import Activity from '../components/activity/Activity.vue'
import ActivityDetails from '../components/activity/children/ActivityDetails.vue'
import UserInfo from '../components/userInfo/UserInfo.vue'
import LotteryChange from '../components/userInfo/children/LotteryChange.vue'
import LotteryChangeDetails from '../components/userInfo/children/LotteryChangeDetails.vue'
import ChaseDetails from '../components/userInfo/children/ChaseDetails.vue'
import RecordDetails from '../components/userInfo/children/RecordDetails.vue'
import ChaseDetailIn from '../components/userInfo/children/ChaseDetailIn.vue'
import ChaseRecord from '../components/userInfo/children/ChaseRecord.vue'
import Settings from '../components/userInfo/Settings.vue'
import BetRecord from '../components/userInfo/children/BetRecord.vue'
import BetRecordDetails from '../components/userInfo/children/BetRecordDetails.vue'
import SubordinateRegistration from '../components/userInfo/children/SubordinateRegistration.vue'
import Recharge from '../components/userInfo/children/Recharge.vue'
import TeamTable from '../components/userInfo/children/TeamTable.vue'
import TeamTableTime from '../components/userInfo/children/TeamTableTime.vue'
import TeamTableUsername from '../components/userInfo/children/TeamTableUsername.vue'
import TeamTableUsernameFlag from '../components/userInfo/children/TeamTableUsernameFlag.vue'
import RechargeRecord from '../components/userInfo/children/RechargeRecord.vue'
import RechargeDetail from '../components/userInfo/children/RechargeDetail.vue'
import TeamReport from '../components/userInfo/children/TeamReport.vue'
import DayWage from '../components/userInfo/children/DayWage.vue'
import DayWageClickUser from '../components/userInfo/children/DayWageClickUser.vue'
import DayWageClickUserFlag from '../components/userInfo/children/DayWageClickUserFlag.vue'
import DayLoss from '../components/userInfo/children/DayLoss.vue'
import DayLossBrokerage from '../components/userInfo/children/DayLossBrokerage.vue'
import HistoryDayWage from '../components/userInfo/children/HistoryDayWage.vue'
import Dividend from '../components/userInfo/children/Dividend.vue'
import HistoryDividend from '../components/userInfo/children/HistoryDividend.vue'
import DividendManage from '../components/userInfo/children/DividendManage.vue'
import Agreement from '../components/userInfo/children/Agreement.vue'
import AgreementExplain from '../components/userInfo/children/AgreementExplain.vue'
import TeamReportDetails from '../components/userInfo/children/TeamReportDetails.vue'
import TeamReportDetailsFlag from '../components/userInfo/children/TeamReportDetailsFlag.vue'
import TeamSecondaryReport from '../components/userInfo/children/TeamSecondaryReport.vue'
import SponsoredLinks from '../components/userInfo/children/SponsoredLinks.vue'
import SecondaryAgent from '../components/userInfo/children/SecondaryAgent.vue'
import TeamDetails from '../components/userInfo/children/TeamDetails.vue'

import SelectCody from '../components/selectCody/SelectCody.vue'
import Affirm from '../components/selectCody/children/Affirm.vue'
import Trend from '../components/trend/Trend.vue'

import Message from '../components/notice/Message.vue'
import MessageDetails from '../components/notice/details/MessageDetails.vue'
import NotiDetail from '../components/notice/details/notiDetails.vue'
import NoticeDetails from '../components/notice/NoticeDetails.vue'
import AccountInfo from '../components/userInfo/children/AccountInfo.vue'

import BankList from '../components/bankCard/bankList.vue'
import SetCard from '../components/bankCard/children/setCard.vue'
import BankcheckOne from '../components/bankCard/children/bankcheckOne.vue'
import BankcheckTwo from '../components/bankCard/children/bankcheckTwo.vue'
import BankcheckThree from '../components/bankCard/children/bankcheckThree.vue'
import NoPassword from '../components/bankCard/children/NoPassword.vue'
import EnterPwd from '../components/bankCard/children/EnterPwd.vue'
import EnterPwdBank from '../components/bankCard/children/EnterPwdBank.vue'
import IdentityConfirmation from '../components/bankCard/children/IdentityConfirmation.vue'
import ModifyPwd from '../components/bankCard/children/ModifyPwd.vue'
import DuplicatePwd from '../components/bankCard/children/DuplicatePwd.vue'
import Withdrawals from '../components/userInfo/children/Withdrawals.vue'
import FindPwd from '../components/bankCard/children/FindPwd.vue'
import Setquestion from '../components/bankCard/children/setquestion.vue'
import Setpwd from '../components/bankCard/children/Setpwd.vue'
import Settkpwd from '../components/bankCard/children/Settkpwd.vue'
import SecSetpwd from '../components/bankCard/children/SecSetpwd.vue'
import Help from '../components/help/help.vue'

export default [
  {
    path: '/welcome/welcome',
    component: Welcome,
    meta: {keepAlive: false}
  },
  {
    // 设置
    path: '/userInfo/recharge',
    component: Recharge,
    meta: {keepAlive: true}
  },
  {
    // 彩票帐变
    path: '/userInfo/lotteryChange',
    component: LotteryChange,
    meta: {keepAlive: false}
  },
  {
    // 彩票帐变详情
    path: '/userInfo/lotteryChangeDetails',
    component: LotteryChangeDetails,
    meta: {keepAlive: true}
  },
  {
    // 充值记录
    path: '/userInfo/rechargeRecord',
    component: RechargeRecord,
    meta: {keepAlive: false}

  },
  {
    // 充值记录详情
    path: '/userInfo/recordDetails',
    component: RecordDetails,
    meta: {keepAlive: true}

  },
  {
    // 充值记录详情
    path: '/userInfo/rechargeDetail',
    component: RechargeDetail,
    meta: {keepAlive: true}

  },
  // {
  //   // 团队管理
  //   path:'/userInfo/teamManagement',
  //   component:TeamManagement
  // },
  {
    // 团队报表
    path: '/userInfo/teamReport',
    component: TeamReport,
    meta: {keepAlive: false}

  },
  {
    // 团队报表
    path: '/userInfo/teamReport/TeamReportDetails',
    component: TeamReportDetails,
    meta: {keepAlive: true}

  },
  {
    // 团队报表
    path: '/userInfo/teamReport/TeamReportDetailsFlag',
    component: TeamReportDetailsFlag,
    meta: {keepAlive: true}

  },
  {
    // 团队总表
    path: '/userInfo/TeamTable',
    component: TeamTable,
    meta: {keepAlive: false}
  },
  {
    // 团队报表 按时间查询
    path: '/userInfo/TeamTableTime',
    component: TeamTableTime,
    meta: {keepAlive: true}
  },
  {
    // 团队报表 按用户名查询
    path: '/userInfo/TeamTableUsername',
    component: TeamTableUsername,
    meta: {keepAlive: true}
  },
  {
    // 团队报表 按用户名查询
    path: '/userInfo/TeamTableUsernameFlag',
    component: TeamTableUsernameFlag,
    meta: {keepAlive: true}
  },
  {
    // 日工资TeamTable
    path: '/userInfo/DayWage',
    component: DayWage,
    meta: {keepAlive: false}
  },
  {
    // 下级日工资
    path: '/userInfo/DayWageClickUser',
    component: DayWageClickUser,
    meta: {keepAlive: true}
  },
  {
    // 下级日工资Flag
    path: '/userInfo/DayWageClickUserFlag',
    component: DayWageClickUserFlag,
    meta: {keepAlive: true}
  },
  {
    // 日亏损佣金
    path: '/userInfo/DayLoss',
    component: DayLoss,
    meta: {keepAlive: false}
  },
  {
    // 日亏损佣金详情
    path: '/userInfo/DayLossBrokerage',
    component: DayLossBrokerage,
    meta: {keepAlive: true}
  },
  {
    // 日工资协议
    path: '/userInfo/Agreement',
    component: Agreement,
    meta: {keepAlive: true}
  },
  {
    // 历史日工资
    path: '/userInfo/HistoryDayWage',
    component: HistoryDayWage,
    meta: {keepAlive: true}
  },
  {
    // 日工资协议说明
    path: '/userInfo/Agreement/AgreementExplain',
    component: AgreementExplain,
    meta: {keepAlive: true}
  },
  {
    // 团队分红
    path: '/userInfo/Dividend',
    component: Dividend,
    meta: {keepAlive: false}
  },
  {
    // 分红管理
    path: '/userInfo/HistoryDividend',
    component: HistoryDividend,
    meta: {keepAlive: true}
  },
  {
    // 分红管理
    path: '/userInfo/DividendManage',
    component: DividendManage,
    meta: {keepAlive: true}
  },
  {
    path: '/userInfo/help',
    component: Help,
    meta: {keepAlive: true}

  },
  {
    // 团队报表
    path: '/userInfo/teamSecondaryReport',
    component: TeamSecondaryReport,
    meta: {keepAlive: true}

  },
  {
    // 团队报表
    path: '/userInfo/sponsoredLinks',
    component: SponsoredLinks,
    meta: {keepAlive: true}

  },
  {
    // 设置
    path: '/userInfo/bankList/setCard',
    component: SetCard,
    meta: {keepAlive: true}

  },
  {
    // 设置提款密码
    path: '/userInfo/withdrawals',
    component: Withdrawals,
    meta: {keepAlive: true}

  },
  {// 设置密保
    path: '/settings/setquestion',
    component: Setquestion,
    meta: {keepAlive: true}

  },
  {
    // 回答问题
    path: '/settings/findPwd',
    component: FindPwd,
    meta: {keepAlive: true}

  },
  {
    // 设置提款密码
    path: '/userInfo/noPassword',
    component: NoPassword,
    meta: {keepAlive: true}

  },
  {
    // 输入提款密码
    path: '/userInfo/enterPwd',
    component: EnterPwd,
    meta: {keepAlive: true}

  },
  {
    // 输入提款密码进入银行列表
    path: '/userInfo/enterPwdBank',
    component: EnterPwdBank,
    meta: {keepAlive: true}

  },
  {
    // 输入提款密码
    path: '/userInfo/bankList/identityConfirmation',
    component: IdentityConfirmation,
    meta: {keepAlive: true}

  },
  {
    // 设置提款密码
    path: '/userInfo/setpwd',
    component: Setpwd,
    meta: {keepAlive: true}

  },
  {
    // 再次设置提款密码
    path: '/userInfo/secSetpwd',
    component: SecSetpwd,
    meta: {keepAlive: true}

  },
  {
    // 设置提款密码之修改资金密码
    path: '/userInfo/settkpwd',
    component: Settkpwd,
    meta: {keepAlive: true}

  },
  {
    // 添加银行卡跳转
    path: '/userInfo/bankcheckOne',
    component: BankcheckOne,
    meta: {keepAlive: true}

  },
  {
    // 锁定银行卡跳转
    path: '/userInfo/bankcheckTwo',
    component: BankcheckTwo,
    meta: {keepAlive: true}

  },
  {
    // 删除银行卡跳转
    path: '/userInfo/bankcheckThree',
    component: BankcheckThree,
    meta: {keepAlive: true}

  },
  {
    // 登录页SetCard
    path: '/login',
    component: Login,
    meta: {keepAlive: true}
  },
  {
    // 注册页
    path: '/regist',
    component: Regist,
    meta: {keepAlive: false}

  },
  {
    // 购彩大厅
    path: '/home',
    component: Home,
    meta: {keepAlive: false}
  },
  {
    path: '/notice/noticeDetails', // 公告
    component: NoticeDetails,
    meta: {keepAlive: false}
  },
  {
    path: '/notice/notiDetail', // 公告详情
    component: NotiDetail,
    meta: {keepAlive: true}

  },
  {
    path: '/notice/message', // 消息
    component: Message,
    meta: {keepAlive: true}
  },
  {
    path: '/notice/messageDetails', // 消息详情
    component: MessageDetails,
    meta: {keepAlive: true}

  },
  {
    // 走势预测
    path: '/trend',
    component: Trend,
    meta: {keepAlive: false}
  },
  {
    // 开奖中心
    path: '/lotteryCentre',
    component: LotteryCentre,
    meta: {keepAlive: false}
  },
  {
    path: '/lotteryCentre/lotteryDetails', // 开奖详情
    component: LotteryDetails,
    meta: {keepAlive: true}
  },
  {
    path: '/lotteryCentre/lotteryDetails/lotteryMore',
    component: lotteryMore,
    meta: {keepAlive: false}
  },
  {
    path: '/lotteryCentre/lotteryDetails/lotteryMore/lotteryDetailsList',
    component: lotteryDetailsList,
    meta: {keepAlive: true}
  },
  {
    path: '/activity', // 活动中心
    component: Activity,
    meta: {keepAlive: true}
  },
  {
    path: '/activity/activityDetails', // 活动详情
    component: ActivityDetails,
    meta: {keepAlive: true}
  },
  {
    // 我的恒彩
    path: '/userInfo',
    component: UserInfo,
    meta: {keepAlive: true}
  },
  {
    // 团队管理用户名
    path: '/userInfo/secondaryAgent',
    component: SecondaryAgent,
    meta: {keepAlive: true}
  },
  {
    // 追号记录
    path: '/userInfo/chaseRecord',
    component: ChaseRecord,
    meta: {keepAlive: false}
  },
  {
    // 追号详情
    path: '/userInfo/chaseDetails',
    component: ChaseDetails,
    meta: {keepAlive: true}
  },
  {
    // 追号终止详情
    path: '/userInfo/chaseDetailIn',
    component: ChaseDetailIn,
    meta: {keepAlive: true}
  },
  {
    // 查看团队管理
    path: '/userInfo/teamDetails',
    component: TeamDetails,
    meta: {keepAlive: true}
  },
  {
    // 设置
    path: '/settings',
    component: Settings,
    meta: {keepAlive: true}
  },
  {
    // 修改登录密码
    path: '/settings/modifyPwd',
    component: ModifyPwd,
    meta: {keepAlive: true}
  },
  {
    // 修改提款密码
    path: '/settings/duplicatePwd',
    component: DuplicatePwd,
    meta: {keepAlive: true}
  },
  {
    // 账户信息
    path: '/userInfo/accountInfo',
    component: AccountInfo,
    meta: {keepAlive: true}
  },
  {
    // 投注记录
    path: '/userInfo/betRecord',
    component: BetRecord,
    meta: {keepAlive: false}
  },
  {
    // 投注记录详情
    path: '/userInfo/betRecordDetails',
    component: BetRecordDetails,
    meta: {keepAlive: true}
  },
  {
    // 投注记录详情
    path: '/userInfo/RecordDetails',
    component: RecordDetails,
    meta: {keepAlive: true}
  },
  {
    // 下级注册
    path: '/userInfo/subordinateRegistration',
    component: SubordinateRegistration,
    meta: {keepAlive: true}
  },
  {
    // 设置银行卡
    path: '/userInfo/bankList',
    component: BankList,
    meta: {keepAlive: true}
  },
  {
    // 选号
    path: '/home/SelectCody',
    component: SelectCody,
    meta: {keepAlive: true}
  },
  {
    // 投注确认
    path: '/home/SelectCody/affirm',
    component: Affirm,
    meta: {keepAlive: true}
  },
  {
    // 根目录时跳转
    path: '/',
    redirect: '/Login'
  },
  {
    // 找不到页面时跳转
    path: '*',
    redirect: '/Login'
  }
]
