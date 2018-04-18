<!--历史分红-->
<template>
  <div>
    <headTop headTitle="历史分红" goBack='true' close="true"></headTop>
    <div v-show="dayloss" class="p_fixed">
      <tableThead :datas="dataChiled" :starttime="postData.starttime" :thead_1="2" :thead_2="1"></tableThead>
    </div>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :auto-fill="false" :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;">
            <div class="inputBox clear">
              <p class="searchtit">用户名</p>
              <div class="selsect_dividend">
                <popup-picker :data="dateList" v-model="dateScope" @on-change="onChange"></popup-picker>
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
    <tableTfoot :datas="dataChiled" :starttime="postData.starttime"></tableTfoot>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import tableLocked from '../../common/table.vue'
  import tableTfoot from '../../common/table_tfoot.vue'
  import tableThead from '../../common/table_thead.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore, PopupPicker } from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      tableLocked,
      noDate,
      LoadMore,
      PopupPicker,
      tableTfoot,
      tableThead
    },
    data () {
      return {
        dateList: [], // 日期范围列表
        dateScope: [this.$route.query.username],
        dateFlags: true,
        dataChiled:{
          gridColumns:['growkey', 'sale_total', 'gross_income', 'team_daily_salary', 'team_lose_salary', 'dividend_radio', 'allsalary'],
          thead:['序号', '时间', '销售额', '盈亏总额', '日工资总额', '日亏损佣金', '分红比例', '分红'],
          tfoot: ['history_sale_total', 'history_gross_income', 'history_team_daily_salary', 'history_team_lose_salary','buttons_historyDividend', 'history_allsalary'],
          tableRows: [],
          tfootFlag: true,
          sum: {}
        },
        scrollMode: 'auto',
        nodate: false,
        postData: {
          username: this.$route.query.username,
          p: 1
        },
        dayloss: false
      }
    },
    mounted () {
      this._getusernameList()
      this._getSecondaryAgent()
      this.$nextTick(function(){
//        this.$store.commit('updateTeamReport', false)
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
      onChange(val) {
        this.postData.username = val[0]
        this._getSecondaryAgent()
      },
      // 获取用户名列表
      _getusernameList() {
        let list = this.$store.state.daywageList, listFlag = []
        list.forEach((item) => {
          if (item.username == '团队数据') {

          } else if (item.username == '个人结余') {
            listFlag.push(this.$store.state.account)
          } else {
            listFlag.push(item.username)
          }
        })
        this.dateList.push(listFlag)
      },
      // 获取历史分红列表
      _getSecondaryAgent () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('PRESONALSALARY')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
           let result = res.data.data
            if (result.history) {
              this.dataChiled.sum = result.history
            }
            if (this.postData.p !== 1) {
              if (result.alldata.results.length !== 0) {
                // 将数组插入
                for (let i = 0, result = result.alldata.results; i < result.length; i++) {
                  this.dataChiled.tableRows.push(result[i])
                }
              }
            } else {
              this.dataChiled.tableRows = result.alldata.results
            }
//            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)
            if (this.dataChiled.tableRows.length == 0) {
              this.nodate = true
              this.dataChiled.tfootFlag = false
            } else {
              this.nodate = false
              this.dataChiled.tfootFlag = true
            }
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.isHaveMore(result.alldata.results)
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
          } else {
            this.dataChiled.sum = {}
            this.dataChiled.tableRows = []
          }
        }, this.postData)
      },
      loadTop () {
        this.postData.p = 1
        this._getSecondaryAgent()
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        this.more()
        this.$refs.loadmore.onBottomLoaded()
      },
      more () {
        // 分页查询
        this.postData.p = parseInt(this.postData.p) + 1
        this._getSecondaryAgent()
      },
      isHaveMore (isHaveMore) {
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true
        }
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
