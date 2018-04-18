<!--日亏损佣金-->
<template>
  <div>
    <headTop headTitle="日亏损佣金" goBack='true' close="true" AgreementExplain="true" textExplain="日亏损佣金"></headTop>
    <div v-show="dayloss" class="p_fixed">
      <tableThead :datas="dataChiled" :starttime="postData.starttime" :thead_1="2" :thead_2="1"></tableThead>
    </div>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                     :distanceIndex="2" ref="loadmore">
          <div :style="{minHeight:playPlatform==='web'?'11rem':'12rem'}">
            <dateSelectView :starttimeOne="postData.gmt_sale" @getStartOneTime="onGetStartTime"
                            dateSelectOne="true"></dateSelectView>
            <div class="inputBox clear">
              <p class="searchtit">用户名</p>
              <div v-text="userName"></div>
            </div>
            <div class="text">温馨提示：最多可查询近一个月数据</div>
            <div class="wage_table">
              <tableLocked :datas="dataChiled" :starttime="postData.gmt_sale" :no="true" :thead_1="2" :thead_2="1"
                           :lossBrokerage="true">
              </tableLocked>
            </div>
            <noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
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
  import {LoadMore} from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      tableLocked,
      noDate,
      LoadMore,
      tableTfoot,
      tableThead
    },
    data() {
      return {
        dataChiled: {
          gridColumns: ['username', 'usergroup_name', 'cp_stake', 'cp_point', 'cp_bonus', 'cp_win_lose', 'lose_salary'],
          thead: ['序号', '用户名', '所属组', '投注额', '返点', '中奖金额', '亏损额', '产生佣金'],
          tfoot: ['null', 'cp_stake', 'cp_point', 'cp_bonus', 'cp_win_lose', 'lose_salary'],
          tableRows: [],
          sum: {},
          tfootFlag: true
        },
        userName: this.$store.state.account,
        allLoaded: false,
        scrollMode: 'auto',
        nodate: false,
        postData: {
          gmt_sale: this.$route.query.gmt_sale,
          userid: this.$route.query.userid,
          p: 1
        },
        dayloss: false
      }
    },
    mounted() {
      this._getSecondaryAgent()
      this.$nextTick(function () {
        window.scroll(0, 0)
        this.setTableTfoot()
        this.setTableThead()
      })
    },
    methods: {
      // 设置表格head定位
      setTableThead() {
        $('.p_fixed').css('zIndex', -1)

        window.addEventListener('scroll', () => {
          this._scroll()
        })
      },
      _scroll() {
        if ($(".thead_hook").offset() == undefined) {
          return
        } else {
          var oTop = $(".thead_hook").offset().top;
        }
        var sTop = 0;
        sTop = $(window).scrollTop() + 35
        if (sTop >= oTop) {
          $('.p_fixed').css('zIndex', 9)
        } else {
          $('.p_fixed').css('zIndex', -1)
        }
      },
      // 设置表格foot定位
      setTableTfoot() {
        let wage_table_1 = document.getElementsByClassName('wage_table_1')
        $('.table_tfoot_1').css('width', wage_table_1[0].clientWidth + 'px')
        $('.table_thead_1').css('width', wage_table_1[0].clientWidth + 'px')

        $('.wage_table_2')[0].addEventListener('scroll', () => {
          $('.table_tfoot_2').scrollLeft($('.wage_table_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.wage_table_2').scrollLeft())
        })

        $('.table_tfoot_2')[0].addEventListener('scroll', () => {
          $('.wage_table_2').scrollLeft($('.table_tfoot_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.table_tfoot_2').scrollLeft())
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
        let httpurl = this.httpUrl('DETAIL')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data.list
            if (res.data.data.total != null) {
              this.dataChiled.sum = res.data.data.total
            }
            if (this.postData.p !== 1) {
              if (result.results.length !== 0) {
                // 将数组插入
                for (let i = 0, result = result.results; i < result.length; i++) {
                  this.dataChiled.tableRows.push(result[i])
                }
              }
            } else {
              this.dataChiled.tableRows = result.results
            }
            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)
            if (this.dataChiled.tableRows.length == 0) {
              this.nodate = true
              this.dataChiled.tfootFlag = false
            } else {
              this.nodate = false
              this.dataChiled.tfootFlag = true
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
        this.postData.gmt_sale = val
        this.$store.commit('updateStarttime', this.postData.gmt_sale)
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
</style>
