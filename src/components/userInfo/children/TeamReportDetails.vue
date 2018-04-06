<template>
  <div>
    <headTop headTitle="团队报表" goBack='true'></headTop>
    <div>
      <loading v-model="loading"></loading>
    </div>
    <div class="header_app_v">
      <p class="username" v-text="this.$store.state.account"></p>
      <div :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div style="min-height:11rem;">
            <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
                  <thead style="background:#fff;">
                    <tr style=" height: 0.7rem;">
                      <th width="20%">用户名</th>
                      <th width="20%">盈亏</th>
                      <th width="30%">中奖金额</th>
                      <th width="30%">总投注额</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr align="center" v-for="item in dataList" style=" height: 1rem;">
                      <td class="ellipsis" v-tap="{ methods:_clickUserName , item : item }" v-text="item.username" style="text-decoration: underline;"></td>

                      <td v-if="item.profit_loss > 0" style="color:#07a83c">+{{item.profit_loss | moneyType('')}}</td>
                      <td v-else-if="parseFloat(item.profit_loss) < 0" style="color:#e20000">{{item.profit_loss | moneyType('')}}</td>
                      <td v-else style="color:#000">{{item.profit_loss | moneyType('')}}</td>

                      <td>{{item.sum_bonus | moneyType('')}}</td>

                      <td>{{item.sum_total | moneyType('')}}</td>
                    </tr>
                  </tbody>
                </table>
            <noDate v-show="nodate"></noDate>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="fixbottom clear">
      <p style="width:15%;">总计</p>
      <p v-if="this.win_lose.total_win_lose > 0" style="width:25%; color:green;">+{{this.win_lose.total_win_lose  | moneyType('')}}</p>
      <p v-else style="width:25%; color:red;">{{this.win_lose.total_win_lose  | moneyType('')}}</p>

      <p style="width:30%;">{{this.win_lose.total_bonus  | moneyType('')}}</p>

      <p style="width:30%;">{{this.win_lose.total_prize | moneyType('元')}}</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore,Loading } from 'vux'

  export default {
    components: {
      headTop,
      dateSelectView,
      noDate,
      LoadMore,
      Loading
    },
    data () {
      return {
        loading: true,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto',
        nodate: false,
        dataList: [], // 团队报表
        cound: {
          allTotalWinLose: 0, // 总盈亏
          allCpBonus: 0, // 中奖金额
          allEaBonus: 0 // 总投注额
        },
        postData: {
          end_date: this.$route.query.end_date,
          start_date: this.$route.query.start_date,
          username: this.$route.query.username,
          isgetdata: 1,
          ordertype: 1,
          p: 1
        },
        win_lose: '',
        userid_junior: ''
      }
    },
    mounted () {
      this._getSecondaryAgent()
      this.$store.commit('updateTeamReport', false)
    },
    methods: {
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
        if (isHaveMore.length !== null && isHaveMore.length == 0) {
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
        this.$router.push({path: '/userInfo/TeamReport/TeamReportDetailsFlag', query: {userid: item.userid, username: item.username, start_date: this.postData.start_date, end_date: this.postData.end_date}})
      },
      // 获取团队报表
      _getSecondaryAgent () {
        let httpurl = this.httpUrl('TEAMREPORT')
        this.httpAction(httpurl,(res) => {
          this.loading = false
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
