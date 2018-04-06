<!--分红管理-->
<template>
  <div>
    <headTop headTitle="分红管理" goBack='true' close="true"></headTop>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :auto-fill="false" :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;">
            <div class="inputBox clear">
              <p class="searchtit">日期</p>
              <div class="selsect_dividend">
                <popup-picker  :data="dateList" :columns="3" v-model="dateScope"  show-name @on-change="onChange" ></popup-picker>
              </div>
              <div class="button_manage" :class="{ button_unmanage: oneKeyDividend != 1 }" v-tap="{ methods: _oneKeyDividend }">
                一键发放分红
              </div>
            </div>
            <div class="wage_table">
              <ul class="table_thead table_dividend clear">
                <li>序号</li>
                <li>用户名</li>
                <li class="ellipsis">当前分红比例</li>
                <li>分红金额</li>
                <li>调整比例</li>
                <li>发放分红</li>
              </ul>
              <ul class="table_dividend table_body clear" v-for="(item,index) in dataChiled.tableRows">
                <li>{{index+1}}</li>
                <li>{{item.username}}</li>
                <li>{{item.dividend_radio}}</li>
                <li>{{item.allsalary | tfootFilter}}</li>
                <li style="width:100%; position: relative;">
                  <p class="operation" v-tap="{ methods: clickteamcontent, item: item, index: index }" :class="{ ungrant: item.send_status == 2}">
                    操作
                    <span class="icon_down" ref="icon_down"></span>
                  </p>
                  <div class="upfandian" v-show="item.checked">
                    <div class="clear">
                    <p>修改用户分红比例</p>
                    <p>
                      <input class="ratio" type="text" v-model="dividend_radio" placeholder="输入大于0的数">
                    </p>
                    <p class="settingfandian" v-tap="{ methods: setTatio, item: item, index: index}">一键设置</p>
                    </div>
                  </div>
                </li>
                <li class="grant" :class="{ ungrant: item.send_status == undefined || item.send_status == 2}" v-tap="{ methods: _grant, item: item, index: index}">发放</li>
              </ul>
            </div>
            <noDate v-show="nodate"></noDate>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import buttonView from '../../common/button.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore, PopupPicker } from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      buttonView,
      noDate,
      LoadMore,
      PopupPicker
    },
    data () {
      return {
        dateList: [], // 日期范围列表
        dateScope: [this.$store.state.dateScope[0]],
        dateFlags: true,
        dividend_radio: '',
        send_all_button: '',
        oneKeyDividend: 0,
        dataChiled:{
          tableRows: [],
          sum: {}
        },
        scrollMode: 'auto',
        nodate: false,
        postData: {
          starttime: this.$store.state.dateScope[0],
          username: this.$store.state.account
        },
        indexFlag: '-1'
      }
    },
//    activated () {
//      if (this.$store.state.teamReport) {
//          this.postData.starttime = '0'
//          this._getSecondaryAgent()
//      }
//    },
//    deactivated () {
//      this.$vux.loading.hide()
//      if (this.$store.state.betRecordFlag) {
//        this.dateFlags = true
//        this.dataChiled.tableRows = []
//        this.dateScope = []
//      }
//    },
    mounted () {
      this._getSecondaryAgent()
    },
    methods: {
      _grant(params) {
        if (params.item.send_status == undefined || params.item.send_status == 2) {
          return
        }
        let _this = this
        this.$vux.confirm.show({
          title: '发放分红',
          content: `
            <div>
              <p>用户名：`+ params.item.username +`</p>
              <p>分红比例：`+ params.item.dividend_radio +`</p>
              <p>本期分红：`+ params.item.allsalary +`</p>
            </div>
          `,
          confirmText: '确定发放',
          onConfirm () {
            _this.$vux.loading.show({
              text: '正在发放'
            })
            let grantData = {
              id: params.item.id,
              userid: params.item.userid
            }
            let httpurl = _this.httpUrl('SENDDIVIDENDSALARY')
            _this.httpAction(httpurl,(res) => {
              _this.$vux.loading.hide()
              if (res.data.status == 200) {
                _this.$vux.alert.show({
                  title: '提示',
                  content: res.data.data,
                  onHide() {
                    _this._getSecondaryAgent()
                    let icon_down = _this.$refs.icon_down[params.index]
                    icon_down.style.webkitTransform = 'rotate(135deg)'
                  }
                })
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: '操作失败，请稍后再试！'
                })
              }
            }, grantData)
          }
        })
      },
      // 一键设置
      setTatio(params) {
        if (parseFloat(this.dividend_radio) < 0) {
          let _this = this
          this.$vux.alert.show({
            title: '提示',
            content: '分红比例数不能小于0，</br>请重新输入！',
            onHide() {
              _this.dividend_radio = ''
            }
          })
          return
        }
        let ratioData = {
          userid: params.item.userid,
          dividend_radio: this.dividend_radio,
          id: params.item.id
        }
        this.$vux.loading.show({
          text: '正在修改'
        })
        let httpurl = this.httpUrl('RATIO')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let _this = this
            this.$vux.alert.show({
              title: '恭喜您',
              content: res.data.data + '</br>' + '当前分红比例为：' + this.dividend_radio,
              onHide() {
                _this._getSecondaryAgent()
                let icon_down = _this.$refs.icon_down[params.index]
                icon_down.style.webkitTransform = 'rotate(135deg)'
                _this.dividend_radio = ''
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '操作失败，请稍后再试！'
            })
          }
        }, ratioData)
      },
      clickteamcontent(params) {
        let item = params.item, index = params.index,
          icon_down = this.$refs.icon_down[index]
        if (item.send_status == 2) {
          return
        }
        if (this.indexFlag == index) {
          this.$set(item, 'checked', false)
          icon_down.style.webkitTransform = 'rotate(135deg)'
          this.indexFlag = -1
          return
        }
        this.indexFlag = index
        for(let i = 0, list = this.dataChiled.tableRows; i < list.length; i++) {
          if ( i == index ) {
            this.$set(list[i], 'checked', true)
            this.$refs.icon_down[i].style.webkitTransform = 'rotate(-45deg)'
          } else {
            this.$set(list[i], 'checked', false)
            this.$refs.icon_down[i].style.webkitTransform = 'rotate(135deg)'
          }
        }

//        if (typeof item.checked == 'undefined' || item.checked == false) {
//          this.$set(item, 'checked', true)
//          icon_down.style.webkitTransform = 'rotate(-45deg)'
//        } else {
//          item.checked = !item.checked
//          icon_down.style.webkitTransform = 'rotate(135deg)'
//        }
      },
      onChange(val) {
        this.postData.starttime = val[0]
        this._getSecondaryAgent()
      },
      // 一键发放分红
      _oneKeyDividend() {
        let _this = this
        this.$vux.confirm.show({
          content: this.send_all_button.msg,
          onConfirm () {
            _this._oneKeyDividendFun()
          }
        })
      },
      _oneKeyDividendFun() {
        this.$vux.loading.show({
          text: '正在发放'
        })
        let httpurl = this.httpUrl('SENDDIVIDENDSALARY'), _this = this,
          oneKeyDividend = {
            total_id: this.postData.starttime
          }
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.data,
              onHide() {
                _this._getSecondaryAgent()
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '操作失败，请稍后再试！'
            })
          }
        }, oneKeyDividend)
      },
      loadTop () { //  组件提供的下拉触发方法
        this.postData.p = 1
        this._getSecondaryAgent()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      // 获取团队分红列表
      _getSecondaryAgent () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('DIVIDENDSALARY')
        this.httpAction(httpurl,(res) => {
          this.dateList = []
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data
            this.dataChiled.sum = result.sum
            this.oneKeyDividend = result.send_status
            this.send_all_button = result.send_all_button
            this.dataChiled.tableRows = result.alldata.results
            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)
            let startDate = {
                value: '0',
                name: result.begintime +'至'+ result.endtime
              }
            this.dateList.push(startDate)
            for(let i = 0, dateFlag = result.dividendtotals; i < dateFlag.length; i++){
              let date = {}
              date.value = dateFlag[i].id
              date.name = dateFlag[i].growkey
              this.dateList.push(date)
            }
            if (this.dataChiled.tableRows.length == 0) {
              this.nodate = true
              this.dataChiled.tfootFlag = false
            } else {
              this.nodate = false
              this.dataChiled.tfootFlag = true
            }
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: '操作失败，请稍后再试！'
            })
          }
        }, this.postData)
      },
      onGetStartTime (val) {
        this.postData.starttime = val
        this._getSecondaryAgent()
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../../static/ios_hc.json')
        let appData = app
        let serverList = appData.serverList
        let j = Math.floor(Math.random() * serverList.length)
        if (this.$store.state.server == null) {
          this.$store.commit('updateServer', window.location.origin)
        }
        if (this.$store.state.lotteryType == null) {
          this.$store.commit('updateLotteryType', appData.lotteryType)
        }
        let sess
        if (this.$store.state.sess != null) {
          sess = this.$store.state.sess
        } else {
          sess = sessionStorage.getItem('sess')
        }

        return this.$store.state.server + this.mUtils.interFace(val)+'&sess='+sess;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .table_dividend{
    width: 100%;
    li{
      float: left;
      text-align: center;
    }
    li:nth-child(1){
      width: 10%;
    }
    li:nth-child(2), li:nth-child(3), li:nth-child(4){
      width: 20%;
    }
    li:nth-child(5), li:nth-child(6){
      width: 15%;
    }
  }
  .table_thead{
    background: #fff;
    height: 0.7rem;
    line-height: 0.73rem;
    font-weight: bold;
    font-size: 0.24rem;
    &:before{
      .border-1px(100%,solid,#aaa)
    }
    border-bottom:1px solid #dddddd
  }
  .table_body{
    position: relative;
    line-height: 1rem;
  }
  .table_body:nth-child(2n+1){
    background:#fff;
  }

  .upfandian{
    box-sizing: border-box;
    width:100%;
    height:1rem;
    background: #444444;
    padding: 0.2rem;
    p:nth-child(1){
      width: 40%;
    }
    p:nth-child(2){
      width: 30%;
    }
    p:nth-child(3){
      width: 20%;
    }
    .ratio{
      padding: 0.17rem 0 !important;
    }
    p{
      float: left;
      line-height:0.54rem;
      color: #fff;
      input{
        line-height: 0.54rem;
        width: 100%;
        border-radius: 3px;
        background:#fff;
        text-indent:4px;
      }
    }
    .settingfandian{
      padding:0 0.2rem;
      background:#c7202a;
      border-radius: 0.06rem;
      float: right;
      line-height: 0.54rem;
      width: 100%;
      font-size: 0.26rem;
    }
  }
  .operation{
    position: absolute;
    top: -1rem;
    right: 15%;
    padding: 0 0.35rem;
    .icon_down{
      .icon_arrows(0.4rem,0.1rem,#aaa,0.15rem,135deg)
    }
  }
  .grant{
    position: absolute;
    text-decoration: underline;
    right: 0;
  }
  .ungrant{
    text-decoration: none !important;
    color: #aaa;
  }

  .inputBox{
    position: relative;
    height:0.52rem;
    line-height: 0.53rem;
    padding:0.12rem 0;
    .button_manage{
      position: absolute;
      top: 0.12rem;
      right: 0.2rem;
      .borderRadius(0.1rem);
      background:@color_c7202c;
      height: 0.55rem;
      line-height: 0.58rem;
      color:#fff;
      font-size: 0.28rem;
      text-align: center;
      padding: 0 0.06rem;
      &:active{
        background:#8F2F2F;
      }
    }
    .button_unmanage{
      background: #aaa !important;
    }
    p{
      float:left;
      line-height:0.52rem;
      height: 0.52rem
    }
    .searchtit{
      width:20%;
      text-indent: 3%;
      font-size: 0.24rem;
    }
    span{
      float: left;
      box-sizing: border-box;
      line-height:0.52rem;
      border-radius:3px;
      border:1px solid #c8c8c8;
      padding:0 0.2rem;
      margin-right: 5px
    }
    input{
      float: left;
      border:1px solid #ccc;
      height: 0.52rem;
      border-radius: 3px;
      padding: 0 0.1rem 0;
      width: 35%;
      margin-right: 0.2rem;
      font-size: 0.24rem;
    }
    .select{
      position: relative;
      float: left
    }
    .selectBox{
      background:#fff;
      z-index: 9;
      li{
        width: 1rem;
        .hl(0.52rem);
        text-align: center;
        margin-right:0.1rem;
        .borderRadius(0.06rem);
        border:1px solid #c8c8c8;
      }
    }
  }
  .tableStyle th{
    white-space : nowrap;
  }

  .button_select{
    display: inline-block;
  }
  .weui-loadmore{
    top: 3rem;
  }
  .noDate{
    top:30%;
  }
  .input-wrapper{
    padding:0px;
  }
  .topPadding{
    height:0.88rem;
  }
  .searchTime{
    padding:0.1rem 0;
    height:0.7rem;
    p{
      float: left;
      height:0.7rem;
      line-height:0.7rem;
      padding:0 2px;
    }
    .objinput{
      width: 40%;
      float:left;
      line-height:0.4rem;
      input{
        border-radius: 4px;
        border:1px solid #ddd;
        height:0.7rem;
        width: 100%;
        background:#fff;
        text-indent:4px;
      }
    }
  }
</style>
