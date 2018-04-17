<!--投注记录-->
<template>
  <div>
    <headTop headTitle="投注记录" goBack='true'></headTop>
    <div class="header_app_v"></div>
    <transition name="slideDown">
      <div class="main" v-show="show" >
        <dateSelectView :starttime="getData.starttime" :endtime="getData.endtime" @getStartTime="onGetStartTime" @getEndtime="onGetEndtime"></dateSelectView>
        <div class="inputBox clear">
          <p class="searchtit">展示方式</p>
          <p class="caizhong">
            <span v-tap="{ methods:_isActivesTime }" :class="{ activeStatus: isActives === 3 }" :type="1">时间</span>
            <span v-tap="{ methods:_isActivesPeriods }" :class="{ activeStatus: isActives === 4 }" :type="2">奖期</span>
          </p>
        </div>
        <div class="inputBox clear" >
          <p class="searchtit">展示彩种</p>
          <p class="caizhong">
            <span v-tap="{ methods:allLottery }" :class="{ activeStatus: isActive === 1 }" :type="1">全彩种</span>
            <span v-tap="{ methods:oftenLottery }" :class="{ activeStatus: isActive === 2 }" :type="2">常玩彩种</span>
          </p>
        </div>
        <div class="inputBox">
          <p class="searchtit">中奖状态</p>
          <div class="select">
            <ul class="selectBox clear">
              <li class="left" :class="{activeStatus : isActiveStatus === index}" v-tap="{ methods:showname, item: item, index: index }" v-for="(item,index) in winningState" :key="index" v-text="item.name"></li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div style="min-height:11rem;">
          <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
            <thead style="background:#fff;">
              <tr style=" height: 0.7rem;">
                <th width="8%" class="whiteSpace">序号</th>
                <th width="25%">投注时间</th>
                <th width="20%">投注号码</th>
                <th width="20%">投注金额</th>
                <th width="25%">状态</th>
              </tr>
              <tr class="dropdown"  v-tap="{ methods:_clickDropDown }" style="background:none">
                <p>
                  <img ref="dropdown" src="../img/dropDown.png" />
                </p>
              </tr>
            </thead>
            <tbody>
              <tr  v-tap="{ methods:_betRecordDetails, item: item }" v-for="(item,index) in dataList" :key="index" align="center" style=" height: 1.2rem;">
                <td class="whiteSpace">{{index+1}}</td>
                <td>
                  <p v-text="item.cnname"></p>
                  <p v-show="isActives==3" v-text="item.writetime"></p>
                  <p v-show="isActives==4" v-text="item.issue"></p>
                </td>
                <td>
                  <p class="ellipsis" v-text="item.code"></p>
                </td>
                <td class="ellipsis">{{item.totalprice | tofixed('元')}}</td>
                <td style="position: relative;">
                  <span v-if="item.iscancel==0&&item.isgetprize==0">未开奖</span>
                  <span v-if="item.iscancel==0&&item.isgetprize==2">未中奖</span>
                  <span v-if="item.iscancel==0&&item.isgetprize==1&&item.prizestatus == 0">未派奖</span>
                  <span style="color:#c7202c;" v-if="item.iscancel==0&&item.isgetprize==1&&item.prizestatus != 0">已派奖</span>
                  <span v-if="item.iscancel!=0">已撤单</span>
                  <span class="icon_right"></span>
                </td>
                </tr>
              </tbody>
            </table>
          <noDate v-show="nodate"></noDate>
          <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
        </div>
      </mt-loadmore>
    </div>
    <div class="fixbottom clear">
      <p>总投注金额</p>
      <p style="color:red;">{{totalPrice | tofixed('元')}}</p>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import noDate from '../../nodata/noDate.vue'
  import { Datetime, XButton } from 'vux'

  export default {
    name: 'betRecord',
    components: {
      headTop,
      dateSelectView,
      noDate,
      Datetime,
      XButton
    },
    data () {
      return {
      	nodate: false,
        dataList: [], // 投注记录
        flagDataList: [],
        totalPrice: 0, // 总投注金额
        isActive: 1, // 默认选中全部彩种
        isActives: 3, // 默认以时间展示方式
        isActiveStatus: 0, // 默认中奖状态全部
        show: false,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        winningState: [
          {
            name: '全部'
//            isgetprize: 0
          },
          {
            name: '未开奖',
            isgetprize: 0,
            iscancel: 0
          }, {
            name: '未中奖',
            isgetprize: 2,
            iscancel: 0
          }, {
            name: '未派奖',
            isgetprize: 1,
            prizestatus: 0,
            iscancel: 0
          }, {
            name: '已派奖',
            isgetprize: 1,
            prizestatus: 1,
            iscancel: 0
          }
        ],
        getData: {
          starttime: this.mUtils.setDateTime(0) + ' 2:00:00',
          endtime: this.mUtils.setDateTime(1) + ' 2:00:00',
//          iscancel: 0,
//          prizestatus: 0,
          isgetdata: 1,
          issue: '0',
          lotteryid: 0,
          methodid: '0',
          p: 1
        },
        onFetching: false,
        load: true
      }
    },
    activated () {
      if (this.$store.state.betRecordFlag) {
        this.getData.p = 1,
        this.getData.lotteryid = 0,
        this.getData.issue = '0',
        this.getData.starttime = this.mUtils.setDateTime(0) + ' 2:00:00',
        this.getData. endtime = this.mUtils.setDateTime(1) + ' 2:00:00',
        this._getBetRecord()
        this.$nextTick(function(){
          window.scroll(0, 0)
        })
      }
    },
    deactivated () {
      this.show = false
      let clickDown = this.$refs.dropdown
      clickDown.src = require('../img/dropDown.png')
      if (this.$store.state.betRecordFlag) {
        this.dataList = []
      }
    },
    mounted () {
//      this._getBetRecord()
    },
    methods: {
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
      oftenLottery () {
        this.isActive = 2
        let enshrine = this.$store.state.enshrine
        let flag = ''
        enshrine.forEach((item) => {
          flag += item.lotteryid + ','
        })
        this.getData.lotteryid = flag.substring(0, flag.length - 1)
        this.getData.p = 1
        this._getBetRecord()
      },
      allLottery () {
        this.isActive = 1
        this.getData.lotteryid = 0
        this.getData.p = 1
        this._getBetRecord()
      },
      showname (params) {
        this.isActiveStatus = params.index
        this.getData.iscancel = params.item.iscancel
        this.getData.isgetprize = params.item.isgetprize
        this.getData.prizestatus = params.item.prizestatus
        this.getData.p = 1
        this._getBetRecord()
      },
      _clickDropDown () {
        this.show = !this.show
        let clickDown = this.$refs.dropdown
        if (this.show) {
          clickDown.src = require('../img/up.png')
        } else {
          clickDown.src = require('../img/dropDown.png')
        }
      },
      onGetStartTime (val) {
        this.getData.starttime = val
        this.getData.p = 1
        this._getBetRecord()
      },
      onGetEndtime (val) {
        this.getData.endtime = val
        this.getData.p = 1
        this._getBetRecord()
      },
      // 获取投注记录
      _getBetRecord () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('BETHISTORY')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          this.totalPrice = res.data.totalPrice
          if (this.getData.p !== 1) {
            if (this.dataList.length !== 0) {
              // 将数组插入
              for (let i = 0, aProject = res.data.aProject; i < aProject.length; i++) {
                this.dataList.push(aProject[i])
              }
            }
          } else {
            this.dataList = res.data.aProject
          }
          if (this.dataList.length == 0) {
            this.nodate = true
        	} else {
            this.nodate = false
          }
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data.aProject)
          this.$nextTick(function () {
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果
            // 是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = 'touch'
          })
        },this.getData)
      },
      loadTop () { // 组件提供的下拉触发方法
        this.getData.p = 1
        // 下拉加载
        this._getBetRecord()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom () {
        // 上拉加载
        this.more() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      more () {
        // 分页查询
        this.getData.p = parseInt(this.getData.p) + 1
        this._getBetRecord()
      },
      isHaveMore (isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      },

      // 获取url
      httpUrl(val){
        let app = require('../../../../static/hc.json')
        let appData = app
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

  @slideDown_height:3rem;

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
      width: 35%;
      text-indent:4px;
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
  .fixbottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    &:after{
      .border-1px(100%,solid,#ccc);
    }
    p {
      float: left;
      width: 50%;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
</style>
