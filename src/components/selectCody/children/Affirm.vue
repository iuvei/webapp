<template>
  <div>
    <headTop headTitle="确认投注" goBack='true'></headTop>
    <div class="time_period header_app_v main-body" v-if='mmcshow' :class="playPlatform">
      <div class="clear">
        <p class="left">
          <span v-text="this.$store.state.selectLotteryName"></span>
          <span>第</span>
          <strong v-text="this.avinul"></strong>
          <span>期</span>
        </p>
        <p class="times right">
          <span>投注截止：</span>
          <strong v-text="tickWord"></strong>
        </p>
      </div>
    </div>
    <div class="time_period header_app_v main-body" v-else :class="playPlatform">
      <div class="clear">
        <p class="left">
          <span v-text="this.$store.state.selectLotteryName"></span>
        </p>
      </div>
    </div>
    <div class="select_type">
      <div class="select_button" v-show="isSelect">
        <span v-tap="{ methods: _break }">
          <!--<strong>+</strong>-->
          自选号码
        </span>
        <span v-tap="{ methods: _addRandomBet }">
          <!--<strong>+</strong>-->
          机选号码
        </span>
      </div>
      <div class="select_cody">
        <div class="select_cody_top">
          <span></span>
          <i></i>
        </div>
        <div class="select_cody_number">
          <ul class="select_cody_number_list">
            <li class="number_list_li" v-for="(item,index) in dataList">
              <div class="number_details">
                <img src="./close.png" v-tap="{ methods: _delCodes, index: index }" alt="">
                <div class="number_style">
                  <div class="number_text" v-text="item.codes"></div>
                  <div>
                    <span class="left" style="color:#666;"
                          v-text="item.methodName.indexOf('龙虎')>-1?item.methodName.slice(0,5):item.methodName"></span>
                    <span class="right" style="color:#363636;">{{item.nums}}注{{item.money}}元</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="affirm_foot_empty" v-tap="{ methods: emptyDataList }">
            <img style="vertical-align: middle;width:0.29rem;" src="../img/empty.png" alt="">
            <span style="color:#494949;">清空</span>
          </div>
        </div>
      </div>
    </div>
    <div class="affirm_foot">
      <div class="affirm_foot_finally">
        <div class="affirm_foot_number">
          <div class="affirm_select_number clear">
            <div class="multiple">
              <div>投</div>
              <selectNumber min=1 minuss=1 @getCodeNumber="onTimesSame"></selectNumber>
              <div>倍</div>
            </div>
            <div class="multiple" v-show='mmcshow'>
              <div>追</div>
              <selectNumber min=0 minuss=1 @getCodeNumber="onCountInput"></selectNumber>
              <div>期</div>
            </div>
            <div class="multiple" v-show='!mmcshow'>
              <div>连续开</div>
              <selectNumber min=1 minuss=1 @getCodeNumber="onCountMMC"></selectNumber>
              <div>期</div>
            </div>
            <transition name="slideLeft">
              <div class="right" v-show="isStopshow">
                <p class="stop" :class="{stopStyle: isStopStyle}" v-tap="{ methods: _isStop }">{{stopText}}</p>
              </div>
            </transition>
          </div>
        </div>
        <div class="affirm_foot_money">
          <div class="foot_money">
            <p style="color:#494949;">账户余额</p>
            <p><span style="color:#c7202c;">{{money | tofixed('')}}</span>&nbsp;元</p>
          </div>
          <div class="foot_money">
            <p>共&nbsp;<span style="color:#c7202c;">{{allMoney}}</span>&nbsp;元</p>
            <p>
              <span style="color:#c7202c;" v-text="allNums"></span>&nbsp;注
            </p>
          </div>

          <div class="button_p" v-tap="{ methods: _goConfirm }">
            <buttonView buttonTitle="确认投注" height="0.7"></buttonView>
          </div>
        </div>
        <div class="mmcdiv" id='mmcdiv' style="display: none;">
          <div class="mmcoverlay"></div>
          <div class="mmcdialog">
            <div class="mmctitle">连续开奖</div>
            <div class="mmccontent">
              <div class='mmcctt' id='mmcctt'></div>
            </div>
            <div class="mmcstop" id='mmcstop' @click='topmmc'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import selectNumber from '../../common/selectNumber.vue'
  import buttonView from '../../common/button.vue'
  import {random, checkNum, lt_method} from '../merge'
  import mUtils from "../../../assets/js/mUtils";

  export default {
    data() {
      return {
        mmcshow: false,
        isStopshow: false,
        stopText: '中奖追停',
        avinul: '',
        money: this.$store.state.money, // 账户余额
        dataList: [], // 投注信息
        tickWord: '', // 截止时间
        bets: {
          flag: 'save',
          lotteryid: '',
          play_source: this.playSource,
          lt_issue_start: '',
          lt_total_money: 0,
          lt_total_nums: 0,
          lt_project: []
        },
        allMoney: '', // 总共投注金额
        allNums: '', // 总注数
        allowPeriods: '', // 可追期数
        isSelect: true, // 判断自选机选
        isStopStyle: false,
        lt_trace_stop: 'yes',
        init: undefined,
        mmctime: 1,
        mmcStop: true,
        mmcbonus: 0,
        lh_obj: {
          'wql': 'l1h2',
          'wqt': 'h1l2',
          'wqh': 'wqh',
          'wbl': 'l1h3',
          'wbt': 'h1l3',
          'wbh': 'wbh',
          'wsl': 'l1h4',
          'wst': 'h1l4',
          'wsh': 'wsh',
          'wgl': 'l1h5',
          'wgt': 'h1l5',
          'wgh': 'wgh',
          'qbl': 'l2h3',
          'qbt': 'h2l3',
          'qbh': 'qbh',
          'qsl': 'l2h4',
          'qst': 'h2l4',
          'qsh': 'qsh',
          'qgl': 'l2h5',
          'qgt': 'h2l5',
          'qgh': 'qgh',
          'bsl': 'l3h4',
          'bst': 'h3l4',
          'bsh': 'bsh',
          'bgl': 'l3h5',
          'bgt': 'h3l5',
          'bgh': 'bgh',
          'sgl': 'l4h5',
          'sgt': 'h4l5',
          'sgh': 'sgh',
        },
        // 任选中 需要展示 位置的玩法id
        rxPlayId: ['RX2ZUXFS', 'RX2ZXDS', 'RX2ZUXDS', 'RX2ZXHZ', 'RX2ZUXHZ', 'RX3ZXDS', 'RX3ZXHZ', 'RX3ZUXZ6', 'RX3ZUXHX', 'RX3ZUXHZ', 'RX3ZUXZ3', 'RX4ZXDS', 'SSCRX4ZUX24', 'SSCRX4ZUX12', 'SSCRX4ZUX6', 'SSCRX4ZUX4'],
        // 任选玩法中 和值玩法的id
        rxSumId: ['RX2ZXHZ', 'RX2ZUXHZ', 'RX3ZXHZ', 'RX3ZUXHZ'],
        // 任选中 组选玩法 id
        rxZXIds: ['RX2ZUXFS', 'RX3ZUXZ3', 'RX3ZUXZ6', 'SSCRX4ZUX24', 'SSCRX4ZUX6'],
        // 任选4 组选12 id
        rx4ZX12Ids: ['SSCRX4ZUX12'],
        // 任选中 单式玩法 id
        rxZuDsIds: ['RX2ZXDS', 'RX2ZUXDS', 'RX3ZXDS']
      }
    },
    watch: {
      dataList: {
        handler(newValue, oldValue) {
          // 提交mutation到Store
          this.$store.commit('updateDataList', this.dataList)
          this._allMoney()
          if (newValue.length > 0) {
            this._iSselect()
          }
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval)
      next(true)
    },
    created() {
      this._iSselect()
      if (this.$store.state.navflag) {
        this._newNav()
        this.$store.commit('UpdateNewNav', false)
      }
    },
    mounted() {
      this._showCodes()
      if (this.$store.state.lotteryid == 23) {
        this.mmcshow = false
        document.getElementById('mmcstop').innerHTML = '停止'
      } else {
        this.mmcshow = true
        this._restart_tick()
        this._getAvailableissue()
      }
    },
    methods: {
      _break() {
        this.$router.go(-1)
      },
      // 重定义nav
      _newNav() {
        let lotteryType = this.$store.state.lotteryType
        for (let i = 0; i < lotteryType.length; i++) {
          if (lotteryType[i].cnname == this.$store.state.selectLotteryName) {
            this.$store.commit('getNav', lotteryType[i].nav)
            this.$store.commit('updateMethodid', lotteryType[i].methodid)
            this.$store.commit('updateIotteryid', lotteryType[i].lotteryid)
            return
          }
        }
      },
      _isStop() {
        if (!this.isStopStyle) {
          this.lt_trace_stop = 'no'
          this.isStopStyle = true
        } else {
          this.lt_trace_stop = 'yes'
          this.isStopStyle = false
        }
      },
      _iSselect() {
        if (this.$store.state.dataList[0].methodName.indexOf('单式') > -1 || this.$store.state.dataList[0].methodName.indexOf('混合') > -1 || this.$store.state.methodid === 'zx' || (this.$store.state.methodid >= 3110666 && this.$store.state.methodid <= 3110675)) {
          this.isSelect = false
        } else {
          this.isSelect = true
        }
      },
      // 处理投注号码
      _showCodes() {
        /*
        let model = this.$store.state.dataList
        for (let i = 0; i < model.length; i++) {
          if (typeof model[i].codes === 'string') {
            continue
          } else {
            model[i].codes = model[i].codes.join('|')
          }
        }
        let codes = this.$store.state.dataList[0].codes
        if (codes.charAt(codes.length - 1) === '|') {
          this.$store.state.dataList[0].codes = codes.substring(0, codes.length - 2)
        }*/
        this.dataList = this.$store.state.dataList
      },
      // 机选号码
      _addRandomBet() {
        if (this.$store.state.dataList.length != 0 && (this.$store.state.dataList[0].methodName.indexOf('单式') > -1 || this.$store.state.dataList[0].methodName.indexOf('混合') > -1)) {
          return
        }
        let tempfalg = true
        let codes = ''
        let model = {
          'codes': [],
          'contents': [],
          'methodName': '',
          'methodid': '',
          'type': '',
          'desc': '',
          'nums': '', // 注数
          'times': 1, // 倍数
          'money': '', // 金额
          'mode': 1,  // 元角分
          'omodel': 1
        }
        model.desc = this.$store.state.model.desc
        model.methodName = this.$store.state.model.methodName
        model.methodid = this.$store.state.model.methodid
        model.menuid = this.$store.state.model.menuid
        model.money = ''
        model.nums = ''
        model.type = this.$store.state.model.type
        model.times = this.$store.state.model.times
        /*model.mode = this.$store.state.model.mode*/
        model.omodel = this.$store.state.model.omodel

        let Lodid = model.methodid
        let LodName = model.methodName
        let regd = /和值/
        //第一步：这里处理各种不同的玩法
        let r = random(Lodid)
        console.log(r)
        // 任选和值
        if (this.rxZXIds.indexOf(lt_method[String(Lodid)]) > -1) {
          let tmp = [[]]
          r.forEach(value => {
            value.forEach(val => {
              tmp[0].push(val)
            })
          })
          r = tmp
        } else if (this.rx4ZX12Ids.indexOf(lt_method[String(Lodid)]) > -1) {
          let tmp = [[], []]
          r.forEach((value, index) => {
            if (index == 0) {
              value.forEach(val => {
                tmp[0].push(val)
              })
            } else {
              value.forEach(val => {
                tmp[1].push(val)
              })
            }
          })
          r = tmp
        }
        for (let i = 0; i < this.$store.state.layout.length; i++) {
          // 任选 组选部分不显示
          if (this.$store.state.layout[i].rxShow) break
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
          model.codes.push(l)
        }

        model.codes.forEach((item, index) => {
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
        //第四步，检测购物篮中是否已经存在m对象了。如果不存在则添加进入购物篮
        if (this.$store.state.dataList.length != 0) {
          this.dataList = this.$store.state.dataList
          // 检测购物篮中是否已经存在m对象了。如果不存在则添加进入购物篮
//          this.$store.state.dataList.forEach((item, index) => {
//            if (item.type == model.type && item.methodid == model.methodid) {
//              if (item.codes == codes) {
//                tempfalg = false
//              }
//            }
//          })
//          if(!tempfalg){
//            this._addRandomBet()
//            return
//          }
          for (let i = 0; i < model.codes.length; i++) {
            if (model.codes[i].length === 0) {
            } else {
              this.dataList.unshift(model)
              break
            }
          }
        } else {
          this.dataList.unshift(model)
        }


        let nums = checkNum(model.methodid, model.codes, this.$store.getters.getRxSelect)
        model.nums = nums
        let nmodel = 1
        model.money = model.nums * 100 * model.times * nmodel * 2 / 100
        model.contents = model.codes
        if (this.rxPlayId.indexOf(lt_method[String(model.methodid)]) > -1) {
          model.poschoose = this.$store.getters.getRxSelect.toString()
        }
        if (typeof model.codes === 'object') {
          model.codes = model.codes.join('|')
          return
        }

      },
      // 计算总共投注金额, 总注数
      _allMoney() {
        let flagMoney = 0
        let flagNums = 0
        this.dataList.forEach((item, index) => {
          flagMoney += parseFloat(item.money)
          flagNums += parseFloat(item.nums)
        })
        this.allMoney = parseFloat(flagMoney).toFixed(2)
        this.allNums = flagNums
      },
      // 删除
      _delCodes(params) {
        let index = params.index
        let _this = this
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '确定要删除当前投注吗',
          // 组件除show外的属性
          onCancel() {
          },
          onConfirm() {
            _this.dataList.splice(index, 1)
          }
        })
      },
      // 确认投注
      _goConfirm() {
        let _this = this
        if (this.dataList.length == 0) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请先投注'
          })
        } else {
          this.$vux.confirm.show({
            title: '提示',
            content: '确认投注?',
            onCancel() {
              return
            },
            onConfirm() {
              _this.$vux.loading.show({
                text: '正在投注'
              })
              if (_this.$store.state.lotteryid == 23) {
                _this.mmcStop = true
                _this.mmctime = 1
                _this.mmcbonus = 0
                _this.paymmcbet()
              } else {
                _this.paybet()
              }
            }
          })
        }
      },
      paybet() {
        this.bets.lt_project = JSON.parse(JSON.stringify(this.dataList))
        let mm = 0
        this.bets.lt_project.forEach((item, index) => {
          let data = this.$store.state._lotteryBet[this.$store.state.nav]
          if (item.type === 'lhzx_lh') {
            item.desc = item.desc.slice(0, 2) + item.codes
            item.methodName = item.methodName.slice(0, 5) + item.codes
            let str = item.desc.slice(0, 2).concat(item.codes).replace('万', 'w').replace('千', 'q').replace('百', 'b').replace('十', 's').replace('个', 'g').replace('龙', 'l').replace('虎', 't').replace('和', 'h')
            item.codes = this.lh_obj[str]
            data.forEach((value) => {
              if (value.title === '龙虎') {
                value.label[0].label.find((val) => {
                  if (val.desc === item.desc) {
                    item.methodid = val.methodid
                    return
                  }
                })
              }
            })
          } else if (item.methodName === '庄闲') {
            data.forEach((value) => {
              if (value.title === '庄闲') {
                value.label[0].label.find((val) => {
                  if (item.codes.indexOf(val.desc) > -1) {
                    item.methodid = val.methodid
                    return
                  }
                })
              }
            })
            item.type = 'lhzx_zx'
            item.desc = [`龙虎庄闲_${item.codes}`]
            item.codes = this.mUtils.lhzx_trans(item.codes)
          } else {
            item.codes = item.codes.replace(/,/g, '&')
          }
        })
        // 追号
        if (this.bets.lt_trace_count_input > 0) {
          if (this.bets.lt_trace_count_input > this.allowPeriods.length) {
            this.$vux.alert.show({
              title: '提示',
              content: '您当前可追期数为' + this.allowPeriods.length + ',</br>请重新选择追号期数'
            })
            return
          }
          this.bets.lt_trace_issues = []
          this.bets.lt_trace_if = 'yes'
          if (this.lt_trace_stop == 'yes') {
            this.bets.lt_trace_stop = this.lt_trace_stop
          }
          if (this.bets.lt_trace_times_same === undefined) {
            this.bets.lt_trace_times_same = 1
          }
          if (this.bets.lt_trace_count_input === undefined) {
            this.bets.lt_trace_count_input = 1
          }
          this.bets.lt_trace_money = 0
          this.bets.lt_project.forEach((item, index) => {
            mm += item.money * this.bets.lt_trace_count_input * this.bets.lt_trace_times_same
          })
          this.bets.lt_trace_money = mm
          let lt_trace_issues = []
          for (let i = 0; i < this.bets.lt_trace_count_input; i++) {
            lt_trace_issues.push(this.allowPeriods[i].issue)
            this.bets['lt_trace_times_' + this.allowPeriods[i].issue] = this.bets.lt_trace_times_same
          }
          this.bets.lt_trace_issues = lt_trace_issues
        }
        // 追号end
        let lotteryid = this.mUtils.lotterytrans(this.$store.state.nav, 'code->id', this.$store.state.lotteryType)
        this.bets.lotteryid = lotteryid
        let map = {}
        map['curmid'] = this.mUtils.lotterytrans(lotteryid, 'id->curmId', this.$store.state.lotteryType)
        this.bets.lt_issue_start = this.avinul
        this.bets.lt_total_nums = this.bets.lt_total_money = 0
        for (let i = 0, dataList = this.dataList; i < dataList.length; i++) {
          this.bets.lt_total_nums += dataList[i].nums // 代表投注注数
          this.bets.lt_total_money += dataList[i].money // 代表投注金额
        }
        this.bets.play_source = this.playSource
        this.bets.flag = 'save'
        let tempBets = JSON.parse(JSON.stringify(this.bets))
        for (let i = 0; i < tempBets.lt_project.length; i++) {
          delete tempBets.lt_project[i]['lotteryid']
        }
        let httpurl = this.$store.state.server + this.mUtils.interFace('PAYBET') + '&curmid=' + map['curmid'] + '&sess=' + this.$store.state.sess
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.msg == 'success') {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: '购买成功',
              onHide() {
                _this.dataList = []
                _this.$store.state.dataList = [] // 清空投注
                // // 保存当前玩法至本地，下次默认加载此玩法
                let lastPlays = JSON.parse(_this.mUtils.getStore('lastPlays'))
                if (Array.isArray(lastPlays)) {
                  let flag = false
                  lastPlays.forEach((value) => {
                    if (value.id == _this.bets.lotteryid) {
                      value.value = _this.$store.getters.getNowPlays
                      flag = true
                    }
                  })
                  if (!flag) {
                    lastPlays.push({
                      id: _this.bets.lotteryid,
                      value: _this.$store.getters.getNowPlays
                    })
                  }
                  _this.mUtils.setStore('lastPlays', JSON.stringify(lastPlays))
                } else {
                  _this.mUtils.setStore('lastPlays', JSON.stringify([{
                    id: _this.bets.lotteryid,
                    value: _this.$store.getters.getNowPlays
                  }]))
                }
                clearInterval(_this.interval)
                _this.$router.replace('/home/selectCody')
              }
            })
          } else if (res.data.h5statuscode == '889') {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg.content[0]
            })
            this.bets = {}
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg
            })
            this.bets = {}
          }

        }, tempBets)
      },
      topmmc(e) {
        if (e.target.innerHTML == '停止') {
          this.mmcStop = false
          document.getElementById("mmcstop").style.background = '#c5c5c5'
          document.getElementById("mmcstop").style.color = '#fff'
        } else {
          document.getElementById("mmcstop").innerHTML = '停止'
          document.getElementById("mmcdiv").style.display = 'none'
        }
      },
      paymmcbet() {
        this.bets.lt_project = JSON.parse(JSON.stringify(this.dataList))
        this.bets.lt_project.forEach((item, index) => {
          item.codes = item.codes.replace(/,/g, '&')
        })
        let lotteryid = this.mUtils.lotterytrans(this.$store.state.nav, 'code->id', this.$store.state.lotteryType)
        this.bets.lotteryid = lotteryid
        this.bets.mid = 311700
        this.bets.mids = 666
        this.bets.times = this.mmctime
        if (this.bets.lt_trace_count_input == undefined) {
          this.bets.lt_trace_count_input = 1
        }
        if (this.lt_trace_stop == 'yes' && this.bets.lt_trace_count_input > 1) {
          this.bets.lt_trace_stop = this.lt_trace_stop
        } else {
          delete this.bets.lt_trace_stop
        }
        for (let i = 0, dataList = this.dataList; i < dataList.length; i++) {
          this.bets.lt_total_nums += dataList[i].nums // 代表投注注数
          this.bets.lt_total_money += dataList[i].money // 代表投注金额
        }
        this.bets.play_source = 5
        this.bets.flag = 'save'
        let tempBets = JSON.parse(JSON.stringify(this.bets))
        for (let i = 0; i < tempBets.lt_project.length; i++) {
          delete tempBets.lt_project[i]['lotteryid']
        }
        delete tempBets['lt_issue_start']
        let httpurl = this.$store.state.server + '/mmc/?controller=mmcgameapi&action=play&sess=' + this.$store.state.sess
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.stats == 'success') {
            if (this.mmctime < this.bets.lt_trace_count_input) {
              document.getElementById("mmcstop").innerHTML = '停止'
              if (res.data.data.bonus > 0) {
                this.mmcbonus += (+res.data.data.bonus)
                let tempVal = '<div>第' + this.mmctime + '次,共' + this.bets.lt_trace_count_input + '次</div>' +
                  '<div>【第' + this.mmctime + '次中奖' + res.data.data.bonus + '元】</div>' +
                  '<div>共中奖' + this.mmcbonus + '元</div>'
                document.getElementById("mmcctt").innerHTML = tempVal
                if (this.bets.lt_trace_stop) {
                  document.getElementById("mmcstop").innerHTML = '中奖了游戏停止'
                  document.getElementById("mmcdiv").style.display = 'block'
                  return
                }
              } else {
                if (this.mmcbonus > 0) {
                  let tempVal = '<div>第' + this.mmctime + '次,共' + this.bets.lt_trace_count_input + '次</div>' +
                    '<div>共中奖' + this.mmcbonus + '元</div>'
                  document.getElementById("mmcctt").innerHTML = tempVal
                } else {
                  document.getElementById("mmcctt").innerHTML = '<div>第' + this.mmctime + '次,共' + this.bets.lt_trace_count_input + '次</div>'
                }
              }
              document.getElementById("mmcdiv").style.display = 'block'
              this.mmctime++
              setTimeout(() => {
                if (this.mmcStop) {
                  this.paymmcbet()
                } else {
                  if (this.mmcbonus > 0) {
                    let tempVal = '<div>共游戏' + (this.mmctime - 1) + '次</div>' +
                      '<div>共中奖' + this.mmcbonus + '元</div>'
                    document.getElementById("mmcctt").innerHTML = tempVal
                  }
                  this.clearOk()
                }
              }, 1000)
              return
            }
            if (this.mmctime == this.bets.lt_trace_count_input && this.mmctime > 1) {
              if (this.mmcbonus > 0) {
                let tempVal = '<div>第' + this.mmctime + '次,共' + this.bets.lt_trace_count_input + '次</div>' +
                  '<div>共中奖' + this.mmcbonus + '元</div>'
                document.getElementById("mmcctt").innerHTML = tempVal
              } else {
                document.getElementById("mmcctt").innerHTML = '<div>第' + this.mmctime + '次,共' + this.bets.lt_trace_count_input + '次</div>'
              }
              setTimeout(() => {
                if (this.mmcbonus > 0) {
                  let tempVal = '<div>共游戏' + this.bets.lt_trace_count_input + '次</div>' +
                    '<div>共中奖' + this.mmcbonus + '元</div>'
                  document.getElementById("mmcctt").innerHTML = tempVal
                } else {
                  document.getElementById("mmcctt").innerHTML = '<div>共游戏' + this.bets.lt_trace_count_input + '次</div>'
                }
                this.clearOk()
              }, 1000)
              return
            }
            this.clearOk()
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: '购买成功',
              onHide() {
                /* _this.dataList = []
                     _this.$store.state.dataList = [] // 清空投注
                     _this.$router.replace('/home/selectCody')*/
                // // 保存当前玩法至本地，下次默认加载此玩法
                let lastPlays = JSON.parse(_this.mUtils.getStore('lastPlays'))
                if (Array.isArray(lastPlays)) {
                  let flag = false
                  lastPlays.forEach((value) => {
                    if (value.id == _this.bets.lotteryid) {
                      value.value = _this.$store.getters.getNowPlays
                      flag = true
                    }
                  })
                  if (!flag) {
                    lastPlays.push({
                      id: _this.bets.lotteryid,
                      value: _this.$store.getters.getNowPlays
                    })
                  }
                  _this.mUtils.setStore('lastPlays', JSON.stringify(lastPlays))
                } else {
                  _this.mUtils.setStore('lastPlays', JSON.stringify([{
                    id: _this.bets.lotteryid,
                    value: _this.$store.getters.getNowPlays
                  }]))
                }
              }
            })
          } else if (res.data.h5statuscode == '889') {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg.content[0]
            })
          } else {
            let msg = ''
            if (res.data.data) {
              msg = res.data.data
            } else {
              msg = res.data.msg
            }
            this.$vux.alert.show({
              title: '提示',
              content: msg
            })
          }
        }, tempBets, () => {
          this.clearOk()
        }, () => {
          this.clearOk()
        })
      },
      clearOk() {
        this.mmcStop = true
        this.mmctime = 1
        this.mmcbonus = 0
        document.getElementById("mmcstop").style.background = '#fff'
        document.getElementById("mmcstop").style.color = '#c7202c'
        document.getElementById("mmcstop").innerHTML = '确定'
      },
      onCountInput(val) {
        this.bets.lt_trace_count_input = val
        if (this.bets.lt_trace_count_input > 0 && this.mmcshow) {
          this.isStopshow = true
          this.stopText = '中奖追停'
        } else {
          this.isStopshow = false
        }
      },
      onCountMMC(val) {
        this.bets.lt_trace_count_input = val
        if (this.bets.lt_trace_count_input > 1 && !this.mmcshow) {
          this.isStopshow = true
          this.stopText = '中奖停止'
        } else {
          this.isStopshow = false
        }
      },
      onTimesSame(val) {
        this.bets.lt_trace_times_same = val
      },
      // 获取可追期数
      _getAvailableissue() {
        let map = {}
        map['nav'] = this.$store.state.nav
        map['task'] = 'issue'
        map['play_source'] = '5'

//        let data = {}
//        data.flag = 'read'
//        data.lotteryid = this.bets.lotteryid
        let httpurl = this.$store.state.server + this.mUtils.interFace('AVAILABLEISSUE') + '&nav=' + map['nav'] + '&task=' + map['task'] + '&play_source =' + map['play_source'] + '&sess=' + this.$store.state.sess
        this.httpAction(httpurl, (res) => {
          this.allowPeriods = res.data.today.concat(res.data.tomorrow)
        })
      },
      // 清空投注
      emptyDataList() {
        let _this = this
        if (this.$store.state.dataList.length != 0) {
          this.$vux.confirm.show({
            title: '温馨提示',
            content: '确定清空所有投注吗',
            // 组件除show外的属性
            onCancel() {
            },
            onConfirm() {
              _this.dataList = []
              _this.$store.state.dataList = [] // 清空投注
            }
          })
        }
      },
      // 投注截止时间
      _restart_tick() {
        if (this.interval) {
          clearInterval(this.interval)
        }
        let httpurl = this.httpUrl('CURRENTPRIZE') + '&nav=' + this.$store.state.nav
        this.httpAction(httpurl, (res) => {
          let data = res.data
          this.avinul = data.issue
          if (this.init != undefined && this.$store.state.dataList.length != 0) {
            this.$vux.alert.show({
              content: '当前奖期已截止，</br>您将购买' + this.avinul + '期'
            })
          } else {
            this.init = 'init'
          }
          let tick = (new Date(data.saleend.replace(/\-/g, '/')) - new Date(data.nowtime.replace(/\-/g, '/'))) / 1000
          this._start_tick(tick)
        }, {'flag': 'read', 'lotteryid': this.$store.state.lotteryid})
      },
      _start_tick(val) {
        this.interval = setInterval(() => {
          if (val == -1) {
            this._getAvailableissue()
            this._restart_tick()
            return
          }
          this.tickWord = this.mUtils.genCountdown(val)
          val--
        }, 1000)
      }
    },
    components: {
      headTop,
      selectNumber,
      buttonView
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  @fontColor: #4c4c4c;
  .mmcoverlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #333;
    opacity: 0.6;
    -webkit-opacity: 0.6;
    -moz-opacity: 0.6;
  }

  .mmcdialog {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }

  .mmctitle {
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #c7202c;
    font-size: 0.36rem;
    color: #fff;
  }

  .mmccontent {
    text-align: center;
    padding: 0.4rem 0;
    font-size: 0.36rem;
  }

  .mmcstop {
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    font-size: 0.36rem;
    color: #c7202c;
    text-align: center;
  }

  .mmcstop:before {
    .border-1px(100%, solid, #cdcdcd)
  }

  .slideLeft-enter-active, .slideLeft-leave-active {
    opacity: 1;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    transform: translate3d(0, 0, 0);
  }

  .slideLeft-enter, .slideLeft-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .stop {
    box-sizing: border-box;
    .wh(1.3rem, 0.52rem);
    line-height: 0.52rem;
    border: 1px solid #c7202c;
    border-radius: 0.1rem;
    background: #c7202c;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
  }

  .stopStyle {
    background: #fff;
    color: #c7202c;
  }

  .time_period {
    padding: 0 0.3rem;
    background: #fff;
    .hl(0.5rem);
    color: @fontColor;
    strong {
      color: @color_c7202c;
      font-weight: normal;
    }
    &:after {
      .border-1px(100%, solid, #ddd)
    }

  }

  .times {
    position: relative;
    span {
      position: absolute;
      top: 0;
      right: 50px;
      width: 60px;
    }
  }

  .select_cody {
    position: relative;
    margin-top: 0.2rem;
    .select_cody_top {
      .wh(95%, 0.25rem);
      line-height: 0.25rem;
      border: 1px solid #ddd;
      .borderRadius(0.125rem);
      margin: 0 auto;
      text-align: center;
      span {
        display: inline-block;
        float: left;
        .wh(98%, 1px);
        box-shadow: 0 0.1rem 0.1rem #c0c0c0;
        z-index: 9999;
      }
      i {
        display: inline-block;
        .wh(98%, 0.14rem);
        border: 1px solid #ddd;
        .borderRadius(0.07rem);
        margin: 0 auto;
      }
    }
    .select_cody_number {
      position: absolute;
      top: 0.15rem;
      left: 0.38rem;
      width: 90%;
      z-index: 0;
      .select_cody_number_list {
        background: #fff;
        padding-top: 0.35rem;
        max-height: 5rem;
        /*overflow-y: scroll;*/
        overflow: auto;
      }
      .number_list_li {
        position: relative;
        .circle {
          display: inline-block;
          .wh(0.2rem, 0.2rem);
          .borderRadius(50%);
          background: #f6f6f6;
        }
        .left_c {
          position: absolute;
          top: -0.1rem;
          left: -0.1rem;
        }
        .right_c {
          position: absolute;
          top: -0.1rem;
          right: -0.1rem;
        }
        .number_details {
          padding: 0 0.2rem 0.2rem;
          img {
            /*box-sizing: border-box;*/
            width: 0.31rem;
            vertical-align: middle;
            padding: 0.5rem 0.25rem 0.5rem 0;
          }
        }
        .number_style {
          display: inline-block;
          .number_text {
            color: @color_c7202c;
            width: 5.6rem;
            word-wrap: break-word;
            padding-bottom: 0.3rem;
          }
        }
        &:before {
          .border-1px(100%, dashed, #999);
        }
      }

    }
    .affirm_foot_empty {
      text-align: center;
      .hl(0.72rem);
      background: #fbfbfb;
      font-weight: normal;
      font-size: 0.28rem;
      border-radius: 0 0 0.2rem 0.2rem;
      box-shadow: 0 0.1rem 0.1rem #ddd;
    }
  }

  .select_button {
    padding-top: 0.2rem;
    text-align: center;
    strong {
      font-size: 0.4rem;
      font-weight: normal;
    }
    span {
      position: relative;
      display: inline-block;
      .wh(3.1rem, 0.55rem);
      text-align: center;
      line-height: 0.56rem;
      font-size: 0.28rem;
      font-weight: normal;
      color: @fontColor;
      border: 1px solid #ccc;
      border-radius: 0.08rem;
      &:first-child {
        margin-right: 0.2rem;
      }
      &:active {
        background: #eee;
      }
      &:before {
        content: "+";
        position: absolute;
        font-size: 0.4rem;
        left: 0.7rem;
        top: -0.04rem;
      }
    }
  }

  .affirm_foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    .affirm_foot_finally {
      position: relative;
      .affirm_foot_number {
        padding: 0 0.1rem;
        &:before {
          .border-1px(100%, solid, #999);
        }
        &:after {
          .border-1px(100%, solid, #999);
        }
        .affirm_select_number {
          padding: 0.2rem 0;
        }
        .multiple {
          float: left;
          margin-right: 0.2rem;
          div {
            float: left;
            &:first-child, &:last-child {
              padding-top: 5px;
            }
          }
        }
      }
    }
    .affirm_foot_money {
      height: 1rem;
      .foot_money {
        display: inline-block;
        padding: 0.2rem 0.8rem 0.2rem 0.25rem;
        text-align: center;
      }
    }
    .button_p {
      position: absolute;
      right: 0.2rem;
      bottom: 0.15rem;
    }
  }
</style>
