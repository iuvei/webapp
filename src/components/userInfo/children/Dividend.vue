<!--团队分红-->
<template>
  <div>
    <headTop headTitle="团队分红" goBack='true'></headTop>
    <div v-show="dayloss" class="p_fixed">
      <tableThead :datas="dataChiled" :starttime="postData.starttime" :thead_1="2" :thead_2="1"></tableThead>
    </div>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :auto-fill="false" :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;">
            <div class="inputBox clear">
              <p class="searchtit">日期</p>
              <div class="selsect_dividend">
                <popup-picker  :data="dateList" :columns="3" v-model="dateScope"  show-name @on-change="onChange" ></popup-picker>
              </div>
              <div class="button_manage" v-tap="{ methods: _manage }">
                <buttonView  buttonTitle='管理' height="0.55"></buttonView>
              </div>
            </div>
            <div class="wage_table">
              <tableLocked :datas="dataChiled" :starttime="postData.starttime" :no="true" :thead_1="2" :thead_2="1">
              </tableLocked>
            </div>
            <noDate v-show="nodate"></noDate>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <!--<tableTfoot :datas="dataChiled" :starttime="postData.starttime" :no="true"></tableTfoot>-->
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import tableLocked from '../../common/table.vue'
  import tableTfoot from '../../common/table_tfoot.vue'
  import tableThead from '../../common/table_thead.vue'
  import buttonView from '../../common/button.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore, PopupPicker } from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      tableLocked,
      buttonView,
      noDate,
      LoadMore,
      PopupPicker,
      tableTfoot,
      tableThead
    },
    data () {
      return {
        dateList: [], // 日期范围列表
        dateScope: [],
        dateFlags: true,
        dataChiled:{
          gridColumns:['username', 'usergroup_name', 'sale_total', 'gross_income', 'daily_salary', 'lose_salary', 'dividend_radio', 'allsalary', 'buttons_dividend'],
          thead:['序号',  '用户名', '所属组', '销售额', '盈亏总额', '日工资总额', '日亏损佣金', '分红比例', '分红', '历史分红'],
          tfoot: ['usergroup_name', 'sale', 'self_gross_income', 'daily_salary','lose_salary', 'dividend_radio', 'self_allsalary', 'button'],
          tableRows: [],
          tfootFlag: true,
          sum: {}
        },
        scrollMode: 'auto',
        nodate: false,
        postData: {
          starttime: '0',
          username: this.$store.state.account
        },
        dayloss: false
      }
    },
    activated () {
      if (this.$store.state.teamReport) {
        this.postData.starttime = '0'
        this.postData.username = this.$store.state.account
        this._getSecondaryAgent()
        this.$nextTick(function(){
          window.scroll(0, 0)
          this.setTableThead()
        })
      }
    },
    deactivated () {
      this.$vux.loading.hide()
      if (this.$store.state.betRecordFlag) {
        this.dateFlags = true
        this.dataChiled.tableRows = []
        this.dateScope = []
      }
    },
    mounted () {
//      this._getSecondaryAgent()
    },
    methods: {
      // 设置表格head定位
      setTableThead() {
        $('.p_fixed').css('zIndex', -1)

        window.addEventListener('scroll', ()=>{
          this._scroll()
        })
      },
      _scroll(){
        if ($(".thead_hook").offset() == undefined) {
          return
        } else {
          var oTop = $(".thead_hook").offset().top;
        }
        var sTop = 0;
        sTop = $(window).scrollTop() + 35
        if(sTop >= oTop){
          $('.p_fixed').css('zIndex', 9)
        }else{
          $('.p_fixed').css('zIndex', -1)
        }
      },

      onChange(val) {
        this.postData.starttime = val[0]
        this.$store.commit('updataDateScope', val)
        this._getSecondaryAgent()
      },
      // 管理
      _manage() {
        this.$router.push({path: '/userInfo/DividendManage'})
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
        this.dateList = []
        let httpurl = this.httpUrl('DIVIDENDSALARY')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data
            this.dataChiled.sum = result.sum
            this.dataChiled.tableRows = result.alldata.results
            let team = {
              username: '团队数据',
              usergroup_name: null,
              sale_total: this.dataChiled.sum.sale_total,
              gross_income: this.dataChiled.sum.gross_income,
              daily_salary: this.dataChiled.sum.team_daily_salary,
              lose_salary: this.dataChiled.sum.team_lose_salary,
              dividend_radio: this.dataChiled.sum.dividend_radio,
              allsalary: this.dataChiled.sum.allsalary,
              buttons_dividend: true
            }
            let self = {
              username: '个人结余',
              usergroup_name: this.dataChiled.sum.usergroup_name,
              sale_total: this.dataChiled.sum.sale,
              gross_income: this.dataChiled.sum.self_gross_income,
              daily_salary: this.dataChiled.sum.daily_salary,
              lose_salary: this.dataChiled.sum.lose_salary,
              dividend_radio: this.dataChiled.sum.dividend_radio,
              allsalary: this.dataChiled.sum.self_allsalary,
              buttons_dividend: 'button'
            }
            this.dataChiled.tableRows.unshift(team)
            this.dataChiled.tableRows.push(self)
            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)
            let startDate = {
                value: '0',
                name: result.begintime +'至'+ result.endtime
              }
            if (this.dateFlags) {
              this.dateFlags = false
              this.dateScope.push(startDate.value)
              this.dateScope.push(startDate.name)
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
          }
        }, this.postData)
      },
      onGetStartTime (val) {
        this.postData.starttime = val
        this.$store.commit('updateStarttime', this.postData.starttime)
        this._getSecondaryAgent()
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../../static/hc.json')
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

  .inputBox{
    position: relative;
    height:0.52rem;
    line-height: 0.53rem;
    padding:0.12rem 0;
    .button_manage{
      position: absolute;
      top: 0.12rem;
      right: 0.2rem;
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
    /*margin: 0.1rem 0 0 0;*/
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
