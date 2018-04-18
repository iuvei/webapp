<!--彩票大厅-->
<template>
  <div class="home">
    <div>
      <loading v-model="loading"></loading>
    </div>

    <div v-transfer-dom v-if="playPlatform==='web'">
      <x-dialog v-model="showToast" hide-on-blur
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <div class="img-box" style="position: relative;">
          <img v-tap="{ methods: _message}" src="./img/active_1020.png" style="max-width:100%">
          <img @click="showToast=false" src="./img/active_1020_close.png"
               style="max-width:100%;position: absolute;top:-70px;right:0;">
        </div>
      </x-dialog>
    </div>
    <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore">
        <Swipe></Swipe>
        <div class="newsList">
          <div class="inaline">
            <img id="notice" class="notice" src="./img/notice.png" alt="">
            <rollNotice></rollNotice>
            <span class="icon_right"></span>
          </div>
          <!--用户名-->
          <div class="userName clear">
            <span><span style="color:#C7202C;" v-text="this.$store.state.account"></span> , 您好</span>
            <span style="border-left:1px solid #9F9F9F;margin:0 0.5rem;"></span>
            <span>余额：
              <span v-if="showMoney" class="money">{{$store.state.money | tofixed('')}}</span>
              <span v-else class="money">*****</span>
            </span>
            <span :class="{ show_money : showMoney , hide_money : hideMoney }" v-tap="{ methods:_moneyNumber }"></span>
          </div>
          <!--热门活动-->
          <div class="hotActivity clear">
            <div class="clear">
              <span class="left" style="font-size: 0.26rem;margin-left:-0.1rem;color:#363636;">【重庆时时彩】开奖稳定,收益高</span>
              <span v-tap="{ methods: _activity}" class="hotActivity_button clear">
                <img class="hotActivity_icon" src="./img/hotActivity_icon.png" alt="">
                <img class="hotActivity_text" src="./img/hotActivity_text.png" alt="">
              </span>
            </div>
            <div>
              <ul class="hotActivity_code clear">
                <li v-for="item in cqcody" v-text="item"></li>
              </ul>
              <span v-tap="{ methods:_selectCody , item : 'ssc' }" class="test_luck right">2元小试身手</span>
              <div style="margin-top:0.24rem;font-weight: normal;">
                <span style="color:#585858;">&nbsp;投注截止 :</span>
                <span style="color:#C7202C;" v-text="tickWord"></span>
                <span class="right" style="color:#606060;font-size: 0.22rem;margin-top: -10px;font-weight: normal;">搏一搏,单车变摩托</span>
              </div>
            </div>
          </div>
          <!--常玩彩种-->
          <div class="content clear">
            <div class="enshrine">
              <h2 style="font-weight: normal;font-size: 0.28rem;">常玩彩种</h2>
              <img v-tap="{ methods:_add_lottery }" src="./img/addbig.png" alt="">
              <p v-tap="{ methods:_accomplish_lottery }" v-show="accomplish">完成</p>
            </div>
            <div class="collecting_list">
              <!--<transition name="findIn">-->
              <section>
                <ul class="collecting_ui clear">
                  <li v-show="findin" class="collecting_li" v-for="(item,index) in enshrine"
                      v-tap="{ methods:_selectCody, item: item.nav }" :key="index">
                    <img class="lottery_icon left" :src="'static/'+item.lotteryid+'.png'" alt="">
                    <span class="lottery_name left">
                      {{item.cnname}}
                      <div class="lottery_time">{{item.lotteryDesc}}</div>
                    </span>
                    <i v-show="isIconAdd" :class="{icon_del:isIconAdd}"
                       v-tap="{ methods:_delEnshrine , item : item, index: index }"></i>
                  </li>
                </ul>
              </section>
              <!--</transition>-->
            </div>
          </div>
          <!--彩种分类-->
          <div class="content clear" v-for="items in lotteryList" v-if="items.lottery.length!=0">
            <div class="enshrine">
              <h2 class="lottery_type" v-text="items.name"></h2>
            </div>
            <div class="collecting_list">
              <ul class="clear">
                <li v-for="(item,index) in items.lottery" v-tap="{ methods:_selectCody, item: item.nav }">
                  <img class="lottery_icon left" :src="'static/'+item.lotteryid+'.png'" alt="">
                  <span class="lottery_name left">
                    {{item.cnname}}
                    <div class="lottery_time">{{item.lotteryDesc}}</div>
                  </span>
                  <i :class="{icon_add: isIconAdd, icon_added: item.isIconAdded}"
                     v-tap="{ methods:_addEnshrine, item: item ,index: index }"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import Swipe from '../swipe/Swipe.vue'
  import rollNotice from '../rollNotice/rollNotice.vue'
  import {Loading, XDialog, TransferDomDirective as TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        loading: true, // 加载玩法
        account: '', // 用户名
        findin: true,
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        sess: '',
        accomplish: false,
        isIconAdd: false,
        isIconAdded: false,
        update: false,
        showMoney: true,
        hideMoney: false,
        cqcody: ['', '', '', '', ''], // 最新一期重庆时时彩奖号
        enshrine: [], // 常玩彩种
        lotteryBet: [], // 玩法类
        ssc: [], // 时时彩
        tickWord: '', // 投注截止时间
        lotteryList: [],
        navList: [],
        lotteryType: [], // 彩种类型
        times: '', // 定时器
        showToast: false, // 活动
        clearsetTime: ''
      }
    },
    components: {
      Swipe,
      rollNotice,
      Loading,
      XDialog
    },
    watch: {
      enshrine: {
        handler: function (newVal) {
          this.enshrine = newVal
          // 提交mutation到Store
          this.$store.commit('updateEnshrine', this.enshrine)
        },
        deep: true
      }
    },
    activated() {
      this._getaccout()
      this.getMoney()
      // 提交mutation到Store
      this.$store.commit('updateTypeInput', undefined)
      // 提交mutation到Store
      this.$store.commit('updateMethodid', null)
      if (this.$store.state.home != 0) {
        this.loading = true
        this._inits()
        this.httpUrl()
        // 提交mutation到Store
        this.$store.commit('updateHome', 0)
      } else {
        this._restart_tick()
      }
      if (this.enshrine.length == 0) {
        this._enshrine()
      }
      if (this.$store.state.showToast == true) {
        this.getNowFormatDate()
      }
    },
    deactivated() {
      clearTimeout(this.clearsetTime)
      if (this.accomplish == true) {
        this._accomplish_lottery()
      }
    },
    created() {
      if (this.$store.state._lotteryBet !== null) {
        this.loading = false
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.times)
      next(true)
    },
    mounted() {
      if (this.playPlatform === 'web') {
        this.httpUrl()
        this._getaccout()
      }
      this._enshrine()
      this._getlocalStorage()
    },
    methods: {
      _message() {
        this.showToast = false
        this.$router.push({path: '/activity'})
      },
      getNowFormatDate() {
        let newTime = new Date().getTime(),
          minTime = new Date("2017/11/16 00:00:00").getTime(),
          maxTime = new Date("2017/11/26 23:59:59").getTime()
        if (newTime >= minTime && newTime <= maxTime) {
          this.clearsetTime = setTimeout(() => {
            this.showToast = true
          }, 1000)
          this.$store.commit('updataShowToast', false)
        }
      },
      _getaccout() {
        if (this.$store.state.account != null) {
          return
        }
        let account
        if (localStorage.getItem('userName') != null) {
          account = localStorage.getItem('userName')
        } else {
          account = this.$store.state.account
        }
        this.$store.commit('updateUserName', account.toLocaleLowerCase())
      },
      _activity() {
        this.$router.push({path: '/activity'})
      },
      _inits() {
        this.getSess()
        this.getMoney()
        this.getcq()
        this._restart_tick()
      },
      _enshrine() {
        let lotteryType = this.$store.state.lotteryType
        for (let i = 0; i < lotteryType.length; i++) {
          if (lotteryType[i].lotteryid == 1 || lotteryType[i].lotteryid == 14 || lotteryType[i].lotteryid == 19) {
            this.enshrine.push(lotteryType[i])
          }
        }
      },
      loadTop() {
        // 下拉加载
        this._inits()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      // 显示隐藏金额
      _moneyNumber() {
        if (this.showMoney) {
          this.showMoney = !this.showMoney
          this.hideMoney = !this.hideMoney
        } else {
          this.showMoney = !this.showMoney
          this.hideMoney = !this.hideMoney
        }
      },
      // 余额查询
      getMoney() {
        let httpurl = this.httpUrl('GETMONEY')
        this.httpAction(httpurl, (res) => {
          let money = res.data
          // 提交mutation到Store
          this.$store.commit('updateMoney', money)
        }, {'flag': 'getmoney'})
      },
      // 获取彩种分类
      getSess() {
        let i = 0
        this.lotteryList = []
        this.navList = []
        let typeSsc = [], selectFive = [], second = [], rests = [], diping = []

        let data = this.$store.state.lotteryType
        for (let item in data) {
          this.lotteryType.push(data[item])
          if (data[item].lotterytype === 2) { // 时时彩
            typeSsc.push(data[item])
          }
          if (data[item].lotterytype === 3) { // 11选5
            selectFive.push(data[item])
          }
          if (data[item].lotterytype === 4 || data[item].lotterytype === 1) { // 24小时 (临时修改)
            second.push(data[item])
          }
          if (data[item].lotterytype === 5) { // 低频
            diping.push(data[item])
          }
//          if (data[item].lotterytype === 1) { // 其他
//            rests.push(data[item])
//          }
          this.navList.push(data[item].nav)
        }
        this.lotteryList.push({name: '时时彩', lottery: typeSsc})
        this.lotteryList.push({name: '24小时', lottery: second})
        this.lotteryList.push({name: '11选5', lottery: selectFive})
        this.lotteryList.push({name: '低频', lottery: diping})
//        this.lotteryList.push({name: '其他', lottery: rests})
        this._allOzd(i)
      },
      // 获取所有玩法
      _allOzd(i) {
        let navArr = this.navList
        if (i >= navArr.length) {
          this.loading = false
          this.$store.commit('StoreLotteryBet', this.lotteryBet)
          return
        }
        this.loading = true
        let httpurl = this.httpUrl('METHOD') + '&nav=' + navArr[i]
        this.httpAction(httpurl, (res) => {
          if (res.data) {
            let data = res.data
            // 处理龙虎庄闲数据
            let lhobj = {}, zxobj = {}, _index = ''
            if (navArr[i] == 'ssc') {
              data.forEach((value, index) => {
                if (value.title === '龙虎庄闲') {
                  _index = index
                  lhobj = {...value}
                  zxobj = {...value}
                  value.label.forEach((val) => {
                    if (val.gtitle === '龙虎') {
                      lhobj.title = '龙虎'
                      lhobj.label = [val]
                    } else {
                      zxobj.title = '庄闲'
                      zxobj.label = [val]
                    }
                  })
                }
              })
              if (_index) {
                data = [...data, lhobj, zxobj]
                data.splice(_index, 1)
              }
            }
            if (navArr[i] == 'mmc') {
              this.lotteryBet[navArr[i]] = data
            } else {
              this.lotteryBet[navArr[i]] = data
            }
          }
          i++
          this._allOzd(i)
        })
      },
      _selectCody(params) {
        let nav = params.item
        let lotteryBet = this.$store.state._lotteryBet
        let selectLotteryName = ''
        let selectLotteryNameFlag = ''
        for (let i = 0, lotteryType = this.lotteryType; i < lotteryType.length; i++) {
          if (lotteryType[i].nav === nav) {
            selectLotteryName = lotteryType[i].cnname
            selectLotteryNameFlag = lotteryType[i].cnname
          }
        }
        if (lotteryBet[nav] instanceof Array) {
          if (this.$store.state.dataList == null || this.$store.state.dataList.length == 0) {
            this.$store.commit('updateSelectLotteryName', selectLotteryName)
          }
          this.$store.commit('updateSelectLotteryNameFlag', selectLotteryNameFlag)
          this.$store.commit('getNav', nav)
          this.$router.push({path: '/home/selectCody'})
        } else {
          this.$vux.alert.show({
            title: '温馨提示',
            content: lotteryBet[nav].msg
          })
          return
        }
      },
      // 获取最新重庆时时彩奖期
      getcq() {
        let httpurl = this.httpUrl('HISPRIZE')
        this.httpAction(httpurl, (res) => {
          let data = res.data.issueNumbers
          let codes = ''
          for (var i in data) {
            if (i === '1') {
              codes = data[i]
            }
          }
          this.cqcody = codes[0].code.split('')
        }, {lotteryid: '0', type: '1'})
      },
      // 添加彩种
      _add_lottery() {
        this.isIconAdd = true
        this.accomplish = true
        this._judge()
      },
      // 收藏彩种
      _addEnshrine(params) {
        let val = params.item, index = params.index, e = params.event
        let enshrineArr = this.enshrine
        let flag = false
        if (enshrineArr.length > 0) {
          for (let i = 0; i < enshrineArr.length; i++) {
            if (enshrineArr[i].lotteryid == val.lotteryid) {
              flag = true
              break
            }
          }
          if (flag === false) {
            this.enshrine.push(val)
          }
        } else {
          this.enshrine.push(val)
        }
        this._setlocalStorage()
        this._judge()
      },
      // 删除收藏
      _delEnshrine(params) {
        let item = params.item
        let index = params.index
        for (let i = 0; i < this.lotteryType.length; i++) {
          if (this.lotteryType[i].lotteryid == this.enshrine[index].lotteryid) {
            if (typeof this.lotteryType[i].isIconAdded == 'undefined' || this.lotteryType[i].isIconAdded == true) {
              this.$set(this.lotteryType[i], 'isIconAdded', false)
              this.enshrine.splice(index, 1)
              this._setlocalStorage()
              break
            }
          }
        }
      },
      // 判读是否被添加常玩彩种
      _judge() {
        for (let i = 0; i < this.lotteryType.length; i++) {
          for (let j = 0; j < this.enshrine.length; j++) {
            if (this.lotteryType[i].lotteryid == this.enshrine[j].lotteryid) {
              if (typeof this.lotteryType[i].isIconAdded == 'undefined' || this.lotteryType[i].isIconAdded == false) {
                this.$set(this.lotteryType[i], 'isIconAdded', true)
                break
              }
            }
          }
        }
      },
      // 完成
      _accomplish_lottery() {
        this.isIconAdd = false
        this.accomplish = false
        for (let i = 0; i < this.lotteryType.length; i++) {
          if (typeof this.lotteryType[i].isIconAdded != 'undefined' || this.lotteryType[i].isIconAdded == true) {
            this.lotteryType[i].isIconAdded = false
          }
        }
      },
      // 在localStorage获取常玩彩种
      _getlocalStorage() {
        let getEnshrine = window.localStorage.getItem('enshrine')
        if (getEnshrine != null) {
          getEnshrine = JSON.parse(getEnshrine)
          let _getlocalEnshrine = []
          for (let i = 0; i < getEnshrine.length; i++) {
            let parseEnshrine = JSON.parse(getEnshrine[i])
            _getlocalEnshrine.push(parseEnshrine)
          }
          this.enshrine = _getlocalEnshrine
        }
      },
      // 在localStorage存储常玩彩种
      _setlocalStorage() {
        let localEnshrine = []
        this.enshrine.forEach((item, index) => {
          localEnshrine.push(JSON.stringify(item))
        })
        if (window.localStorage) {
          localStorage.setItem('enshrine', JSON.stringify(localEnshrine))
        }
      },
      // 投注截止时间
      _restart_tick() {
        if (this.times) {
          clearInterval(this.times)
        }
        let httpurl = this.httpUrl('CURRENTPRIZE') + '&nav=ssc'
        this.httpAction(httpurl, (res) => {
          let data = res.data
          if (data.msg == 'empty') {
            this.tickWord = '00:00:00'
            return
          }
          let tick = (new Date(data.saleend.replace(/\-/g, '/')) - new Date(data.nowtime.replace(/\-/g, '/'))) / 1000
          this._start_tick(tick)
        }, {'flag': 'read', 'lotteryid': 1})
      },
      _start_tick(val) {
        this.times = setInterval(() => {
          if (val == -1) {
            this.getcq()
            this._restart_tick()
            return
          }
          this.tickWord = this.mUtils.genCountdown(val)
          val--
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/style';

  @border_radius: 0.265rem;

  .cqcody_style {
    display: inline-block;
    .wh(0.65rem, 0.65rem);
  }

  .newsList {
    position: relative;
    margin: 0 0.13rem 2rem;
    .inaline {
      .hl(0.53rem);
      width: 100%;
      position: absolute;
      top: -0.265rem;
      background: #fff;
      border-radius: @border_radius;
      z-index: 9999999;
      .icon_right {
        .icon_arrows(0.2rem, 0.22rem, #ccc, 0.1rem, 45deg)
      }
    }
    .notice {
      display: inline-block;
      width: 0.31rem;
      margin: 0.13rem 0.13rem 0 0.2rem;
    }
    .userName {
      box-sizing: border-box;
      padding: 0.55rem 0 0.2rem 0;
      font-size: 0.25rem;
      color: #515151;
      text-align: center;
      .pb {
        padding-right: 0.65rem;
      }
      .show_money {
        background: url('./img/openeye.png') no-repeat right center;
        background-size: auto 0.25rem;
        .pb
      }
      .hide_money {
        background: url('./img/close.png') no-repeat right center;
        background-size: auto 0.16rem;
        .pb
      }
      .money {
        display: inline-block;
        width: 1.6rem;
      }
    }
    .enshrine {
      position: relative;
      margin: 0.2rem 0 0 0.24rem;
      .lottery_type {
        font-weight: normal;
        font-size: 0.28rem;
      }
      img {
        position: absolute;
        width: 0.35rem;
        top: 0.04rem;
        left: 1.6rem;
      }
      p {
        position: absolute;
        top: 0;
        right: 0.5rem;
        .wh(0.8rem, 0.4rem);
        line-height: 0.41rem;
        text-align: center;
        .borderRadius(10%);
        font-size: 0.30rem;
        color: #4c4c4c;
        border: 1px solid #aaa;
        padding: 0;
        &:active {
          background: #bbb;
        }
      }
    }
  }

  .hotActivity {
    position: relative;
    background: #fff;
    padding: 0.24rem 0.2rem;
    font-size: 13px;
    border-radius: @border_radius;
  }

  .hotActivity_text {
    position: absolute;
    right: 0.2rem;
    top: 0.25rem;
    width: 1.02rem;
  }

  .hotActivity_icon {
    position: absolute;
    right: 0.88rem;
    top: 0.04rem;
    width: 1.06rem;
    vertical-align: middle;
  }

  .hotActivity_code {
    margin-top: 0.18rem;
    height: 0.65rem;
    li {
      float: left;
      .wh(0.65rem, 0.65rem);
      line-height: 0.67rem;
      text-align: center;
      border-radius: 50%;
      background: #c7202c;
      margin-right: 0.22rem;
      color: #fff;
      font-size: 0.36rem;
      font-weight: normal;
    }
  }

  .update_hook {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }

  .test_luck {
    width: 1.82rem;
    margin-top: -0.64rem;
    height: 0.62rem;
    line-height: 0.63rem;
    text-align: center;
    background: #C7202C;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.28rem;
    &:active {
      background: #ccc;
    }
  }

  .add_del {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;
    padding: 0 0 1rem 3rem;
  }

  .icon_add {
    .add_del;
    background: url('./img/addsmall.png') no-repeat right top;
    background-size: 0.3rem;
  }

  .icon_del {
    .add_del;
    background: url('./img/reduce.png') no-repeat right top;
    background-size: 0.3rem;
  }

  .icon_added {
    .add_del;
    background: url('./img/added.png') no-repeat right top;
    background-size: 0.3rem;
  }

  h2:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.2rem;
    margin-top: -0.05rem;
    height: 0.2rem;
    border: 0.05rem solid #c7202c;
    border-radius: 0.07rem;
  }

  .collecting_list {
    box-sizing: border-box;
    background: #fff;
    border-radius: 0.1rem;
    padding: 0.2rem 0.1rem 0;
    margin-top: 0.2rem;
    .lottery_icon {
      width: 0.79rem;
      vertical-align: middle;
      margin-left: 0.24rem;
      margin-right: 0.2rem;

    }
    .lottery_name {
      width: 1.8rem;
      font-size: 0.3rem;
      color: #383838;
      font-weight: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .lottery_time {
      width: 1.7rem;
      font-size: 0.24rem;
      margin-top: 0.07rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    ul {
      display: inline;
    }
    li {
      position: relative;
      box-sizing: border-box;
      float: left;
      .wh(3.2rem, 1.15rem);
      border-radius: 0.1rem;
      margin: 0 0.16rem 0.2rem;
      padding: 0.17rem 0.05rem;
      -webkit-box-shadow: 0 0 0.5rem #eee;
      -moz-box-shadow: 0 0 0.5rem #eee;
      box-shadow: 0 0 0.5rem #eee;
    }
  }

  .classify {
    font-size: 18px;
    margin: 10px 0 10px 20px;
  }

  .classify_lottery li {
    float: left;
    margin-right: 0.15rem;
  }

  .classify_lottery li:last-child {
    margin: 0;
  }

  .classify_lottery img {
    width: 1.4rem;
  }
</style>
