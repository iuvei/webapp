<!--日亏损佣金-->
<template>
  <div>
    <headTop headTitle="日亏损佣金" goBack='true'></headTop>
    <div v-show="dayloss" class="dayloss_fixed">
      <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
        <thead style="background:#fff;">
        <tr style=" height: 0.7rem;">
          <th width="10%">序号</th>
          <th width="20%">时间</th>
          <th width="20%">个人佣金</th>
          <th width="30%">团队日亏损佣金</th>
          <th width="20%">当天详情</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                     :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;" class="dayloss_addEvent_hook">
            <dateSelectView :starttime="postData.begintime" :endtime="postData.eatime" @getStartTime="onGetStartTime"
                            @getEndtime="onGetEndtime" :noTime="true"></dateSelectView>
            <div class="inputBox clear">
              <p class="searchtit">用户名:</p>
              <div v-text="userName"></div>
            </div>
            <div class="text">温馨提示：最多可查询近一个月数据</div>
            <div class="wage_table">
              <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
                <thead class="thead_hooks" style="background:#fff;">
                <tr style=" height: 0.7rem;">
                  <th width="10%">序号</th>
                  <th width="20%">时间</th>
                  <th width="20%">个人佣金</th>
                  <th width="30%">团队日亏损佣金</th>
                  <th width="20%">当天详情</th>
                </tr>
                </thead>
                <tbody>
                <tr align="center" v-for="(item,index) in data.tableRows" style=" height: 1rem;">
                  <td>{{index+1}}</td>
                  <td v-text="item.gmt_sale"></td>
                  <td>{{item.salary | tfootFilter}}</td>
                  <td>{{item.self_sale | tfootFilter}}</td>
                  <td v-tap="{ methods: _checkDetails, item: item }" v-text="item.buttons[0].text"
                      style="text-decoration: underline; color: #10aeff;"></td>
                </tr>
                </tbody>
              </table>
            </div>
            <noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="fixbottom clear">
      <p style="width:30%;">总计</p>
      <p style="width:20%;">{{data.sum.total_salary | tfootFilter}}</p>
      <p style="width:30%;">--</p>
      <p style="width:20%;">--</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import tableLocked from '../../common/table.vue'
  import buttonView from '../../common/button.vue'
  import noDate from '../../nodata/noDate.vue'
  import {LoadMore} from 'vux'

  export default {
    components: {
      headTop,
      dateSelectView,
      tableLocked,
      buttonView,
      noDate,
      LoadMore
    },
    data() {
      return {
        data: {
          tableRows: [],
          sum: {}
        },
        userName: this.$store.state.account,
        allLoaded: false,
        scrollMode: 'auto',
        nodate: false,
        postData: {
          eatime: this.mUtils.setDateTime(0),
          begintime: this.mUtils.setDateTime(-7),
          p: 1
        },
        dayloss: false
      }
    },
    activated() {
      this.userName = this.$store.state.account
      // 提交mutation到Store
//      this.$store.commit('updateAgreement', true)
      if (this.$store.state.teamReport) {
        this.postData.p = 1,
          this.postData.begintime = this.mUtils.setDateTime(-7),
          this.postData.eatime = this.mUtils.setDateTime(0),
          this.$store.commit('updateStarttime', this.postData.begintime)
        this._getSecondaryAgent()
        this.$nextTick(function () {
          window.scroll(0, 0)
          this.setTableThead()
        })
      }
    },
    deactivated() {
      this.$vux.loading.hide()
      this.dayloss = false
      window.removeEventListener('scroll', () => {
        this._scroll()
      }, false);
      if (this.$store.state.betRecordFlag) {
        this.data.tableRows = []
      }
    },
    mounted() {
//      this._getSecondaryAgent()
    },
    methods: {
      setTableThead() {
        $('.p_fixed').css('zIndex', -1)
        window.addEventListener('scroll', () => {
          this._scroll()
        }, false)

      },
      _scroll() {
        if ($(".thead_hooks").offset() == undefined) {
          return
        } else {
          var oTop = $(".thead_hooks").offset().top;
        }
        var sTop = 0;
        sTop = $(window).scrollTop() + 35
        if (sTop >= oTop) {
          $('.p_fixed').css('zIndex', 9)
          this.dayloss = true
        } else {
          $('.p_fixed').css('zIndex', -1)
          this.dayloss = false
        }
      },
      _checkDetails(params) {
        this.$router.push({
          path: '/userInfo/DayLossBrokerage',
          query: {userid: params.item.userid, gmt_sale: params.item.gmt_sale, un_click: true}
        })
      },
      loadTop() { //  组件提供的下拉触发方法
        this.postData.p = 1
        this._getSecondaryAgent()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom() {
        // 上拉加载
        this.more() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      more() {
        // 分页查询
        this.postData.p = parseInt(this.postData.p) + 1
        this._getSecondaryAgent()
      },
      isHaveMore(isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      },
      // 获取日工资列表
      _getSecondaryAgent() {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('LOSESALARY')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data.list
            this.data.sum = result.sum
            if (this.postData.p !== 1) {
              if (result.results.length !== 0) {
                // 将数组插入
                for (let i = 0, result = result.results; i < result.length; i++) {
                  this.data.tableRows.push(result[i])
                }
              }
            } else {
              this.data.tableRows = result.results
            }
            this.$store.commit('updateDayWageList', this.data.tableRows)
            if (this.data.tableRows.length == 0) {
              this.nodate = true
            } else {
              this.nodate = false
            }
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.isHaveMore(result.results)
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
          }
        }, this.postData)
      },
      onGetStartTime(val) {
        this.postData.begintime = val
        this.$store.commit('updateStarttime', this.postData.begintime)
        this._getSecondaryAgent()
      },
      onGetEndtime(val) {
        this.postData.eatime = val
        this.$store.commit('updateStarttime', this.postData.eatime)
        this._getSecondaryAgent()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .inputBox {
    height: 0.52rem;
    line-height: 0.53rem;
    padding: 0.12rem 0;
    p {
      float: left;
      line-height: 0.52rem;
      height: 0.52rem
    }
    .searchtit {
      width: 20%;
      text-indent: 3%;
      font-size: 0.24rem;
    }
    span {
      float: left;
      box-sizing: border-box;
      line-height: 0.52rem;
      border-radius: 3px;
      border: 1px solid #c8c8c8;
      padding: 0 0.2rem;
      margin-right: 5px
    }
    input {
      float: left;
      border: 1px solid #ccc;
      height: 0.52rem;
      border-radius: 3px;
      padding: 0 0.1rem 0;
      width: 35%;
      margin-right: 0.2rem;
      font-size: 0.24rem;
    }
    .select {
      position: relative;
      float: left
    }
    .selectBox {
      background: #fff;
      z-index: 9;
      li {
        width: 1rem;
        .hl(0.52rem);
        text-align: center;
        margin-right: 0.1rem;
        .borderRadius(0.06rem);
        border: 1px solid #c8c8c8;
      }
    }
  }

  .tableStyle th {
    white-space: nowrap;
  }

  tfoot tr {
    .hl(0.78rem);
    background: #ddd;
  }

  .button_select {
    display: inline-block;
  }

  .text {
    .wh(100%, 0.5rem);
    line-height: 0.5rem;
    background: #FFF2BB;
    text-align: center;
    color: #C09743;
  }

  .weui-loadmore {
    top: 3rem;
  }

  .noDate {
    top: 30%;
  }

  .input-wrapper {
    padding: 0px;
  }

  .topPadding {
    height: 0.88rem;
  }

  .searchTime {
    padding: 0.1rem 0;
    height: 0.7rem;
    p {
      float: left;
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 2px;
    }
    .objinput {
      width: 40%;
      float: left;
      line-height: 0.4rem;
      input {
        border-radius: 4px;
        border: 1px solid #ddd;
        height: 0.7rem;
        width: 100%;
        background: #fff;
        text-indent: 4px;
      }
    }
  }

  .fixbottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    &:after {
      .border-1px(100%, solid, #ccc);
    }
    p {
      float: left;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }

  .dayloss_fixed {
    position: fixed;
    top: 0.88rem;
    z-index: 9;
  }
</style>
