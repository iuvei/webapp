<!--团队总表-->
<template>
  <div>
    <headTop headTitle="团队总表" goBack='true'></headTop>
    <div class="header_app_v">
      <p class="username" v-text="this.$store.state.account"></p>
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;">
            <dateSelectView :starttime="postData.start_date" :endtime="postData.end_date" @getStartTime="onGetStartTime" @getEndtime="onGetEndtime"></dateSelectView>
            <div class="text">温馨提示：最多可查询近一个月数据</div>
            <div class="wage_table">
              <tableLocked :table-rows="data.tableRows"  :grid-columns="data.gridColumns" :thead="data.thead" :sum="data.sum" :height="500">
              </tableLocked>
            </div>
            <noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="fixbottom clear">

    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore } from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      noDate,
      LoadMore
    },
    data () {
      return {
        allLoaded: false,
        scrollMode: 'auto',
        nodate: false,
        dataList: [], // 团队报表
        cound: {
          allTotalWinLose: 0, // 总盈亏
          allCpBonus: 0, // 中奖金额
          allEaBonus: 0 // 总投注额
        },
        postData: {
          end_date: this.mUtils.setDateTime(1) + ' 2:00:00',
          start_date: this.mUtils.setDateTime(0) + ' 2:00:00',
          username: this.$store.state.account,
          isgetdata: 1,
          ordertype: 1,
          p: 1
        },
        win_lose: '',
        userid_junior: ''
      }
    },
    activated () {
      // 提交mutation到Store
      if (this.$store.state.teamReport != false) {
        this.postData.p = 1,
          this.postData.end_date = this.mUtils.setDateTime(1) + ' 2:00:00',
          this.postData.start_date = this.mUtils.setDateTime(0) + ' 2:00:00',
          this.postData.username = this.$store.state.account,
          this._getSecondaryAgent()
      }
    },
    deactivated () {
      this.$vux.loading.hide()
      if (this.$store.state.betRecordFlag) {
        this.dataList = []
      }
    },
    mounted () {
//      this._getSecondaryAgent()
    },
    methods: {
      loadTop () { //  组件提供的下拉触发方法
        this.postData.p = 1
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
      },
      // 点击用户名
      _clickUserName (params) {
        let item = params.item
        if (item.userid == this.userid_junior) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '没有下级了！'
          })
          return
        }
        this.$router.push({path: '/userInfo/TeamReport/TeamReportDetails', query: {userid: item.userid, username: item.username, start_date: this.postData.start_date, end_date: this.postData.end_date}})
        this.$store.commit('updateUserInfoChildFlag', false)
//        this._getSecondaryAgent(item.userid)
      },
      // 获取团队报表
      _getSecondaryAgent () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('TEAMREPORT')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          this.win_lose = res.data.win_lose
          this.userid_junior = res.data.userid_junior
          if (this.postData.p !== 1) {
            if (this.dataList.length !== 0) {
              // 将数组插入
              for (let i = 0, result = res.data.result.result; i < result.length; i++) {
                this.dataList.push(result[i])
              }
            }
          } else {
            this.dataList = res.data.result.result
          }
          if (this.dataList.length == 0) {
            this.nodate = true
          } else {
            this.nodate = false
          }
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data.result.result)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
        },this.postData)
      },
      onGetStartTime (val) {
        this.postData.start_date = val
        this._getSecondaryAgent()
      },
      onGetEndtime (val) {
        this.postData.end_date = val
        this._getSecondaryAgent()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .text{
    .wh(100%, 0.5rem);
    line-height: 0.5rem;
    background: #FFF2BB;
    text-align: center;
    color:#C09743;
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
  .username{
    text-align: center;
    background: #444444;
    color: #fff;
    line-height: 0.64rem;
    height: 0.64rem;
  }
  .fixbottom{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#fff;
    &:after{
      .border-1px(100%,solid,#ccc);
    }
    p{
      float:left;
      text-align:center;
      height:0.8rem;
      line-height:0.8rem;
    }
  }
</style>


