<!--彩票账变-->
<template>
  <div>
    <headTop headTitle="彩票账变" goBack='true'></headTop>
    <div class="header_app_v"></div>
    <transition name="slideDown">
      <div class="main" v-if="show">
        <dateSelectView :starttime="postData.starttime" :endtime="postData.endtime" @getStartTime="onGetStartTime"
                        @getEndtime="onGetEndtime"></dateSelectView>
        <div class="inputBox">
          <p class="searchtit" :class="playPlatform">展示彩种</p>
          <p class="caizhong">
            <span v-tap="{ methods:allLottery }" :class="{active: isActive === 1}" :type="1">全彩种</span>
            <span v-tap="{ methods:oftenLottery }" :class="{active: isActive === 2}" :type="2">常玩彩种</span>
          </p>
          <br class="clear">
        </div>
        <div class="inputBox">
          <p class="searchtit" :class="playPlatform">帐变类型</p>
          <div class="select">
            <select name="ordertype" id="ordertype" v-model="selected">
              <option :value="item.value" v-for="(item,index) in optionData" :key="index" v-text="item.text"></option>
            </select>
          </div>
        </div>
      </div>
    </transition>
    <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                   ref="loadmore">
        <div style="min-height:11rem;">
          <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
            <thead style="background:#fff;">
            <tr style=" height: 0.7rem;">
              <th width="10%">序号</th>
              <th width="30%">投注时间</th>
              <th width="30%">账变类型</th>
              <th width="30%">余额变动</th>
            </tr>
            <tr class="dropdown" v-tap="{ methods:_clickDropDown }" style="background:none">
              <p>
                <img ref="dropdown" src="../img/dropDown.png"/>
              </p>
            </tr>
            </thead>
            <tbody>
            <tr v-tap="{ methods:_lotteryChangeDetails, item: item }" style=" height: 1.2rem;" align="center"
                v-for="(item,index) in dataList">
              <td>{{index+1}}</td>
              <td>
                <p v-text="item.lotteryname"></p>
                <p v-text="item.times"></p>
              </td>
              <td v-text="item.title"></td>
              <td style="position: relative;">
                <span v-if="item.operations==0" style="color:#e20000;">-{{item.amount | tofixed('元')}}</span>
                <span v-else style="color:#07a83c;">+{{item.amount | tofixed('元')}}</span>
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
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import noDate from '../../nodata/noDate.vue'
  import {LoadMore} from 'vux'

  export default {
    name: 'lotteryChange',
    components: {
      headTop,
      dateSelectView,
      noDate
    },
    data() {
      return {
        nodate: false,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        selected: '0', // 默认所有类型
        isActive: 1, // 默认选中全部彩种
        dropstuts: false,
        show: false,
        dataList: [], // 彩票帐变
        optionData: [
          {
            text: '所有类型',
            value: '0'
          },
          {
            text: '加入游戏',
            value: '3'
          },
          {
            text: '投注返点',
            value: '4'
          },
          {
            text: '奖金派送',
            value: '5'
          },
          {
            text: '追号扣款',
            value: '6'
          },
          {
            text: '当期追号返款',
            value: '7'
          },
          {
            text: '撤单返款',
            value: '9'
          },
          {
            text: '撤销返点',
            value: '11'
          },
          {
            text: '撤销派奖',
            value: '12'
          },
          {
            text: '合买扣款',
            value: '16'
          },
          {
            text: '当期合买返款',
            value: '17'
          }
        ],
        postData: {
          p: 1,
          lotteryid: '0',
          starttime: this.mUtils.setDateTime(0) + ' 2:00:00',
          endtime: this.mUtils.setDateTime(1) + ' 2:00:00',
          ordertype: ''
        }
      }
    },
    watch: {
      selected: {
        deep: true,
        handler: function (val, oldVal) {
          this.postData.p = 1
          this._getData()
        }
      }
    },
    activated() {
      if (this.$store.state.betRecordFlag) {
        this.postData.p = 1
        this.postData.lotteryid = '0'
        this.postData.ordertype = ''
        this.postData.starttime = this.mUtils.setDateTime(0) + ' 2:00:00'
        this.postData.endtime = this.mUtils.setDateTime(1) + ' 2:00:00'
        this._getData()
        if (this.playPlatform === 'ios') {
          this.$nextTick(function () {
            window.scroll(0, 0)
          })
        }
      }
    },
    deactivated() {
      this.show = false
      let clickDown = this.$refs.dropdown
      clickDown.src = require('../img/dropDown.png')

      if (this.$store.state.betRecordFlag) {
        this.dataList = []
      }
    },
    mounted() {
//      this._getData()
    },
    methods: {
      _lotteryChangeDetails(params) {
        this.$router.push({path: '/userInfo/LotteryChangeDetails', query: {data: params.item}})
        this.$store.commit('updateUserInfoChildFlag', false)
      },
      oftenLottery() {
        this.isActive = 2
        let enshrine = this.$store.state.enshrine
        let flag = ''
        enshrine.forEach((item) => {
          flag += item.lotteryid + ','
        })
        this.postData.lotteryid = flag.substring(0, flag.length - 1)
        this.postData.p = 1
        this._getData()
      },
      allLottery() {
        this.isActive = 1
        this.postData.lotteryid = 0
        this.postData.p = 1
        this._getData()
      },
      _clickDropDown() {
        this.show = !this.show
        let clickDown = this.$refs.dropdown
        if (this.show) {
          clickDown.src = require('../img/up.png')
        } else {
          clickDown.src = require('../img/dropDown.png')
        }
      },
      // 获取彩票帐变
      _getData() {
        this.$vux.loading.show({
          text: '正在加载'
        })
        this.postData.ordertype = parseInt(this.selected)
        let httpurl = this.httpUrl('LOTTERYCHECK')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (this.postData.p !== 1) {
            // 将数组插入
            for (let i = 0, aOrders = res.data.aOrders; i < aOrders.length; i++) {
              this.dataList.push(aOrders[i])
            }
          } else {
            this.dataList = res.data.aOrders
          }
          if (this.dataList.length == 0) {
            this.nodate = true
          } else {
            this.nodate = false
          }
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data.aOrders)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
        }, this.postData)
      },
      onGetStartTime(val) {
        this.postData.starttime = val
        this.postData.p = 1
        this._getData()
      },
      onGetEndtime(val) {
        this.postData.endtime = val
        this.postData.p = 1
        this._getData()
      },
      loadTop() { // 组件提供的下拉触发方法
        this.postData.p = 1
        // 下拉加载
        this._getData()
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
        this._getData()
      },
      isHaveMore(isHaveMore) {
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

  @slideDown_height: 2.2rem;

  .main {
    width: 100%;
    margin: 0;
    height: @slideDown_height;
    overflow: auto;
    padding-bottom: 20px;
    background: #fff;
    border-bottom: 1px solid #dddddd
  }

  .slideDown-enter-active, .slideDown-leave-active {
    transition: .3s all linear;
    width: 100%;
    height: @slideDown_height;
  }

  .slideDown-enter, .slideDown-leave-active {
    width: 100%;
    height: 0;
  }

  .inputBox {
    height: 0.52rem;
    padding: 0.12rem 0;
    p {
      float: left;
      line-height: 0.52rem;
      height: 0.52rem
    }
    .searchtit {
      width: 20%;
      text-indent: 3%;
    }
    .searchtit.ios {
      text-indent: 5%;
    }
    span {
      float: left;
      height: 0.52rem;
      line-height: 0.52rem;
      border-radius: 3px;
      border: 1px solid #c8c8c8;
      padding: 0px 4px;
      margin-right: 5px
    }
    .active {
      border: 1px solid #c7202a;
      color: #c7202a;
      background: #ffebec;
    }
    input {
      float: left;
      line-height: 0.52rem;
      height: 0.52rem;
      border: 1px solid #c8c8c8;
      border-radius: 3px;
      width: 35%;
      text-indent: 4px;
      font-size: 0.24rem;
    }
    .select {
      position: relative;
      float: left;
      box-sizing: border-box;
      /*margin-top:0.08rem;*/
      border: 1px solid #c8c8c8;
      .borderRadius(0.05rem);
      height: 0.54rem;
      line-height: 0.55rem;
      padding: 0 0.1rem;
      select {
        width: 100%;
      }
    }
  }
</style>
