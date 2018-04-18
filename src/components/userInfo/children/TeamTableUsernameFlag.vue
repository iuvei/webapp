<!--团队总表-->
<template>
  <div>
    <headTop headTitle="团队总表" goBack='true' close="true"></headTop>
    <div v-show="dayloss" class="p_fixed">
      <tableThead :datas="dataChiled" :starttime="postData.starttime" :thead_1="2" :thead_2="1"></tableThead>
    </div>
    <div class="header_app_v"></div>
    <transition name="slideDown">
      <div class="main" v-show="show" >
        <dateSelectView :starttime="start_date" :endtime="end_date" @getStartTime="onGetStartTime" @getEndtime="onGetEndtime" :noTime="true"></dateSelectView>
        <div class="inputBox clear">
          <p class="searchtit">游戏分类</p>
          <p class="caizhong">
            <span v-tap="{ methods:_isActivesTime }" :class="{ activeStatus: isActives === 3 }" :type="1">全彩种</span>|&nbsp;
          </p>
          <p class="caizhong">
            <span v-tap="{ methods:LastWeek }" :class="{ activeStatus: isActive === 1 }" :type="1">近七天</span>
            <span v-tap="{ methods:beforeMeniscus }" :class="{ activeStatus: isActive === 2 }" :type="2">上半月</span>
            <span v-tap="{ methods:afterMeniscus }" :class="{ activeStatus: isActive === 3 }" :type="3">下半月</span>
          </p>
        </div>
        <div class="inputBox clear" >
          <p class="searchtit">用户名</p>
          <p class="caizhong">
            <input type="text" v-model="postData.username">
            <span class="button_select" v-tap="{ methods: _selectUserName }">
              <buttonView  buttonTitle='查询' height="0.55"></buttonView>
            </span>
          </p>
        </div>
      </div>
    </transition>
    <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div style="min-height:11rem;">
          <tableLocked :datas="dataChiled" :no="false" :thead_1="2" :thead_2="2" :startAndEndtime="postData" @getShowTeamTable="_getShowTeamTable">
          </tableLocked>
          <noDate v-show="nodate"></noDate>
          <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
        </div>
      </mt-loadmore>
    </div>
    <tableTfoot :datas="dataChiled" :starttime="postData.starttime"></tableTfoot>
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
  import { Datetime } from 'vux'

  export default {
    components: {
      headTop,
      dateSelectView,
      noDate,
      Datetime,
      buttonView,
      tableLocked,
      tableTfoot,
      tableThead
    },
    data () {
      return {
        dataChiled:{
          gridColumns:['date_range', 'username', 'sum_prize', 'sum_bonus', 'sum_point', 'profit_loss', 'sum_salary', 'sum_lose_salary', 'sum_activity', 'sum_netincome', 'sum_dividend', 'profit'],
          thead:['日期',  '用户名', '投注', '中奖', '返点', '毛收入', '日工资', '日亏损佣金', '活动', '净收入', '分红', '盈利'],
          tfoot: ['total_prize', 'total_bonus', 'total_point', 'total_profit_loss','total_salary', 'total_lose_salary', 'total_activity', 'total_netincome', 'total_dividend', 'total_profit'],
          tableRows: [],
          tfootFlag: true,
          sum: {}
        },
      	nodate: false,
        isActive: 0, // 默认选中全部彩种
        isActives: 3, // 默认以时间展示方式

        show: true,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        start_date: this.$route.query.start_date+ ' 02:'+'00',
        end_date: this.$route.query.end_date+ ' 01:'+'59',
        postData: {
          start_date: this.$route.query.start_date,
          end_date: this.$route.query.end_date,
          username: this.$route.query.username,
          team: 1,
          p: 1
        },
        dayloss: false
      }
    },
    mounted () {
      this.$store.commit('updateUserInfoChildFlag', false)
      this._getSecondaryAgent()
      this.$nextTick(function(){
        window.scroll(0, 0)
        this.setTableTfoot()
        this.setTableThead()
      })
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
      // 设置表格foot定位
      setTableTfoot() {
        let wage_table_1 = document.getElementsByClassName('wage_table_1')
        $('.table_tfoot_1').css('width', wage_table_1[0].clientWidth + 'px')
        $('.table_thead_1').css('width', wage_table_1[0].clientWidth + 'px')

        $('.wage_table_2')[0].addEventListener('scroll', ()=>{
          $('.table_tfoot_2').scrollLeft($('.wage_table_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.wage_table_2').scrollLeft())
        })

        $('.table_tfoot_2')[0].addEventListener('scroll', ()=>{
          $('.wage_table_2').scrollLeft($('.table_tfoot_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.table_tfoot_2').scrollLeft())
        })
      },
      _selectUserName() {
        this._getSecondaryAgent()
      },
      _getShowTeamTable(val){
        this.show = val
      },
      _isActivesPeriods () {
        this.isActives = 4
      },
      _isActivesTime () {
        this.isActives = 3
      },
      _betRecordDetails (params) {
        this.$router.push({path: '/userInfo/BetRecordDetails', query: {data: params.item}})
        this.$store.commit('updateUserInfoChildFlag', false)
      },
      LastWeek () {
        this.isActive = 1
        this.postData.p = 1
        this.postData.start_date = this.mUtils.setDateTime(-7)
        this.start_date = this.mUtils.setDateTime(-7)+ ' 02:'+'00'
        this.postData.end_date = this.mUtils.setDateTime(0)+ ' 01:'+'59'
        this.end_date = this.mUtils.setDateTime(0)
        this._getSecondaryAgent()
      },
      beforeMeniscus() {
        this.isActive = 2
        this.postData.p = 1
        let thatDay = this.mUtils.setDateTime(0).split('-')
        this.postData.start_date = thatDay[0] + '-' + thatDay[1]+ '-' + '01'
        this.start_date = thatDay[0] + '-' + thatDay[1]+ '-' + '01'+ ' 02:'+'00'
        this.postData.end_date = thatDay[0] + '-' + thatDay[1]+ '-' + '16'
        this.end_date = thatDay[0] + '-' + thatDay[1]+ '-' + '16'+ ' 01:'+'59'
        this._getSecondaryAgent()
      },
      afterMeniscus() {
        this.isActive = 3
        this.postData.p = 1
        let thatDay = this.mUtils.setDateTime(0).split('-')
        this.postData.start_date = thatDay[0] + '-' + thatDay[1]+ '-' + '16'
        this.start_date = thatDay[0] + '-' + thatDay[1]+ '-' + '16'+ ' 02:'+'00'
        let year = thatDay[0],month = parseFloat(thatDay[1])+1
        if (month > 12) {
          month = '01'
          year = parseFloat(thatDay[0])+1
        }
        this.postData.end_date = year + '-' + month+ '-' + '01'
        this.end_date = year + '-' + month+ '-' + '01'+ ' 01:'+'59'
        this._getSecondaryAgent()
      },
      onGetStartTime (val) {
        this.postData.start_date = val
        this.start_date = val+ ' 02:'+'00'
        this.postData.p = 1
        this._getSecondaryAgent()
      },
      onGetEndtime (val) {
        this.postData.end_date = val
        this.end_date = val+ ' 01:'+'59'
        this.postData.p = 1
        this._getSecondaryAgent()
      },
      // 获取团队总表
      _getSecondaryAgent () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('HISTORYALL')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let results = res.data
            this.dataChiled.sum = results.totals
            this.dataChiled.tableRows = results.result

            let start_date = this.postData.start_date.split('-')
            let end_date = this.postData.end_date.split('-')
            let date_range = start_date[1] + '.' + start_date[2] + '-' + end_date[1] + '.' + end_date[2]
            this.dataChiled.tableRows.forEach((item) => {
              item.date_range = date_range
            })
            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)

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
            this.dataChiled.sum = {}
            this.dataChiled.tableRows = []
            this.dataChiled.tfootFlag = false
          }
        }, this.postData)
      },
      loadTop () { // 组件提供的下拉触发方法
        this.postData.p = 1
        // 下拉加载
        this._getSecondaryAgent()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom () {
        // 上拉加载
        this.more() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      more () {
        // 分页查询
        this.postData.p = parseInt(this.postData.p) + 1
        this._getSecondaryAgent()
      },
      isHaveMore (isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  @slideDown_height:2rem;

  .main{
    width:100%;
    margin: 0;
    height:@slideDown_height;
    padding-bottom:20px;
    background:#fff;
    border-bottom:1px solid #dddddd;
    overflow:hidden;
  }
  .slideDown-enter-active, .slideDown-leave-active {
    transition: .3s all linear;
    width:100%;
    height:@slideDown_height;
  }
  .slideDown-enter ,.slideDown-leave-active{
    width:100%;
    height:0;
  }
  .main-body{
    margin-bottom: 0.8rem;
  }
  .inputBox{
    height:0.52rem;
    padding:0.12rem 0;
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
      line-height: 0.52rem;
      height:0.52rem;
      border:1px solid #c8c8c8;
      border-radius: 3px;
      width: 60%;
      text-indent:4px;
      padding: 0;
      font-size: 0.24rem;
    }
    .button_select{
      border: 0;
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
  .caizhong span.activeStatus, .selectBox li.activeStatus{
    border:1px solid #c7202a;
    color: #c7202a;
    background:#ffebec;
  }
  .weui-loadmore,.updata_finish{
    .cl;
    margin-top:0.5rem;
  }

</style>
