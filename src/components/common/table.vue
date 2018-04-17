<template>
  <div class="clear">
    <div class="wage_table_1">
      <div style="position: relative">
        <ul class="table_thead table_dividend thead_hook clear">
          <li v-for="(item, index) in datas.thead" v-if="index < thead_1">{{item}}</li>
          <li class="dropdown" v-tap="{ methods: _clickDropdown }" style="background:none; z-index: 999;" v-if="this.$route.query.dropclick">
            <img ref="dropdown" src="../userInfo/img/up.png" />
          </li>
        </ul>
      </div>
      <ul class="table_dividend table_body clear" v-for="(row, index) in datas.tableRows">
        <li v-text="index+1" v-if="no"></li>
        <li v-if="indx < thead_2"
            v-for="(item, indx) in datas.gridColumns"
            class="ellipsis"
            :class="{
                      underline:
                              item == 'buttons' ||
                              item == 'buttons_dividend' ||
                              (item == 'rdate' && $route.query.team_table) ||
                              (item == 'date_range' && $route.query.team_table) ||
                              (item == 'username' && $route.query.team_table) ||
                              (item == 'username' && indx==0 && index != 0 && !$route.query.un_click) ||
                              item == 'buttons_daywage',
                      buttons_color: item == 'buttons' ||
                              item == 'buttons_dividend' ||
                              item == 'buttons_daywage'
                    }"
            v-tap="{ methods:_clickUserName, row: row , item: item, index: index , indx: indx}">{{row[item] | numberFilter(item)}}</li>
      </ul>
    </div>
    <div class="wage_table_2">
      <ul class="table_thead table_dividend dividend_hook clear">
        <li v-for="(item, index) in datas.thead"
            v-if="index >= thead_1">{{item}}</li>
      </ul>
      <ul class="table_dividend table_body dividend_hook clear" v-for="(row, index) in datas.tableRows">
        <li v-if="indx >= thead_2"
            v-for="(item, indx) in datas.gridColumns"
            :class="{
                     underline:
                      (item == 'buttons' ||
                      item == 'buttons_dividend' ||
                      (item == 'rdate' && $route.query.team_table) ||
                      (item == 'date_range' && $route.query.team_table) ||
                      (item == 'username' && $route.query.team_table) ||
                     (item == 'username' && indx==0 && index != 0 && !$route.query.un_click) ||
                     item == 'buttons_daywage') && row[item] != true,
                     buttons_color:
                        item == 'buttons' ||
                        item == 'buttons_dividend' ||
                        item == 'buttons_daywage',
                     profit_lose:
                      indx == datas.gridColumns.length - 1 && parseFloat(row['profit']) < 0,                              profit_win:
                        indx == datas.gridColumns.length - 1 && parseFloat(row['profit']) > 0,                            unbuttons:
                        row[item] == true
                  }"
            v-tap="{ methods:_clickUserName, row: row , item: item, index: index , indx: indx}">{{row[item] | numberFilter(item)}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    // 接收父组件传过来的参数
    props: ['datas', 'height', 'starttime', 'no', 'lossBrokerage', 'thead_1', 'thead_2', 'startAndEndtime'],
    data () {
      return{
          data: {
            tableRows:[]
          },
          postData: {
            starttime: '',
            parent_id: '',
            p: 1,
            pn: 200 // 条数
          },
        show: true
      }
    },
    watch:{
      'datas.tableRows': function (val) {
        this.$nextTick(() => {
          this._countWidth()
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
          this._countWidth()
      })
    },
    methods: {
      _countWidth() {
        let dividend_hook = document.getElementsByClassName('dividend_hook')
        for(let i = 0; i < dividend_hook.length; i++) {
          dividend_hook[i].style.width = (this.datas.thead.length - 2) * 80 + 'px'
        }
      },
      _clickDropdown () {
        this.show = !this.show
        let clickDown = this.$refs.dropdown
        if (this.show) {
          clickDown.src = require('../userInfo/img/up.png')
        } else {
          clickDown.src = require('../userInfo/img/dropDown.png')
        }
        this.$emit('getShowTeamTable', this.show)
      },
      // 点击用户名或日期.日工资协议.日工资查看历史
      _clickUserName(params) {
          if (this.$route.query.team_table) {
            if(params.item == 'rdate' || params.item == 'date_range') { // 团队报表日期
              this.$router.push({path: '/userInfo/TeamTableTime', query: {dropclick: true, username: params.row.username, start_date: this.startAndEndtime.start_date, end_date: this.startAndEndtime.end_date}})
            }
            if(params.item == 'username') { // 用户名
              if (this.$route.path == '/userInfo/TeamTableUsername') {
                this.$router.push({path: '/userInfo/TeamTableUsernameFlag', query: {team_table: true, dropclick: true, username: params.row.username, start_date: this.startAndEndtime.start_date, end_date: this.startAndEndtime.end_date}})
              } else {
                this.$router.push({path: '/userInfo/TeamTableUsername', query: {team_table: true, dropclick: true, username: params.row.username, start_date: this.startAndEndtime.start_date, end_date: this.startAndEndtime.end_date}})
              }
            }
          }
          if ((params.index === 0 && params.indx === 0) || this.lossBrokerage) {
            return
          }
          if (params.item === 'username') { // 点击用户名
            if (this.$route.path == '/userInfo/DayWageClickUser') {
              this.$router.push({path: '/userInfo/DayWageClickUserFlag', query: {parent_id: params.row.userid, username: params.row.username}})
            } else if (this.$route.path == '/userInfo/DayWageClickUserFlag' || this.$route.path == '/userInfo/DayWage'){
              this.$router.push({path: '/userInfo/DayWageClickUser', query: {parent_id: params.row.userid, username: params.row.username}})
            }
          }
        if (params.item == 'buttons_dividend') {
          if (params.row.buttons_dividend == true) {
            return
          } else {
            this.$router.push({path: '/userInfo/HistoryDividend', query: { username: params.row.username}})
            return
          }
        }
        if (params.item === 'buttons') { // 日工资协议
          this._getSecondaryAgent(params.row)
        }
        if (params.item === 'buttons_daywage') { // 日工资查看历史
          this.$router.push({path: '/userInfo/HistoryDayWage', query: {no: false, username: params.row.username}})
        }
      },
      _getSecondaryAgent (val) {
        let username = val.username,
            agree = ''
            val.buttons.forEach((item) => {
              if (item.text == '同意协议') {
                agree = true
              }
            })
            this.$router.push({path: '/userInfo/Agreement', query: { 'username': username, 'gmt_sale': this.$store.state.starttime, userid: val.userid, 'agree': agree }})
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../static/hc.json')
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
    },
    filters: {
      numberFilter: function (value, item) {
        if(item == 'buttons_daywage'){
          return '历史工资'
        } else if (item == 'buttons_dividend') {
          if (value == true) {
            return '--'
          } else {
            return '查看'
          }
        }else if (value == 0) {
          return '0'
        }  else if (!value || value == null) {
          return '--'
        } else if (
          // 分红 --开始--
            item == 'sale_total' ||
            item == 'gross_income' ||
            item == 'team_daily_salary'||
            item == 'team_lose_salary'||
            item == 'allsalary' ||
          // 分红 --结束--
          // 日工资 --开始--
            item == 'sale'||
            item == 'effective_sale'||
            item == 'salary' ||
          // 日工资 --结束--
          // 日亏损佣金 --开始--
            item == 'cp_stake'||
            item == 'cp_bonus'||
            item == 'cp_win_lose'||
            item == 'lose_salary' ||
          // 日亏损佣金 --结束--
          // 团队总表 --开始--
            item == 'sum_prize'||
            item == 'sum_bonus' ||
            item == 'sum_point'||
            item == 'profit_loss'||
            item == 'sum_lose_salary'||
            item == 'sum_netincome'||
            item == 'profit'||
            item == 'daily_salary' ||
            item == 'sum_dividend' ||
            item == 'sum_salary'
          ) {
          if (value.toString().indexOf('.') > -1) {
            return parseFloat(value).toFixed(2)
          } else {
            return value
          }
        } else if(item == 'buttons'){
          return value[1].text
        } else if(item == 'rdate' || item == 'gmt_sale'){
          let val = value.split('-')
          return val[1] +'.'+ val[2]
        } else if(item == 'growkey'){
          let valstart = value.split('至')[0].split('-')
          let valend = value.split('至')[1].split('-')
          return valstart[1] +'.'+ valstart[2] + '-' + valend[1] + '.' + valend[2]
        }else {
          return value
        }
      }
    },
    components: {
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .wage_table_1{
    float: left;
    width: 40%;
    .table_dividend{
      border-right: 1px solid #aaa;
      li{
        float: left;
        text-align: center;
      }
      li:nth-child(1){
        width: 50%;
      }
      li:nth-child(2){
        width: 50%;
      }
    }
    .table_thead{
      background: #fff;
      height: 35px;
      line-height: 38px;
      font-size: 0.28rem;
      font-weight: bold;
      border-bottom:1px solid #dddddd;
    }
    .table_body{
      position: relative;
      height: 1rem;
      /*line-height: 1rem;*/
    }
    .table_body li:nth-child(1){
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    .table_body li:nth-child(2){
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(0, -50%);
    }
    .table_body:nth-child(2n+1){
      background:#fff;
    }
  }
  .wage_table_2{
    float: right;
    width: 60%;
    overflow-x:scroll;
    overflow-y: hidden;
    .table_dividend{
      width:750px;
      li{
        float: left;
        text-align: center;
        width: 80px;
      }
    }
    .table_thead{
      font-size: 0.28rem;
      font-weight: bold;
      background: #fff;
      height: 35px;
      line-height: 38px;
      border-bottom:1px solid #dddddd
    }
    .table_body{
      position: relative;
      height: 1rem;
      line-height: 1rem;
    }
    .table_body:nth-child(2n+1){
      background:#fff;
    }
  }
  .dropdown{
    box-sizing: border-box;
    position: absolute;
    left: 3rem;
    top: 36px;
    width: 49%;
    height: 0.5rem;
    padding: 0 0.2rem 0.2rem 0.2rem;
    img{
      position: absolute;
      left: 0;
      width: 100%;
    }
  }

  .underline{
    text-decoration: underline;
  }
  .unbuttons{
    color: #aaa !important;
  }
  .buttons_color{
    color: #10aeff;
  }
  .profit_lose{
    color: #00AA00;
  }
  .profit_win{
    color: #FF0000;
  }
</style>
