<template>
  <!--<transition name="slide">-->
  <div class="selectCody header_app_v main-body">
    <headTop>
        <span v-tap="{ methods: _home}" slot="goBacks">
          <img style="width: 0.39rem;" src="../header/goBack.png" class="goBacks">
        </span>
      <!--<span slot="lottery" class="lottery_img">-->
      <!--<img :src="'static/'+this.$store.state.lotteryid+'.png'" alt="">-->
      <!--</span>-->
      <popup-picker :data="ozdList" :columns="3" slot="changelottery" class="change_lottery" v-model="modelValue"
                    show-name @on-change="_ozdChange"></popup-picker>
      <img src="./img/carte.png" slot="carte" class="carte" v-tap="{ methods:_isCarteList }">
      <!--<transition name="carteshow">-->
      <section slot="carte_list" v-show="isCarteList" class="carte_section">
        <ul class="carte_list">
          <!--<li v-tap="{ methods: _showomit }">-->
          <!--{{showomit}}-->
          <!--</li>-->
          <li v-tap="{ methods: _betRecord }">
            投注记录
          </li>
          <li v-tap="{ methods: _chaseRecord }">
            追号记录
          </li>
          <li v-tap="{ methods: _lotteryCentre }">
            开奖信息
          </li>
          <li v-tap="{ methods: _help }">
            玩法介绍
          </li>
        </ul>
      </section>
      <!--</transition>-->
    </headTop>
    <div v-tap="{ methods:_hideAll }" v-show="isCarteList || showSelectList || showSelectListYJF"
         style="position: absolute; top:0;left:0;bottom:0;right:0; z-index:9;"></div>
    <div class="ballBlock" :class="playPlatform">
      <!--历史奖期-->
      <transition name="historyshow">
        <section v-show="isRecordTable" class="history_section">
          <table width="100%" height="130px" border="0" cellspacing="0" cellpadding="2" v-if='mmcshow'>
            <thead style="background:#fff;">
            <tr>
              <th width="50%">期数</th>
              <th width="50%">开奖号</th>
            </tr>
            </thead>
            <tbody>
            <tr align="center" v-for="item in hisprizeCodes">
              <td>{{item.issue}}期</td>
              <td>{{item.code}}</td>
            </tr>
            </tbody>
          </table>
          <table width="100%" height="130px" border="0" cellspacing="0" cellpadding="5" v-else>
            <thead style="background:#fff;">
            <tr>
              <th width="100%" colspan="2">开奖号</th>
            </tr>
            </thead>
            <tbody>
            <tr align="center">
              <td>
                <dl>
                  <dd v-for="(item,index) in hisprizeCodes" v-if='index<5'>{{item}}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dd v-for="(item,index) in hisprizeCodes" v-if='index>4'>{{item}}</dd>
                </dl>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
      </transition>
      <!--距离截止时间-->
      <div style="height: 0.5rem" v-if='mmcshow'>
        <div class="timePeriod">
          <div class="timePeriod_end">
            <p class="left" style="margin-left: 0.3rem;">
              距<span v-text="issueTime.issue"></span>期截止：
              <span v-text="tickWord"></span>
            </p>
            <p class="setByRandom right" v-tap="{ methods: _setByRandom }"
               v-show="codyBall && modelValue.indexOf('龙虎')<0">
              <img style="vertical-align: middle;width:0.5rem;" src="./img/iphone.png" alt="">
              <span style="color:#c7202c">机选</span>
            </p>
          </div>
          <img class="clickDown" src="./img/down.png" v-tap="{ methods: _isRecordTable }">
        </div>
      </div>
      <div style="height: 0.5rem" v-else>
        <div class="timePeriod">
          <div class="timePeriod_end">
            <p class="setByRandom right" v-tap="{ methods: _setByRandom }"
               v-show="codyBall">
              <img style="vertical-align: middle;width:0.5rem;" src="./img/iphone.png" alt="">
              <span style="color:#c7202c">机选</span>
            </p>
          </div>
          <img class="clickDown" src="./img/down.png" v-tap="{ methods: _isRecordTable }">
        </div>
      </div>
      <div v-if="methodid==='zx'" class="box_main">
        <div v-for="(item,parentIndex) in zxCode">
          <div class="parentBox">
            <span>{{item.title}}</span>
            <ul class="ballBlock_number">
              <li class="codysBall left zx" :class="it.className"
                  v-tap="{ methods:selectBall , parentIndex : parentIndex, it:it.title ,data:it}"
                  v-for="(it) in  item.item">
                {{it.title}}
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div v-else-if="codyBall" class="box_main">
        <div class="select-box" v-if="rxPlayId.indexOf(methodid)>-1">
          <Checker type="checkbox" v-model="rxSelect" default-item-class="select-item"
                   selected-item-class="active">
            <CheckerItem v-for="item in rxOptions" :value="item.key" :key="item.key">
              <check-icon :value.sync="item.flag" type="plain" class="check-icon">{{item.value}}</check-icon>
            </CheckerItem>
          </Checker>
        </div>
        <div v-for="(item,parentIndex) in layout">
          <div style="height: 0.42rem;" v-show="isButton">
            <ul class="selectedType clear">
              <li class="selectType"
                  v-tap="{ methods: _typeFun,parentIndex: parentIndex, index:index, item: item.name,playId:methodid}"
                  v-for="(item,index) in typeList">{{item.text}}
              </li>
            </ul>
          </div>
          <div class="parentBox" v-if="!item.rxShow">
            <span v-if="item.title != ''">{{item.title}}</span>
            <span v-else>选号</span>
            <ul class="ballBlock_number">
              <li class="codysBall left" :class="{'other':quwei}"
                  v-tap="{ methods:selectBall , parentIndex : parentIndex, it:it }"
                  v-for="(it,childIndex) in  codyItem">
                {{it}}
                <!--<p class="omit" v-show="omit">3</p>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="box_main">
        <div class="select-box" v-if="rxPlayId.indexOf(methodid)>-1">
          <Checker type="checkbox" v-model="rxSelect" default-item-class="select-item"
                   selected-item-class="active">
            <CheckerItem v-for="item in rxOptions" :value="item.key" :key="item.key">
              <check-icon :value.sync="item.flag" type="plain" class="check-icon">{{item.value}}</check-icon>
            </CheckerItem>
          </Checker>
        </div>
        <textarea @blur="onBlur" id="lt_write_box" v-model="danshiBall" class="textareaLong"></textarea>
        <div class="explain">
          <p v-text="this.method.methoddesc"></p>
          <p v-text="this.method.methodexample"></p>
          <p v-text="this.method.methodhelp"></p>
          <p>注意：每注号码之间请用一个空格[&nbsp;]隔开</p>
          <p style="color: #A80000;">重复，以及错误的号码会自动帮您去除</p>
        </div>
      </div>
    </div>

    <footer id="footer" class="footer" :class="{android: iSandroid}">
      <div class="random_number clear">
        <div class="left" v-tap="{ methods: _emptyCody }" style="margin-right: 0;">
          <img style="vertical-align: middle;width:0.32rem;padding-right: 0.1rem" src="./img/empty.png" alt="">
          <span style="color:#494949;margin-right:0.2rem;">|</span>
        </div>
        <div class="inputBox left">
          <div class="select" v-show="showBonus">
            <p class="selectUl" v-tap="{ methods: selectedList }" v-text="status"></p>
            <ul class="selectBox" v-show="showSelectList">
              <li style="white-space:nowrap;" :class="{activeStatus: index==1}" v-tap="{ methods: showname }"
                  v-for="(item,index) in omodels" v-text="item.vl"></li>
            </ul>
          </div>
        </div>
        <div class="inputBox left">
          <div class="select">
            <p class="selectUl yjfSelect" v-tap="{ methods: selectedListYJF }" v-text="yjfmodel"></p>
            <ul class="yjfSelectUI" v-show="showSelectListYJF">
              <li class="yjfSelect_hook" :class="{activeStatus: indexYJF == index}" v-for="(item,index) in method.modes"
                  v-tap="{ methods: getyjfSelect, item: item, index: index }" v-text="item.name"></li>
              <i class="yjfSelectsj"></i>
            </ul>
          </div>
        </div>
        <div class="code_number left">
          <div style="margin-top: -0.13rem;">投</div>
          <selectNumber min=1 minuss="1" @getCodeNumber="_getCodeNumber"></selectNumber>
          <div style="margin-top: -0.13rem;">倍</div>
        </div>
        <!--<ul class="yjf right">-->
        <!--<li :class="{ yjf_select:yjfSelect===index }" v-for="(item,index) in method.modes" v-tap="{ methods: getyjfSelect, item: item, index: index }"  v-text="item.name"></li>-->
        <!--</ul>-->
      </div>
      <div class="footer_list">
        <div class="foot_affirm">
          <div class="footer_money left">
            <strong>
              <span v-text="model.nums"></span>注
              <span v-text="model.times"></span>倍
            </strong>
            <strong style="margin-left: 0.2rem;">
              <span v-text="model.nums*100*model.times*nmodel*2/100"></span>元
            </strong>
          </div>
          <div class="buttonOk right" v-tap="{ methods: _buttonOk }">
            <buttonView :buttonTitle='codeNum' height="0.7"></buttonView>
          </div>
          <div class="button_select right" v-tap="{ methods: _addCode }">
            <buttonView buttonTitle='添加' height="0.7"></buttonView>
          </div>

        </div>
      </div>
    </footer>
  </div>
  <!--</transition>-->

</template>
<script>
  import headTop from '../header/Header.vue'
  import selectNumber from '../common/selectNumber.vue'
  import buttonView from '../common/button.vue'
  import {PopupPicker, Checker, CheckerItem, CheckIcon} from 'vux'

  import {random, checkNum, uniquelize, uniquelizeNosort} from './merge'

  export default {
    data() {
      return {
        mmcshow: false,
        codeNum: '选好了',
        showomit: '显示遗漏',
        omit: true,
        noBigIndex: 5,
        typeList: [
          {
            text: '全',
            name: 'all'
          },
          {
            text: '大',
            name: 'big'
          },
          {
            text: '小',
            name: 'small'
          },
          {
            text: '单',
            name: 'odd'
          },
          {
            text: '双',
            name: 'even'
          },
          {
            text: '清',
            name: 'clean'
          }
        ],
        quwei: false,
        iSandroid: false,
        issueTime: {}, // 距离截止期数时间
        yjfSelect: 0, // 默认选择元
        showBonus: true, // 奖金比率
        isRecordTable: false,
        isCarteList: false, // 选择菜单
        danshiBall: '', // 单式内容
        ozdList: [], // 所有玩法
        BallDan: [], // 单式投注号码
        modelValue: [],
        nowLotteryId: '',
        showPopupPicker: false,
        lotteryBet: {// 玩法类
          currentPrize: undefined,
          lottery: {
            lotteryname: '',
            method: []
          },
          methodid: ''
        },
        methodid: '', // 默认玩法
        methodName: [],
        method: {}, // 默认玩法
        model: {
          codes: [],
          contents: [],
          methodName: '',
          methodid: '',
          type: '',
          desc: '',
          nums: 0, // 注数
          times: 1, // 倍数
          money: 1, // 金额
          mode: 1,  // 元角分
          omodel: 2
        },
        lotteryname: '',
        nmodel: 1,
        omodels: {}, // 奖金比率
        codyItem: {}, // 奖号号码
        layout: [], // 位数
        typeInput: undefined, // 判断是否是单式(非单式)
        codyBall: true,
        showSelectList: false,
        showSelectListYJF: false,
        status: '',

        dataList: [], // 选好记录
        postData: { // 获取历史奖期
          lotteryid: '',
          type: 2,
          num: 5
        },
        hisprizeCodes: [], // 历史奖期
        tickWord: '', // 截止时间
        intervals: '', // 定时器
        missnum: [], //遗漏数
        isButton: false,
        isok: true,
        yjfmodel: '',
        indexYJF: 0,
        zxCode: [
          {
            title: '庄闲',
            item: [{
              title: '庄赢BANKER',
              className: 'zxh'
            },
              {
                title: '闲赢PLAYER',
                className: 'zxh'
              }]
          },
          {
            title: '和',
            item: [{
              title: '和TIE',
              className: 'zxh'
            }]
          },
          {
            title: '对子',
            item: [{
              title: '庄对子',
              className: 'z'
            }, {
              title: '闲对子',
              className: 'x'
            }]
          },
          {
            title: '豹子',
            item: [{
              title: '庄豹子',
              className: 'z'
            }, {
              title: '闲豹子',
              className: 'x'
            }]
          },
          {
            title: '天王',
            item: [{
              title: '庄天王',
              className: 'z'
            }, {
              title: '闲天王',
              className: 'x'
            }]
          }
        ],
        // 任选数据
        rxOptions: [
          {key: '1', value: '万位', flag: false},
          {key: '2', value: '千位', flag: false},
          {key: '3', value: '百位', flag: false},
          {key: '4', value: '十位', flag: true},
          {key: '5', value: '个位', flag: true},
        ],
        // 任选默认选中位置
        rxSelect: ['4', '5'],
        // 任选中 需要展示 位置的玩法id
        rxPlayId: [2437, 2447, 2457, 2467, 2477, 1010111, 1010121, 1010211, 1010221, 1010231, 1010201, 1010306, 1010401, 1010406, 1010411, 1010416],
        // 任选玩法中 和值玩法的id
        rxSumId: [2467, 2477, 1010121, 1010231],
        // 任选中 不需要大小单双的玩法
        // rxIsButton: [2447, 2467, 2457, 2477, 1010111, 1010121]
      }
    },
    components: {
      headTop,
      PopupPicker,
      selectNumber,
      buttonView,
      Checker,
      CheckerItem,
      CheckIcon
    },
    watch: {
      watchlotteryid(val, oldVal) {
        if (this.$store.state.dataList.length !== 0) {
          let _this = this
          this.$vux.confirm.show({
            title: '提示',
            content: '还有投注没有付款，是否清空',
            confirmText: '去付款',
            cancelText: '清空',
            onCancel() {
              _this.dataList = []
              _this.$store.state.dataList = []
              _this.$store.commit('updateDataList', [])
              _this.codeNum = '选好了'
              _this.$store.commit('updateSelectLotteryName', _this.$store.state.selectLotteryNameFlag)
              _this.$store.commit('updateLayout', _this.layout)
            },
            onConfirm() {
              _this.$router.push('/home/selectCody/affirm')
              _this.$store.commit('UpdateNewNav', true)
            }
          })
        }
      },
      danshiBall: {
        deep: true,
        handler: function (newVal, oldVal) {
          this._danshiBall(newVal, oldVal)
        }
      },
      rxSelect(newVal, oldVal) {
        this._calBet()
      },
      methodid: {
        deep: true,
        handler: function (val, oldVal) {
          this.methodid = val
          // 提交mutation到Store
          this.$store.commit('updateMethodid', this.methodid)
        }
      }
    },
    computed: {
      watchlotteryid() {
        return this.$store.state.lotteryid
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.intervals)
      next(true)
    },
    mounted() {
      this.dataList = this.$store.state.dataList
      this.codeNum = this.$store.state.dataList.length > 0 ? '选好了(' + this.$store.state.dataList.length + ')' : '选好了'

      this.getCodes()
      this._getOzd()
      this.initBet()

      this.$nextTick(() => {
        window.scroll(0, 0)
        // 隐藏弹出框
        this._hideAll()
        this._yjfUl()
      })
    },
    methods: {
      _yjfUl() {
        let yjfSelect_hook = document.getElementsByClassName('yjfSelect_hook')
        if (yjfSelect_hook.length == 2) {
          document.getElementsByClassName('yjfSelectUI')[0].style.top = -1.8 + 'rem'
          document.getElementsByClassName('yjfSelectsj')[0].style.top = 1.6 + 'rem'
        } else if (yjfSelect_hook.length == 3) {
          document.getElementsByClassName('yjfSelectUI')[0].style.top = -2.4 + 'rem'
          document.getElementsByClassName('yjfSelectsj')[0].style.top = 2.2 + 'rem'
        }
      },
      _hideAll() {
        this.isCarteList = false
        this.showSelectList = false
        this.showSelectListYJF = false
      },
      selectNum(p, j, idx) {
        p[j].style.background = '#c7202c'
        p[j].style.color = '#fff'
        p[j].style.borderColor = '#c7202c'
        let value = p[j].innerText
        this.addcodes(idx, value)
      },
      unSelectNum(p, j) {
        p[j].style.background = '#fff'
        p[j].style.color = '#d51623'
        p[j].style.borderColor = '#e5e5e5'
      },
      _typeFun(params) {
        let el = params.event.target
        let siblingsLi = el.parentNode.children
        let idx = params.parentIndex
        this.model.codes[idx] = []
        for (let i = 0; i < siblingsLi.length; i++) {
          if (i == params.index) {
            siblingsLi[i].style.background = '#c7202c'
            siblingsLi[i].style.color = '#fff'
          } else {
            siblingsLi[i].style.background = '#fff'
            siblingsLi[i].style.color = '#d51623'
          }
        }

        let ul = document.getElementsByClassName('ballBlock_number')[params.parentIndex]
        let p = ul.getElementsByClassName('codysBall')
        switch (params.item) {
          case 'all'   :
            for (let j = 0; j < p.length; j++) {
              this.selectNum(p, j, idx)
            }
            break;
          case 'big'   :
            for (let j = 0; j < p.length; j++) {
              // 猜中位
              if ([3111847, 236, 353, 319, 1010448].indexOf(params.playId) > -1) {
                this.noBigIndex = 3
              } else {
                this.noBigIndex = 5
              }
              if (j >= this.noBigIndex) {
                this.selectNum(p, j, idx)
              } else {
                this.unSelectNum(p, j)
              }
            }
            break;
          case 'small' :
            // 猜中位
            if ([3111847, 236, 353, 319, 1010448].indexOf(params.playId) > -1) {
              this.noBigIndex = 3
            } else {
              this.noBigIndex = 5
            }
            for (let j = 0; j < p.length; j++) {
              if (j < this.noBigIndex) {
                this.selectNum(p, j, idx)
              } else {
                this.unSelectNum(p, j)
              }
            }
            break;
          case 'odd'   :
            for (let j = 0; j < p.length; j++) {
              if ((p[j].innerText) % 2 == 1) {
                this.selectNum(p, j, idx)
              } else {
                this.unSelectNum(p, j)
              }
            }
            break;
          case 'even'  :
            for (let j = 0; j < p.length; j++) {
              if ((p[j].innerText) % 2 == 0) {
                this.selectNum(p, j, idx)
              } else {
                this.unSelectNum(p, j)
              }
            }
            break;
          case 'clean'  :
            for (let j = 0; j < p.length; j++) {
              this.unSelectNum(p, j)
            }
            break;
          default :
            break;
        }
        this._calBet();
      },

      _showomit() {
        if (this.showomit == '显示遗漏') {
          this.showomit = '隐藏遗漏'
          this.omit = false
        } else {
          this.showomit = '显示遗漏'
          this.omit = true
        }
      },
      _help() {
        this.$router.push({path: '/userInfo/help'})
      },
      _lotteryCentre() {
        this.$router.push({path: '/lotteryCentre'})
      },
      _chaseRecord() {
        this.$router.push({path: '/userInfo/chaseRecord'})
      },
      _betRecord() {
        this.$router.push({path: '/userInfo/betRecord'})
      },
      _home() {
        this.$router.push({path: '/home'})
      },
      _isRecordTable() {
        this.isRecordTable = !this.isRecordTable
        let clickDown = document.getElementsByClassName('clickDown')[0]
        if (this.isRecordTable) {
          clickDown.src = require('./img/up.png')
        } else {
          clickDown.src = require('./img/down.png')
        }

      },
      _isCarteList() {
        this.isCarteList = !this.isCarteList
      },
      getCodes() {
        if (this.$store.state.lotteryType) {
          this.nowLotteryId = this.mUtils.lotterytrans(this.$store.state.nav, 'code->id', this.$store.state.lotteryType)
        }
        let dataTemp = this.$store.state.dataList
        if (dataTemp.length > 0) {
          if (this.nowLotteryId == dataTemp[0]['lotteryid']) {
            this.codeNum = '选好了(' + dataTemp.length + ')'
          }
        }
      },
      onBlur() {
        this.iSandroid = false
        document.body.scrollTo = 0
      },
      selectedList() {
        this.showSelectList = !this.showSelectList
      },
      selectedListYJF() {
        this.showSelectListYJF = !this.showSelectListYJF
      },
      showname(params) {
        let ev = params.event
        this.status = ev.target.innerHTML
        for (let i = 0; i < this.omodels.length; i++) {
          if (this.omodels[i].vl == this.status) {
            this.model.omodel = this.omodels[i].ky
          }
        }
        this.showSelectList = !this.showSelectList
        ev.target.className = 'activeStatus'
        if (ev.target.nextElementSibling != null) {
          ev.target.nextElementSibling.className = ''
        }
        if (ev.target.previousElementSibling != null) {
          ev.target.previousElementSibling.className = ''
        }
      },
      // 选择号码
      selectBall(params) {
        let idx = params.parentIndex
        let value = params.it
        let el = params.event.target
        if (this.modelValue.indexOf('龙虎') > -1) {
          if (el.style.background === 'rgb(199, 32, 44)') {
            el.style.background = '#fff'
            el.style.color = '#d51623'
            el.style.borderColor = '#e5e5e5'
          } else {
            el.style.background = '#c7202c'
            el.style.color = '#fff'
            el.style.borderColor = '#c7202c'
            for (let i = 0; i < 2; i++) {
              if ($(el).siblings()[i].style.background === 'rgb(199, 32, 44)') {
                this.addcodes(idx, $($(el).siblings()[i]).text().trim())
                break
              }
            }
            $(el).siblings().css({
              background: '#fff',
              color: '#d51623',
              borderColor: '#e5e5e5'
            })
          }
          // 修改 选龙 虎 和 三种情况下的 奖金
          let data = this.$store.state._lotteryBet[this.$store.state.nav]
          data.forEach((item) => {
            if (item.title === '龙虎') {
              item.label[0].label.find((val) => {
                if (val.desc === (this.method.desc.slice(0, 2) + value)) {
                  this.omodels = [{
                    'vl': '奖金' + val.nfdprize.defaultprize + '-' + val.nfdprize.userdiffpoint + '%', 'ky': 1
                  }, {'vl': '奖金' + val.nfdprize.levs + '-0%', 'ky': 2}]
                  return
                }
              })
            }
          })
          this.status = this.omodels[1].vl
        } else if (this.methodid === 'zx') {
          this.method = params.data
          if (el.style.background === 'rgb(199, 32, 44)') {
            $('.zx').css({
              background: '#fff',
              color: '#d51623',
              borderColor: '#e5e5e5'
            })
          } else {
            $('.zx').css({
              background: '#fff',
              color: '#d51623',
              borderColor: '#e5e5e5'
            })
            el.style.background = '#c7202c'
            el.style.color = '#fff'
            el.style.borderColor = '#c7202c'
          }
          // 修改 庄闲 奖金
          let data = this.$store.state._lotteryBet[this.$store.state.nav]
          data.forEach((val) => {
            if (val.title === '庄闲') {
              val.label[0].label.find((v) => {
                if (value.indexOf(v.desc) > -1) {
                  this.omodels = [{
                    'vl': '奖金' + v.nfdprize.defaultprize + '-' + v.nfdprize.userdiffpoint + '%', 'ky': 1
                  }, {'vl': '奖金' + v.nfdprize.levs + '-0%', 'ky': 2}]
                  return
                }
              })
            }
          })
          this.status = this.omodels[1].vl
        } else {
          if (el.style.background === 'rgb(199, 32, 44)') {
            el.style.background = '#fff'
            el.style.color = '#d51623'
            el.style.borderColor = '#e5e5e5'
          } else {
            el.style.background = '#c7202c'
            el.style.color = '#fff'
            el.style.borderColor = '#c7202c'
          }
        }
        this.addcodes(idx, value)
      },
      // 将选中的号码push到codes中
      addcodes(idx, value) {
        // 判断玩法的种类，然后根据特殊玩法做出相应处理
        let Lodid = this.methodid
        switch (Lodid) {
          case '2357':
            value = String(value)
            this.model.codes[idx] = []
            if (this.model.codes[idx].indexOf(value) == -1) {
              this.model.codes[idx].push(value)
              return
            }
            this.model.codes[idx].splice(this.model.codes[idx].indexOf(value), 1)
            break
          case '2413':
            value = String(value)
            if (idx == 0) {
              if (this.model.codes[0].indexOf(value) == -1) {
                this.model.codes[0].push(value)
                let v = value.slice(0, 1)
                if (this.model.codes[1].indexOf(v) != -1) {
                  let inde = this.model.codes[1].indexOf(v)
                  this.model.codes[1].splice(inde, 1)
                }
                return
              }
            } else if (idx == 1) {
              if (this.model.codes[1].indexOf(value) == -1) {
                this.model.codes[1].push(value)
                let v = value + value
                if (this.model.codes[0].indexOf(v) != -1) {
                  let inde = this.model.codes[0].indexOf(v)
                  this.model.codes[0].splice(inde, 1)
                }
                return
              }
            }
            this.model.codes[idx].splice(this.model.codes[idx].indexOf(value), 1);
            break
          case '2418':
            value = String(value)
            if (idx == 0) {
              if (this.model.codes[0].indexOf(value) == -1) {
                this.model.codes[0].push(value)
                if (this.model.codes[0].length > 2) {
                  this.model.codes[0].shift()
                }
                let v = value
                if (this.model.codes[1].indexOf(v) != -1) {
                  let inde = this.model.codes[1].indexOf(v)
                  this.model.codes[1].splice(inde, 1)
                }
                return
              }
            } else if (idx == 1) {
              if (this.model.codes[1].indexOf(value) == -1) {
                this.model.codes[1].push(value)
                let v = value
                if (this.model.codes[0].indexOf(v) != -1) {
                  let inde = this.model.codes[0].indexOf(v)
                  this.model.codes[0].splice(inde, 1)
                }
                return
              }
            }
            this.model.codes[idx].splice(this.model.codes[idx].indexOf(value), 1);
            break
          case '2426':
            value = String(value)
            if (idx == 0) {
              if (this.model.codes[0].indexOf(value) == -1) {
                this.model.codes[0].push(value)
                if (this.model.codes[0].length > 1) {
                  this.model.codes[0].shift()
                }
                let v = value
                if (this.model.codes[1].indexOf(v) != -1) {
                  let inde = this.model.codes[1].indexOf(v)
                  this.model.codes[1].splice(inde, 1)
                }
                return
              }
            } else if (idx == 1) {
              if (this.model.codes[1].indexOf(value) == -1) {
                this.model.codes[1].push(value)
                let v = value
                if (this.model.codes[0].indexOf(v) != -1) {
                  let inde = this.model.codes[0].indexOf(v)
                  this.model.codes[0].splice(inde, 1)
                }
                return
              }
            }
            this.model.codes[idx].splice(this.model.codes[idx].indexOf(value), 1)
            break
          // 庄闲玩法
          case 'zx':
            if (this.model.codes.indexOf(value) < 0) {
              this.model.codes = value
              this.model.nums = 1
            } else {
              this.model.codes.splice(0)
              this.model.nums = 0
            }
            break
          default:
            value = String(value)
            if (this.model.codes[idx].indexOf(value) == -1) {
              this.model.codes[idx].push(value)
              this._calBet()
              return
            }
            this.model.codes[idx].splice(this.model.codes[idx].indexOf(value), 1)
            this._calBet()
            break
        }
      },
      // 监听投注的注数
      _calBet() {
        if (this.model.type === 'input') {
          return
        }
        let nums = checkNum(this.model.methodid, this.model.codes, this.rxSelect)
        this.model.nums = nums
        this.lotteryname = this.$store.state.nav
        // 提交mutation到Store
        this.$store.commit('updateCodes', this.lotteryname)
      },
      // 选择元角分
      getyjfSelect(params) {
        this.yjfSelect = params.index
        this.model.mode = params.item.modeid
        this.nmodel = params.item.rate
        this.yjfmodel = this.method.modes[params.index].name
        this.indexYJF = params.index
        this.showSelectListYJF = false
      },
      // 玩法切换时
      _ozdChange(arr) {
        this.$nextTick(() => {
          this._yjfUl()
        })
        this._emptyCody()
        this.typeInput = undefined
        // 处理庄闲
        if (arr[0] !== '庄闲') {
          let toStringArr = arr[arr.length - 1].toString()
          if (toStringArr.indexOf('|') < 0) {
            this.methodid = parseInt(arr[arr.length - 1])
          } else {
            let methodid = arr[arr.length - 1].split('|')
            this.methodid = parseInt(methodid[0])
            this.typeInput = methodid[1]
          }
        } else {
          this.methodid = 'zx'
          this.codyBall = false  // 庄闲 去除机选功能
        }
        let __index = this.rxPlayId.indexOf(this.methodid)
        if (__index < 5) {
          this.rxOptions = [
            {key: 'w', value: '万位', flag: false},
            {key: 'q', value: '千位', flag: false},
            {key: 'b', value: '百位', flag: false},
            {key: 's', value: '十位', flag: true},
            {key: 'g', value: '个位', flag: true},
          ]
        } else if (__index < 11) {
          this.rxOptions = [
            {key: 'w', value: '万位', flag: false},
            {key: 'q', value: '千位', flag: false},
            {key: 'b', value: '百位', flag: true},
            {key: 's', value: '十位', flag: true},
            {key: 'g', value: '个位', flag: true},
          ]
        } else {
          this.rxOptions = [
            {key: 'w', value: '万位', flag: false},
            {key: 'q', value: '千位', flag: true},
            {key: 'b', value: '百位', flag: true},
            {key: 's', value: '十位', flag: true},
            {key: 'g', value: '个位', flag: true},
          ]
        }
        // 提交mutation到Store
        this.$store.commit('updateTypeInput', this.typeInput)
        this._getMethodename(this.methodid, this.lotteryBet.lottery.method, this.$store.state.typeInput)
      },
      // 获取玩法
      _getOzd() {
        let navinfoArr = this.$store.state.lotteryType
        this.lotteryBet.lottery.lotteryname = this.$store.state.nav
        if (this.$store.state.methodid == null) {
          for (let z = 0; z < navinfoArr.length; z++) {
            if (navinfoArr[z].nav == this.lotteryBet.lottery.lotteryname) {
              this.methodid = navinfoArr[z].methodid
              break
            }
          }
        } else {
          this.methodid = this.$store.state.methodid
        }
        // 提交mutation到Store
        this.$store.commit('updateMethodid', this.methodid)
        let data = this.$store.state._lotteryBet[this.$store.state.nav]
        this.lotteryBet.lottery.method = data

        for (let i = 0; i < data.length; i++) {
          let ozd = {}
          ozd.name = data[i].title
          ozd.value = data[i].title
          ozd.parent = 0
          this.ozdList.push(ozd)
          let label_1 = data[i].label
          if (data[i].title === '庄闲') {
            let ozdChild = {}
            ozdChild.name = '庄闲'
            ozdChild.parent = ozd.value
            this.ozdList.push(ozdChild)
          } else {
            for (let j = 0; j < label_1.length; j++) {
              let label_2 = label_1[j].label
              for (let z = 0; z < label_2.length; z++) {
                let ozdChild = {}
                if (data[i].title === '龙虎') {
                  ozdChild.name = label_2[z].name.slice(0, 2)
                  if (z > 9) break // 去除后台分类的 万千和 万千虎等 只留万千
                } else {
                  ozdChild.name = label_2[z].name
                }
                ozdChild.parent = ozd.value
                if (ozdChild.name.indexOf('单式') > -1 || ozdChild.name.indexOf('混合') > -1 || ozd.name.indexOf('单式') > -1) {
                  ozdChild.value = label_2[z].methodid + '|input'
                } else {
                  ozdChild.value = label_2[z].methodid.toString()
                }
                this.ozdList.push(ozdChild)
              }
            }
          }
        }

        this._getMethodename(this.methodid, data, this.$store.state.typeInput)
      },
      // 获取玩法的方法
      _getMethodename(methodid, lotteryBet, typeInput) {
        let _method = null,
          _lotteryname = null,
          _break = false
        if (typeInput != undefined) {
          // 单式
          for (let index = 0; index < lotteryBet.length; index++) {
            _break = false
            for (let ind = 0, item = lotteryBet[index].label; ind < item.length; ind++) {
              for (let i = 0, ite = item[ind].label; i < ite.length; i++) {
                if (typeInput === ite[i].selectarea.type && ite[i].methodid == this.methodid) {
                  _lotteryname = lotteryBet[index].title
                  _method = ite[i]
                  _break = true
                  break
                }
              }
              if (_break) {
                break
              }
            }
            if (_break) {
              break
            }
          }
        } else {
          // 非单式
          for (let index = 0; index < lotteryBet.length; index++) {
            _break = false
            _lotteryname = lotteryBet[index].title
            let it = lotteryBet[index].label
            for (let idx = 0; idx < it.length; idx++) {
              let i = it[idx].label
              for (let d = 0; d < i.length; d++) {
                if (methodid != undefined && methodid != null) {
                  if (i[d].methodid != methodid) {
                    continue
                  }
                  _method = i[d]
                  _break = true
                  break
                }
                _method = i[d]
                _break = true
                break
              }
              if (_break) {
                break
              }
            }
            if (_break) {
              break
            }
          }
        }
        // 处理庄闲
        if (methodid === 'zx') {
          lotteryBet.forEach((val) => {
            if (val.title === '庄闲') {
              this.method = {...val.label[0].label[0]}
            }
          })
          this.yjfmodel = this.method.modes[this.indexYJF].name
          this.omodels = [{
            'vl': '奖金' + this.method.nfdprize.defaultprize + '-' + this.method.nfdprize.userdiffpoint + '%', 'ky': 1
          }, {'vl': '奖金' + this.method.nfdprize.levs + '-0%', 'ky': 2}]
          this.status = this.omodels[1].vl
          this.methodid = 'zx'
        } else {
          this.methodid = _method.methodid
        }
        // 提交mutation到Store
        this.$store.commit('updateMethodid', this.methodid)
        // 处理庄闲
        if (methodid === 'zx') {
          this.model.methodName = _lotteryname
        } else {
          this.model.methodName = _lotteryname + '-' + _method.name
        }
        this.modelValue = []
        this.modelValue.push(_lotteryname)
        // 处理庄闲 layout 数据 根据this.zxCode
        if (methodid === 'zx') {
          lotteryBet.forEach((value) => {
            if (value.title === '庄闲' && !this.zxCode[0].item[0].methodid) {
              value.label[0].label.forEach((value) => {
                let i = 0, j = 0
                switch (value.name) {
                  case '庄赢':
                    i = 0
                    j = 0
                    break
                  case '闲赢':
                    i = 0
                    j = 1
                    break
                  case '和':
                    i = 1
                    j = 0
                    break
                  case '庄对子':
                    i = 2
                    j = 0
                    break
                  case '闲对子':
                    i = 2
                    j = 1
                    break
                  case '庄豹子':
                    i = 3
                    j = 0
                    break
                  case '闲豹子':
                    i = 3
                    j = 1
                    break
                  case '庄天王':
                    i = 4
                    j = 0
                    break
                  case '闲天王':
                    i = 4
                    j = 1
                    break
                }
                this.zxCode[i].item[j] = Object.assign({}, {
                  ...value
                }, this.zxCode[i].item[j])
              })
            }
          })
          return false
        }
        if (typeInput != undefined) {
          this.modelValue.push(this.methodid + '|input')
        } else {
          this.modelValue.push(this.methodid.toString())
        }
        this.method = _method
        this.yjfmodel = this.method.modes[this.indexYJF].name
        this.isButton = this.method.selectarea.isButton
        if (this.method.selectarea.layout !== undefined) {
          this.layout = this.method.selectarea.layout
          let sumCode = ''
          this.layout.forEach((value, index) => {
            // 处理龙虎
            if (_lotteryname === '龙虎') {
              value.title = value.title.slice(0, 2)
              value.no = '龙|虎|和'
              this.isButton = false
            }
            // 任选和值
            if (this.rxSumId.indexOf(this.methodid) > -1) {
              sumCode += value.no + (index !== this.layout.length - 1 ? '|' : '')
              if (index > 0) {
                value.rxShow = true
              }
            }
          })
          // 任选 和值玩法
          if (this.rxSumId.indexOf(this.methodid) > -1) {
            this.layout[0].no = sumCode
            this.method.selectarea.layout = [...this.layout].splice(0, 1)
          }
          // 任选中不需要 大小单双的玩法
          // if (this.rxIsButton.indexOf(this.methodid) > -1) {
          //   this.isButton = false
          // }
          if (this.$store.state.selectLotteryNameFlag == this.$store.state.selectLotteryName) {
            // 提交mutation到Store
            this.$store.commit('updateLayout', this.layout)
          }
        }
        this._genBallOrder(typeInput)
      },
      // 生成选号列表
      _genBallOrder(type) {
        this.model.methodid = this.method.methodid
        this.model.menuid = this.method.menuid
        if (this.model.methodid == 1010447 || this.model.methodid == 351 || this.model.methodid == 317 || this.model.methodid == 234 || this.model.methodid == 3111846) {
          this.quwei = true
        } else {
          this.quwei = false
        }
        this.model.type = this.method.selectarea.type
        this.model.desc = this.method.desc
        this.omodels = [{
          'vl': '奖金' + this.method.nfdprize.defaultprize + '-' + this.method.nfdprize.userdiffpoint + '%', 'ky': 1
        }, {'vl': '奖金' + this.method.nfdprize.levs + '-0%', 'ky': 2}]
        this.status = this.omodels[1].vl
        if (this.method.nfdprize.defaultprize === undefined) {
          this.showBonus = false
          this.model.omodel = 1
        } else {
          this.showBonus = true
        }
        // 如果是单式
        if (type === 'input') {
          this.codyBall = false
          this.danshiBall = null
        } else {
          this.codyBall = true
          let no = ''
          let layout = this.layout
          this.model.codes = []
          for (let i = 0; i < layout.length; i++) {
            if (this.layout[i].place === 0) {
              if (i === 1) {
                no += '|'
              }
              no += this.layout[i].no
            }
            // 取消空值和undefined
            if (this.layout[i] == '' || typeof(this.layout[i]) == 'undefined') {
              layout.splice(i, 1)
              i = i - 1
            }
          }
          // 去除时时彩中部分彩种，直选和值有两组的情况；
          if (this.layout[0].title === '组选和值' || this.layout[0].title === '直选和值' && this.layout.length >= 2 && this.layout[0].place === this.layout[1].place) {
            this.layout[0].no = no
            this.layout.length = 1
            no = null
          }
          for (let i = this.layout.length - 1; i >= 0; i--) {
            this.model.contents[i] = []
          }
          for (let i = 0; i < this.layout.length; i++) {
            this.model.codes[i] = []
          }
          this.codyItem = this.layout[0].no.split('|')
        }
      },
      // 历史奖期
      getcq() {
        let httpurl = this.httpUrl('HISPRIZE')
        this.httpAction(httpurl, (res) => {
          let data = res.data.issueNumbers
          for (var i in data) {
            if (i === this.postData.lotteryid.toString()) {
              this.hisprizeCodes = data[i]
            }
          }
        }, this.postData)
      },
      getOnecq() {
        let httpurl = this.$store.state.server + '/mmc/?controller=mmcgameapi&action=play&sess=' + this.$store.state.sess
        this.httpAction(httpurl, (res) => {
          let data = res.data
          this.hisprizeCodes = data
        }, {"flag": "getlastcode", "lotteryid": 23})
      },
      // 机选号码--方法
      _setByRandom() {
        this._emptyCody()
        let r = random(this.methodid)
        this.model.codes = []
        for (let i = 0, layout = this.method.selectarea.layout; i < layout.length; i++) {
          // 任选 组选部分不显示
          if (layout[i].rxShow) break
          let l = []
          r[i].forEach((val, index) => {
            l.push(String(val))
          })
          this.model.codes.push(l)
        }
        let _codes = this.model.codes
        _codes.forEach((item, index) => {
          let li = document.getElementsByClassName('ballBlock_number')[index].getElementsByClassName('codysBall')
          if (typeof item == 'object') {
            for (let j = 0; j < item.length; j++) {
              for (let i = 0; i < li.length; i++) {
                if (li[i].innerText == item[j] || li[i].innerText == '0' + item[j]) {
                  li[i].style.background = '#c7202c'
                  li[i].style.color = '#fff'
                  li[i].style.borderColor = '#c7202c'
                }
              }
            }
          } else {
            for (let i = 0; i < li.length; i++) {
              if (li[i].innerText == item) {
                li[i].style.background = '#c7202c'
                li[i].style.color = '#fff'
                li[i].style.borderColor = '#c7202c'
                return
              }
            }
          }
        })
        this._calBet()
      },
      // 清空
      _emptyCody() {
        let all_li = document.getElementsByClassName('box_main')[0].getElementsByClassName('codysBall')
        let selectType = document.getElementsByClassName('selectType')
        for (let i = 0; i < all_li.length; i++) {
          all_li[i].style.background = '#fff'
          all_li[i].style.color = '#d51623'
          all_li[i].style.borderColor = '#e5e5e5'
        }
        for (let i = 0; i < selectType.length; i++) {
          selectType[i].style.background = '#fff'
          selectType[i].style.color = '#d51623'
          selectType[i].style.borderColor = '#c7202c'
        }
        this.danshiBall = ""
        this.model.nums = 0
        this.model.codes = []
        for (let i = 0; i < this.layout.length; i++) {
          this.model.codes[i] = []
        }
        this.model.contents = []
      },
      // 监听子组件倍数
      _getCodeNumber(a) {
        this.model.times = a
      },

      //添加投注
      _addCode() {
        let flag = true
        let codes = ''
        this.model['lotteryid'] = this.nowLotteryId
        if (this.model.nums == 0) {
          if (this.$store.state.dataList.length == 0) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '请先选号'
            })
          } else {
            if (!this.isok) {
              this.$router.push('/home/selectCody/affirm')
            } else {
              this.$vux.alert.show({
                title: '温馨提示',
                content: '请先添加号码'
              })
            }
          }
          this.isok = true
          return
        } else {
          if (this.$store.state.typeInput == 'input') {
            // 处理M对象
            let tempFlag = false
            let tempArr = ['15', '10', '2295', '2379', '2374', '2423', '190403', '190303', '191903', '278', '273']
            this.model.contents = ''
            for (let i = 0, len = tempArr.length; i < len; i++) {
              if (this.methodid == tempArr[i] && this.$store.state.typeInput == 'input') {
                tempFlag = true
              }
            }
            this.BallDan.forEach((itemDan, indexDan) => {
              if (tempFlag) {
                let tempVal = itemDan.split('')
                itemDan = tempVal.sort().join('')
              }
              codes += itemDan + ','
              this.model.contents += itemDan + '&'
            })
            codes = codes.substring(0, codes.length - 1) // 除去最后一个符号
            this.model.contents = this.model.contents.substring(0, this.model.contents.length - 1) // 除去最后一个符号
            this.model.codes = codes
            this.model.menuid = this.method.menuid
          } else {
            if (this.methodid != 'zx') {
              let Lodid = this.method['methodid']
              let LodName = this.method['name']
              let regd = /和值/
              //第一步：这里处理各种不同的玩法
              let r = this.model.codes
              this.model.codes = []
              for (let i = 0; i < this.method.selectarea.layout.length; i++) {
                if (this.method.selectarea.layout[i].rxShow) break
                let l = []
                r[i].forEach((val, index) => {
                  let b = String(val)
                  switch (Lodid) {
                    case '2433':
                      b = b.replace(/11/gi, 1).replace(/22/gi, 2).replace(/33/gi, 3).replace(/44/gi, 4).replace(/55/gi, 5).replace(/66/gi, 6)
                      break
                    case '2434':
                      b = b.replace(/11\*/gi, 1).replace(/22\*/gi, 2).replace(/33\*/gi, 3).replace(/44\*/gi, 4).replace(/55\*/gi, 5).replace(/66\*/gi, 6)
                      break
                    case '2439':
                      b = b.replace(/111/gi, 1).replace(/222/gi, 2).replace(/333/gi, 3).replace(/444/gi, 4).replace(/555/gi, 5).replace(/666/gi, 6)
                      break
                    default:
                      break
                  }
                  l.push(b)
                });
                this.model.codes.push(l)
              }
              //第三步，处理显示的投注号码和发送的内容
              this.model.codes.forEach((item, index) => {
                let stringKong = '';
                /*号码排序*/
                if (regd.test(LodName)) {
                  let itemK = [];
                  item.forEach((value, index) => {
                    if (value.length === 1) {
                      itemK.push("0" + value);
                    } else {
                      itemK.push(value)
                    }
                  });
                  itemK = itemK.sort()
                  itemK.forEach((value, index) => {
                    if (Number(value) < 10) {
                      codes += (value.split("")[1] + ",");
                    } else {
                      codes += (value + ",");
                    }
                  });
                } else {
                  item = item.sort()
                  item.forEach((value, index) => {
                    codes += (value + ",");
                  });
                }
                if (item.length > 0) {
                  codes = codes.substring(0, codes.length - 1);
                }
                ;
                codes += "|";
              });
              codes = codes.substring(0, codes.length - 1); //除去最后一个竖线
              this.model.contents = this.model.codes
              this.model.codes = codes
              this.model.menuid = this.method.menuid
            } else {
              codes = this.model.codes
              this.model.type = 'lhzx_zx'
            }
            if (this.rxPlayId.indexOf(this.methodid) > -1) {
              this.model.poschoose = this.rxSelect.toString()
            }
          }
          //第四步，检测购物篮中是否已经存在m对象了。如果不存在则添加进入购物篮
          if (this.$store.state.dataList.length != 0) {
            this.dataList = this.$store.state.dataList
            // 检测购物篮中是否已经存在m对象了。如果不存在则添加进入购物篮
            this.$store.state.dataList.forEach((item, index) => {
              if (item.type == this.model.type && item.methodid == this.model.methodid) {
                if (item.codes == codes) {
                  this.$vux.alert.show({
                    title: '温馨提示',
                    content: '确认区已有相同的投注内容'
                  })
                  flag = false
                  this.danshiBall = ''
                  return
                }
              }
            })
            if (flag) {
              for (let i = 0; i < this.model.codes.length; i++) {
                if (this.model.codes[i].length === 0) {
                  break
                } else {
                  this.model.money = this.model.nums * 100 * this.model.times * this.nmodel * 2 / 100
                  let tempModel = JSON.parse(JSON.stringify(this.model))
                  this.dataList.unshift(tempModel)
                  break
                }
              }
            }
          } else {
            this.model.money = this.model.nums * 100 * this.model.times * this.nmodel * 2 / 100
            var tempModel = JSON.parse(JSON.stringify(this.model))
            this.dataList.unshift(tempModel)
          }
          if (flag) {
            // 提交mutation到Store
            this.$store.commit('updateDataList', this.dataList)
            this.$store.commit('updateLayout', this.layout)
            // 提交mutation到Store
            this.$store.commit('updateModel', JSON.parse(JSON.stringify(this.model)))
            if (!this.isok) {
              this.$router.push('/home/selectCody/affirm')
            } else {
              this.codeNum = '选好了(' + this.dataList.length + ')'
            }
          } else {
            if (!this.isok) {
              this.$router.push('/home/selectCody/affirm')
            }
          }
          this._emptyCody()
        }
      },
      // 选好了
      _buttonOk() {
        this.isok = false
        this._addCode()
        /*if(this.$store.state.dataList.length > 0){
          this.$router.push('/home/selectCody/affirm')
        }else{
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请先添加投注'
          })
        }*/
      },
      initBet() {
        this.lotteryBet.methodid = this.methodid

//        this._getMethodename(this.lotteryBet.methodid, this.lotteryBet.lottery.method,undefined)
        this.postData.lotteryid = this.mUtils.lotterytrans(this.$store.state.nav, 'code->id', this.$store.state.lotteryType)
        // 提交mutation到Store
        this.$store.commit('updateIotteryid', this.postData.lotteryid)
        if (this.postData.lotteryid == 23) {
          this.mmcshow = false
          this.getOnecq() // 秒秒彩个人奖号
        } else {
          this.mmcshow = true
          this.getcq() // 历史奖期
          this._restart_tick() // 投注截止时间
          this.getnewcq()
        }
      },
      getnewcq() {
        let map = {}
        map['nav'] = this.$store.state.nav
        let data = {}
        data.flag = 'read'
        data.lotteryid = this.mUtils.lotterytrans(map['nav'], 'code->id', this.$store.state.lotteryType)

        let httpurl = this.$store.state.server + this.mUtils.interFace('CURRENTPRIZE') + '&nav=' + map['nav'] + '&sess=' + this.$store.state.sess
        this.httpAction(httpurl, (res) => {
          this.issueTime = res.data

          // 提交mutation到Store
          this.$store.commit('updateIssueTime', this.issueTime)

//          this.getList(data.lotteryid)
        }, data)
      },
      // 获取遗漏数
      getList(value) {
        let trendurl = this.httpUrl('TREND')
        this.httpAction(trendurl, (res) => {
          let allData = res.data
          let appears = allData.appears //获得次数
          this.missnum = []
          for (let i = 0; i < appears.length; i++) {
            for (let val in appears[i]) {
              let tempval = appears[i][val] == 0 ? 1 : appears[i][val]
              this.missnum.push(Math.floor(100 / tempval))
            }
          }
        }, {lotteryId: value, issueCount: 100})
      },

      // 投注截止时间
      _restart_tick() {
        if (this.intervals) {
          clearInterval(this.intervals)
        }
        let httpurl = this.httpUrl('CURRENTPRIZE') + '&nav=' + this.$store.state.nav
        this.httpAction(httpurl, (res) => {
          let data = res.data
          let tick = (new Date(data.saleend.replace(/\-/g, '/')) - new Date(data.nowtime.replace(/\-/g, '/'))) / 1000
          this._start_tick(tick)
        }, {'flag': 'read', 'lotteryid': this.postData.lotteryid})
      },
      _start_tick(val) {
        this.intervals = setInterval(() => {
          if (val == -1) {
            this.getnewcq()
            this.getcq() // 历史奖期
            this._restart_tick()
            return
          }
          this.tickWord = this.mUtils.genCountdown(val)
          val--
        }, 1000)
      },
      // 监听单式内容
      _danshiBall(newVal, oldVal) {
        if (this.danshiBall === null) {
          return
        }
        if (newVal !== oldVal) {
          let context = this.danshiBall,
            d = /０１２３４５６７８９/,
            reg = /^[\d ]*$/
          if (d.test(context)) {
            context = context.replace(/０/g, '0').replace(/１/g, '1').replace(/２/g, '2').replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5').replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9')
          }
          if (reg.test(context)) {
            this.selectBallDanshi(context)
            return
          } else {
            document.getElementsByTagName('textarea')[0].blur()
            this.$vux.alert.show({
              content: '请不要输入字母，除[空格]以外的特殊字符'
            })
            this.danshiBall = this.danshiBall.slice(0, -1)
          }
        }
      },
      // 单式，组选单式以及混合组选
      selectBallDanshi(value) {
        if (this.danshiBall === null) {
          return
        }
        let DanID = (this.method.methodid).toString(),
          valueArr, BellArr = [],
          Sid = null, // 这里是获取单式对应复式的一注的号码个数
          d = this.lotteryBet.lottery.lotteryname.search(/11/g),
          dd = this.lotteryBet.lottery.lotteryname.search(/pk10/g),//pk时单式
          too = 1
        // 配置Sid开始
        // (1)一般的单式以及11选5部分单式，一中一
        if (d != -1 || dd != -1) {
          too = 2;
        }
        this.lotteryBet.lottery.method.forEach(function (item) {
          item.label.forEach(function (ite) {
            ite.label.forEach(function (i) {
              if (DanID == i.methodid && i.selectarea.type == 'digital') {
                Sid = i.selectarea.layout.length * too
              }
            })
          })
        })
        // (2)11选5单式，混合组选，组选单式
        let IDarr = [
          ['28', '26', '2391', '2390', '2386', '190802', '190801', '2404', '2405', '2591', '2592', '289', '291', '2340', '2341', '1205', '1203', '2205', '2199', '2203', '3111598', '3111597', '1020501', '1020500'], //时时彩2码 组选
          ['15', '10', '2295', '2385', '2448', '139', '134', '2577', '2572', '2635', '278', '273', '2379', '2374', '2423', '190403', '190303', '191903', '2330', '2334', '1194', '2194', '3111586', '3111581', '3111630', '1010486', '1010480', '1010540'], //时时彩3码组选
          ['226', '240', '343', '357', '309', '323', '1010442', '1010450'], //4  11选5的2码组选以及任选单式2中2
          ['222', '243', '339', '359', '305', '325', '1010440', '1010451'], //6  11选5的3码组选以及任选单式3中3
          ['246', '361', '327', '1010452'], //8 11选5组选4中4
          ['249', '363', '329', '1010453'], //10 11选5组选5中5
          ['252', '365', '331', '1010454'], //12 11选5组选6中5
          ['255', '367', '333', '1010455'], //14 11选5组选7中5
          ['258', '369', '335', '1010456'], //16 11选5组选8中5
          ['220', '224', '337', '341', '303', '307', '1010439', '1010441', '3111007', '3111008', '3111024', '3111025', '3111027'], //这是11选5直选单式
          ['2447', '2457', '1010111', '1010306']
        ];
        let i = 0
        while (i < 9) {
          if (IDarr[i].indexOf(DanID) > -1) {
            switch (i) {
              case 0:
                Sid = 2
                break
              case 1:
                Sid = 3
                break
              case 2:
                Sid = 4
                break
              case 3:
                Sid = 6
                break
              case 4:
                Sid = 8
                break
              case 5:
                Sid = 10
                break
              case 6:
                Sid = 12
                break
              case 7:
                Sid = 14
                break
              case 8:
                Sid = 16
                break
              default:
                break
            }
          }
          i++
        }
        // 任选
        let _rxIndex = IDarr[10].indexOf(DanID)
        switch (_rxIndex) {
          case 0:
          case 1:
            Sid = 2
            break
          case 2:
          case 3:
            Sid = 3
          default:
            break
        }
        valueArr = uniquelize(value.split(' '))
        // 第二步
        if (IDarr[0].indexOf(DanID) > -1 || IDarr[1].indexOf(DanID) > -1) {                   // 时时彩2码,3码组选
          this.ArrayNound(valueArr).forEach(function (item, index) {
            if (item.length == Sid) {
              // 这里去除3个一样的号码uniquelizeNosort
              if (uniquelizeNosort(item.split('')).length != 1) {
                BellArr.push(item)
              }
            }
          })
        } else if (d != -1 || dd != -1) { // 11选5去重复
          if (IDarr[9].indexOf(DanID) > -1) {
            valueArr.forEach((item, index) => {
              // 去除匹配数组项中长度小于或大于Sid的项
              if (item.length == Sid) {
                let it = ' ',
                  itemA = this.StringToArray(item)
                if (uniquelize(itemA).join('').length == Sid) {
                  this.StringToArray(item).forEach(function (i) {
                    if (Number(i) < 12 && Number(i) > 0) {
                      it += i + ' '
                    }
                  })
                }
                it = it.trim()
                if (it.length == (Sid + this.StringToArray(item).length - 1)) {
                  BellArr.push(it)
                }
                itemA = it = null
              }
            })
          } else {
            this.ArrayNoundDub(valueArr).forEach((item, index) => {
              // 去除匹配数组项中长度小于或大于Sid的项
              if (item.length == Sid) {
                let it = ' '
                this.StringToArray(item).forEach(function (i) {
                  it += i + ' '
                })
                it = it.trim()
                if (it.length == (Sid + this.StringToArray(item).length - 1)) {
                  BellArr.push(it)
                }
                it = null
              }
            })
          }
        } else {
          valueArr.forEach(function (item, index) {
            // 去除匹配数组项中长度小于或大于Sid的项
            if (item.length === Sid) {
              BellArr.push(item)
            }
          })
        }
        // -去除重复数组结束-
        // model.times投注倍数
        // 带★的三步是单式投注之后没有合单而弃用
        /* ★//这里是单式投注的号码
         scope.BallDan = scope.ArrayToBell(BellArr);*/
        this.BallDan = BellArr
        // 这里只是单式输入时，展示金额
        this.model.nums = this.BallDan.length
//        this.model.money = accMul(accMul(accMul(this.BallDan.length, this.model.times), GETMODE(this.model.mode)), 2)
        // 消除临时变量
        DanID = valueArr = BellArr = Sid = d = too = null
      },
      // 11选5组选去重
      ArrayNoundDub(a) {
        let re = []
        for (let i = 0, len = a.length; i < len; i++) {
          if (a[i].length >= 2) {
            let d = uniquelize(this.StringToArray(a[i])).sort().map(function (item, index) {
              if (Number(item) < 12 && Number(item) > 0) {
                return item
              }
            }).join('')
            if (d.length == a[i].length) {
              re.push(d)
            }
          }
        }
        if (re.length == 0) {
          return re
        } else {
          return uniquelize(re)
        }
      },
      // 数组["010206","030506"]转换为可以投注的格式[[01,02,06],[03,05,06]]为实现
      // 字符串"010206"转换为数组格式['01','02','06']，只能用于数字
      StringToArray(string) {
        let reg = /\d{2}/g, rs = string.match(reg)
        return rs
      },
      // 时时彩3码和2码组选去除重复以及不符合的号码，但是为去除3个相同的号码
      ArrayNound(a) {
        let re = []
        for (let i = 0, len = a.length; i < len; i++) {
          let d = a[i].split('').sort().join('')
          if (d.length == a[i].length) {
            re.push(d)
          }
        }
        if (re.length == 0) {
          return re
        } else {
          return uniquelize(re)
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  @historyshow_height: 130px;

  .lottery_img {
    position: absolute;
    top: 54%;
    transform: translateY(-50%);
    /*margin-left: 1.5rem;*/
    left: 20%;
    img {
      width: 0.5rem;
    }
  }

  .yjfSelect {
    padding: 0 0.5rem 0 0.1rem !important;
  }

  .select {
    position: relative;
    margin: 0.15rem 0.1rem 0 0;
  }

  .setByRandom {
    padding: 0 0.3rem 0 0.5rem;
  }

  .yjfSelectUI {
    position: absolute;
    top: -2.4rem;
    left: 0;
    line-height: 0.6rem;
    border: 1px solid #c8c8c8;
    .borderRadius(0.1rem);
    background: #fff;
    z-index: 99;
    padding: 0.2rem 0;
    li {
      width: 1rem;
      text-align: center;
    }

    .yjfSelectsj {
      .triangle_down(2.2rem, 0.35rem, 0.2rem, #ccc);
    }
  }

  .selectBox {
    position: absolute;
    top: -1.8rem;
    left: 0;
    border: 1px solid #c8c8c8;
    .borderRadius(0.1rem);
    background: #fff;
    z-index: 99;
    padding: 0.2rem 0;
    &:after {
      .triangle_down(1.6rem, 0.8rem, 0.2rem, #ccc);
    }
    li {
      line-height: 0.6rem;
      height: 0.6rem;
      text-align: center;
      padding: 0 0.1rem;
    }
  }

  .activeStatus {
    background: #eee;
  }

  .selectUl {
    box-sizing: border-box;
    border: 1px solid #c8c8c8;
    padding: 0 0.3rem 0 0.05rem;
    height: 0.52rem;
    line-height: 0.52rem;
    &:after {
      .triangle_down(0.22rem, 0.1rem, 0.13rem, #7D7D7D);
    }
  }

  .carte_section {
    position: absolute;
    top: 0.88rem;
    right: 0;
    .wh(2.8rem, 6rem);
    overflow: hidden;
    /*white-space:nowrap;*/
  }

  .carteshow-enter-active, .carteshow-leave-active {
    transition: .2s all ease;
    opacity: 1;
    .wh(2.8rem, 3.2rem);
  }

  .carteshow-enter, .carteshow-leave-active {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .history_section {
    width: 100%;
    height: @historyshow_height;
    overflow: hidden;
  }

  .historyshow-enter-active, .historyshow-leave-active {
    transition: .2s all linear;
    width: 100%;
    height: @historyshow_height;
  }

  .historyshow-enter, .historyshow-leave-active {
    width: 100%;
    height: 0;
  }

  .carte {
    .wr(0.58rem, 0.2rem);
    padding: 0.2rem 0 0.2rem 0.4rem;
    .jz;
  }

  .carte_list {
    box-sizing: border-box;
    position: absolute;
    top: 0.52rem;
    right: 0.2rem;
    background: #fff;
    .wh(2.26rem, 4rem);
    box-shadow: 0 0 0.05rem #adadad;
    li:first-child {
      &:before {
        border: 0;
      }
    }
    li {
      .hl(1rem);
      text-align: center;
      color: #666;
      font-size: 0.28rem;
      &:before {
        .border-1px(80%, solid, #ddd);
        margin-left: 10%;
      }
      &:active {
        background: #ddd;
      }
      img {
        width: 0.34rem;
        vertical-align: middle;
        margin-right: 0.22rem;
      }
    }
  }

  .ballBlock {
    .timePeriod {
      position: relative;
      .clickDown {
        box-sizing: border-box;
        width: 2rem;
        padding: 0 0.2rem 0.2rem 0.2rem;
        .cl;
        top: 0.5rem;
        z-index: 1;
      }
      .timePeriod_end {
        position: absolute;
        width: 100%;
        /*text-align: center;*/
        color: #515151;
        background: #fff;
        .hl(0.5rem);
        z-index: 9;
        span {
          color: @color_c7202c;
        }
        &:after {
          top: 0.5rem;
          .border-1px(100%, solid, #D9D9D9)
        }
      }
    }
    .box_main {
      margin: 0.6rem 0.2rem 3rem;
      .explain {
        margin: 0.4rem 0;
        p {
          color: #999999;
          padding: 0.1rem 0;
        }
      }
      .textareaLong {
        box-sizing: border-box;
        .borderRadius(0.05rem);
        .wh(100%, 5rem);
        overflow: auto;
        margin: 0 auto;
        display: block;
        font-size: 14px;
        border: 1px solid #9ea3a8;
        padding: 15px;
        color: #000;
        resize: none;
        outline: none;
        position: relative;
        z-index: 30;
      }
      .textareaLong:focus {
        outline: none;
      }
      .selectedType {
        float: right;
        li {
          float: left;
          .wh(0.38rem, 0.38rem);
          line-height: 0.38rem;
          text-align: center;
          margin-right: 0.2rem;
          border: 1px solid #c7202c;
          .borderRadius(0.1rem);
          background: #fff;
          color: #c7202c;
        }
      }
      .parentBox {
        position: relative;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0.2rem;
        margin: 0.14rem 0;
        padding: 0.15rem 0 0.15rem 0.45rem;
        span {
          display: inline-block;
          width: 9%;
          margin: 0.3rem 0.3rem 0 0;
          color: #656565;

          font-size: 0.28rem;
          vertical-align: top;
        }
        .ballBlock_number {
          display: inline-block;
          width: 84%;
          .codysBall {
            box-sizing: border-box;
            border: 1px solid #e5e5e5;
            .wh(0.75rem, 0.75rem);
            line-height: 0.74rem;
            text-align: center;
            border-radius: 50%;
            margin: 0.19rem 0.3rem 0 0;
            font-size: 0.3rem;
            color: #d51623;
          }
          .zx {
            .wh(auto, 0.75rem);
            border-radius: 0.375rem;
            padding: 0 .25rem;
          }
          .omit {
            width: 0.75rem;
            text-align: center;
            margin-top: 0.14rem;
            color: #999;
            font-size: 0.2rem;
          }
          li.other {
            width: auto;
            border-radius: 0.1rem;
            padding: 0.1rem 0.2rem;
            height: auto;
            line-height: 1;
          }
          .checked {
            background: #c7202c;
            color: #fff;
            border-color: #c7202c;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -0.4rem 0.4rem #f2f2f2;
    background: #fff;
    z-index: 20;
    .code_number {
      color: #494949;
      height: 26px;
      margin-top: 0.15rem;
      div {
        float: left;
        &:first-child, &:last-child {
          height: 0.5rem;
        }
      }
    }
    .yjf {
      margin-top: 0.15rem;
      li {
        float: left;
        text-align: center;
        background: #e8e8e8;
        .wh(0.47rem, 0.47rem);
        line-height: 0.48rem;
        color: #474747;
        margin-left: 0.05rem;
        border-radius: 0.1rem;
        &:first-child {
          margin-left: 0;
        }
      }
      .yjf_select {
        background: #c7202c;
        color: #fff;
      }
    }
    .random_number {
      box-sizing: border-box;
      .hl(0.8rem);
      padding: 0 0.2rem;
      width: 100%;
      white-space: nowrap;
    }
    .foot_affirm {
      width: 100%;
      .footer_money {
        .hl(1rem);
        strong {
          font-weight: normal;
          color: @color_font;
          span {
            color: @color_c7202c;
          }
        }
      }
    }
  }

  .footer_list {
    position: relative;
    height: 1rem;
    padding: 0 0.2rem;
    &:before {
      .border-1px(100%, solid, #D9D9D9)
    }

    .foot_select {
      .wh(120px, 25px)
    }
    .foot_bonus {
      padding-top: 0.3rem;
    }
  }

  .buttonOk {
    margin-top: 0.13rem
  }

  .button_select {
    margin: 0.13rem 0.2rem 0 0;
  }

  .vux-cell-box:before {
    border-top: 0;
  }

  .vux-popup-picker-select {
    width: 102% !important;
  }

  .vux-popup-picker-value {
    display: inline-block;
    max-width: 3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .select-box {
    margin-bottom: .2rem;
    .select-item {
      width: 20%;
      font-size: 14px;
    }
  }
</style>
