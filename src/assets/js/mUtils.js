import Vue from 'vue'
import store from '../../store/store'

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 *接口相关
 */

// export const serverlist = 'http://10.63.15.242/wap/index.php?'
// export const serverUrl = 'http://10.63.15.242'

// export const serverlist = 'http://preop.hengcai88.com/wap/index.php?'
// export const serverUrl = 'http://preop.hengcai88.com/wap/index.php?'

export const interFace = (key) => {
  var INTERFACE = {}

  // 登录
  INTERFACE['LOGIN'] = 'controller=default&action=login&client=H5'

  // 获取彩种
  INTERFACE['GETSESS'] = 'controller=default&action=index&client=H5'

  // 查询余额is me wrire
  INTERFACE['GETMONEY'] = 'controller=default&action=menu&client=H5'

  // 首页Banner
  INTERFACE['BANNgamedetailER'] = 'controller=mobileapi&action=h5banners&client=H5'
  // 查询余额
  INTERFACE['BALANCE'] = 'controller=mobileapi&action=mobilegetmoney&client=H5'

  // 服务器列表
  INTERFACE['FUWUQI'] = 'controller=mobileapi&action=getmobiledomain&client=H5'

  // 获取玩法
  INTERFACE['METHOD'] = '1=1&client=H5'

  //获取站内信数量
  INTERFACE['GETCOUNT'] = 'controller=user&action=messages&tag=unreadmsg&client=H5'

  //修改登录密码
  INTERFACE['CHANGEPASS'] = 'controller=user&action=changeloginpass&client=H5'

  //意见反馈
  INTERFACE['SUGEST'] = 'controller=mobileapi&action=mobilesendemail&client=H5'

  //站内信列表
  INTERFACE['MAIL'] = 'controller=user&action=messages&client=H5'

  //获取用户基本信息
  INTERFACE['USERINFO'] = 'controller=user&action=UserInfoH5&client=H5'

  //当前奖期
  INTERFACE['CURRENTPRIZE'] = '1=1&client=H5'

  //开奖历史
  INTERFACE['HISPRIZE'] = 'controller=game&action=issueindex&client=H5'

  //更新站内信状态
  INTERFACE['READMESSAGE'] = 'controller=user&action=messages&tag=viewdetail&client=H5'

  //开奖信息详情
  INTERFACE['NUMBERDETAIL'] = 'controller=game&action=issuelist&client=H5'

  //投注接口
  INTERFACE['PAYBET'] = 'controller=game&action=play&play_source=5'

  // 退出登录
  INTERFACE['LOGOUT'] = 'controller=default&action=logout&client=H5'

  // 投注记录
  INTERFACE['BETHISTORY'] = 'controller=gameinfo&action=gamelist&client=H5'

  // 彩票帐变
  INTERFACE['LOTTERYCHECK'] = 'controller=report&action=selforders&client=H5'

  // 追号记录
  INTERFACE['TRACKINGHIS'] = 'controller=gameinfo&action=task&client=H5'

  // 追号详情单
  INTERFACE['TRACKINGDETAIL'] = 'controller=gameinfo&action=taskdetail&client=H5'

  // 重提记录
  INTERFACE['SELFBANKREPORT'] = 'controller=report&action=selfbankreport&client=H5'

  // 团队管理
  INTERFACE['TEAMMANAGEMENT'] = 'controller=user&action=list&client=H5'

  // 用户配额设置
  INTERFACE['USERACCNUM'] = 'controller=user&action=useraccnum&client=H5'

  // 提升返点
  INTERFACE['UPEDITUSER'] = 'controller=user&action=upedituser&client=H5'

  // 团队报表
  INTERFACE['TEAMREPORT'] = 'controller=gameinfo&action=historyteamlottery&client=H5'

  // 用户名，昵称，密码检测
  INTERFACE['USERCHECK'] = 'controller=user&client=H5'

  // 下级注册
  INTERFACE['REGISTRATION'] = 'controller=user&action=adduser&client=H5'

  // 推广链接
  INTERFACE['MARKETING'] = 'controller=user&action=marketing&client=H5'

  // 可追奖期
  INTERFACE['AVAILABLEISSUE'] = '1=1&client=H5'

  //资金明细
  INTERFACE['ACCOUNTDETAIL'] = 'controller=report&action=bankreport&client=H5'

  //投注详情
  INTERFACE['BETDETAIL'] = 'controller=gameinfo&action=gamedetail&client=H5'

  //投注撤单
  INTERFACE['CANCELGAME'] = 'controller=gameinfo&action=cancelgame&client=H5'

  //追号撤单
  INTERFACE['CANCELTRACKING'] = 'controller=gameinfo&action=canceltask&client=H5'

  //轮播图
  INTERFACE['BANNERS'] = 'controller=activitymobile&action=list'

  //消息
  INTERFACE['PULICCENTER'] = 'controller=user&action=messages'
  //公告列表
  INTERFACE['NOTICELIST'] = 'controller=help&action=noticelist&client=H5';

  INTERFACE['NOTICEDETAILS'] = 'controller=help&action=notice';
  //消息列表
  INTERFACE['MESSAGELIST'] = 'controller=user&action=messages&client=H5';
  INTERFACE['BANKLIST'] = 'controller=user&action=userbankinfoh5';
  INTERFACE['CHECKPASS'] = 'controller=security&action=checkpaypass';
  INTERFACE['LOCKDELBANK'] = 'controller=security&action=DeleteUserBank';
  INTERFACE['GETCITYLIST'] = 'controller=security&action=addbankh5';//获取城市列表
  INTERFACE['WITHDRAWS'] = 'controller=security&action=withdrawh5';//获取体现信息
  INTERFACE['SETPASS'] = 'controller=security&action=setsecuritypass';//设置提款密码
  INTERFACE['UPDATATKPASS'] = 'controller=security&action=UpdatePass';//修改资金密码
  INTERFACE['SETQUESTION'] = 'controller=user&action=BindsequestionH5';//设置密保
  INTERFACE['IFSETQUES'] = 'controller=user&action=BindsequestionH5';//判断是否设置过密保
  INTERFACE['ANSWERQUES'] = 'controller=user&action=checkquestionH5';//回答问题
  INTERFACE['GETBANKLIST'] = 'controller=pay&action=getpaylist';//获得银行卡列表
  INTERFACE['NEXTBANKLIST'] = 'controller=pay&action=payment'//点击银行卡下一步
  INTERFACE['TREND'] = 'controller=game&action=bonuscode'

  // 日工资列表
  INTERFACE['DAYWAGE'] = 'controller=salarymanage&action=dailysalary';
  // 修改协议
  INTERFACE['UPDATEPROTOCOL'] = 'controller=salarymanage&action=UpdateProtocol';
  // 同意协议
  INTERFACE['SEEPROTOCOL'] = 'controller=salarymanage&action=seeProtocol';
  // 历史日工资
  INTERFACE['PERSONALSALARY'] = 'controller=salarymanage&action=personalsalary';
  // 日亏损佣金
  INTERFACE['LOSESALARY'] = 'controller=losesalary&action=losesalary';
  // 日亏损佣金详情
  INTERFACE['DETAIL'] = 'controller=losesalary&action=detail';
  // 团队分红
  INTERFACE['DIVIDENDSALARY'] = 'controller=dividendsalary&action=dividendsalary';
  // 团队总表
  INTERFACE['HISTORYALL'] = 'controller=gameinfo&action=historyallteamlottery&client=H5';
  // 修改分红比例
  INTERFACE['RATIO'] = 'controller=dividendsalary&action=ratio';
  // 发放分红
  INTERFACE['SENDDIVIDENDSALARY'] = 'controller=dividendsalary&action=sendDividendSalary';
  // 历史分红
  INTERFACE['PRESONALSALARY'] = 'controller=dividendsalary&action=personalsalary';
  // 客服，域名
  INTERFACE['KEFU'] = 'controller=default&action=index&KefuLink=true';
  var httpurl;
  if (key == 'KEFU') {
    httpurl = '/pcservice/index.php?' + INTERFACE[key]
  } else {
    httpurl = '/wap/index.php?' + INTERFACE[key]
  }
  return httpurl
}

export const genCountdown = (sec) => {
  var h = parseInt(sec / 3600);
  var m = parseInt((sec - h * 3600) / 60);
  var s = sec - h * 3600 - m * 60;
  if (h < 10) {
    h = '0' + h;
  }
  ;
  if (m < 10) {
    m = '0' + m;
  }
  ;
  if (s < 10) {
    s = '0' + s;
  }
  ;
  return h + ':' + m + ':' + s;
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

export const lotterytrans = (key, method, _lotteryBet) => {
  let result, lottery
  let from = method.substring(0, 2)
  switch (from) {
    case 'id': {
      from = 'lotteryid'
    }
      break
    case 'co': {
      from = 'nav'
    }
      break
    case 'cu': {
      from = 'lotteryCurmId'
    }
      break
  }

  _lotteryBet.forEach((item, index) => {
    let k = item[from]
    if (key == k) {
      lottery = item
      return false
    }
  })

  switch (method) {
    case 'id->code': {
      result = lottery.lotteryCode
    }
      break
    case 'id->curmId': {
      result = lottery.curmid
    }
      break
    case 'code->id': {
      result = lottery.lotteryid
    }
      break
    case 'code->curmId': {
      result = lottery.lotteryCurmId
    }
      break
    case 'curmId->id': {
      result = lottery.lotteryId
    }
      break
    case 'curmId->code': {
      result = lottery.lotteryCode
    }
      break
  }

  return result
}

// 获取当前日期的前后val日期
export const setDateTime = (n) => {
  let s, d, t, t2
  t = new Date().getTime()
  t2 = n * 1000 * 3600 * 24
  t += t2
  d = new Date(t)
  s = d.getUTCFullYear() + '-'
  s += ('00' + (d.getUTCMonth() + 1)).slice(-2) + '-'
  s += ('00' + d.getUTCDate()).slice(-2)
  return s
}

// 序列化form表单
export const formser = (form) => {
  let arr = {}
  for (let i = 0; i < form.elements.length; i++) {
    let feled = form.elements[i]
    switch (feled.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
        break
      case 'checkbox':
      case 'radio':
        if (!feled.checked) {
          break
        }
      default:
        if (arr[feled.name]) {
          arr[feled.name] = arr[feled.name] + ',' + feled.value
        } else {
          arr[feled.name] = feled.value
        }
    }
  }
  return arr
}
export const lhzx_trans = (name) => {
  let str = name.replace('BANKER', '').replace('TIE', '').replace('PLAYER', '').replace('庄', 'z').replace('闲', 'x').replace('对子', 'dz').replace('天王', 'tw').replace('豹子', 'bz').replace('赢', 'y').replace('输', 's').replace('和', 'h')
  return 'zx' + str
}

//判断平台类型
export const getPlatformType = () => {
  var platformType = '';
  var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {   //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq",//是否QQ
        isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,//android客户端
        isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios客户端
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  if (browser.versions.mobile) {
    //判断是否是移动设备打开。browser代码在下面
    //用正则来判断手机是否是ios（苹果）和Android（安卓）客户端
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    //alert(ua)
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
      platformType = 'CKPT0001'
    } else if ((ua.match(/QQ/i) == "qq" && ua.indexOf('v1_and_sq') > -1) || (ua.match(/QQ/i) == "qq" && ua.indexOf('v1_iph_sq') > -1)) {
      // //在QQ里面打开 内置浏览器android和ios不一样
      platformType = 'CKPT0002'
    } else if (ua.match(/WeiBo/i) == "weibo") {
      //在新浪微博客户端打开
      platformType = 'CKPT0003'
    } else if (ua.match(/txmicroblog/i) == "txmicroblog") {
      //在腾讯微博(自定义)
      platformType = 'CKPT0004'
    } else {
      //浏览器
      platformType = 'web'
    }

  } else {
    //否则就是PC浏览器打开
    platformType = 'web'
  }

  return platformType
}
// 计算n 的阶乘
export const factorial = (n) => {
  if (n == 1 || n == 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}
export const selectAll = (obj) => {
  jQuery(":checkbox[id!='' + obj + '']").attr('checked', jQuery('#' + obj).attr('checked'))
}

export default {
  interFace,
  genCountdown,
  setStore,
  getStore,
  removeStore,
  lotterytrans,
  setDateTime,
  formser,
  lhzx_trans,
  getPlatformType,
  factorial
}
