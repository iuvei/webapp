<!--充值记录-->
<template>
  <div>
    <headTop headTitle="充提记录" goBack='true'></headTop>
    <div class="header_app_v"></div>
    <transition name="slideDown">
      <div class="main" v-if="show">
        <dateSelectView :starttime="postData.starttime" :endtime="postData.endtime" @getStartTime="onGetStartTime"
                        @getEndtime="onGetEndtime"></dateSelectView>
        <div class="inputBox">
          <p class="searchtit" :class="playPlatform">状态</p>
          <div class="select">
            <ul class="selectBox">
              <li class="left" :class="{activeStatus:isActiveStatus == item.status}"
                  v-tap="{ methods:showname, item: item}" v-for="(item,index) in winningState" :key="index"
                  v-text="item.name"></li>
            </ul>
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
            <tr style="height:0.7rem;">
              <th width="8%" class="whiteSpace">序号</th>
              <th width="25%">时间</th>
              <th width="22%">类型</th>
              <th width="25%">收入/支出</th>
              <th width="20%">状态</th>
            </tr>
            <tr class="dropdown" v-tap="{ methods:clickDropdown}" style="background:none">
              <p>
                <img ref="dropdown" src="../img/dropDown.png"/>
              </p>
            </tr>
            </thead>
            <tbody>
            <tr v-tap="{ methods: _recordDetails, item: item}" v-for="(item,index) in getData" align="center"
                style="height:1.2rem;">
              <td class="whiteSpace">{{index+1}}</td>
              <td>{{item.times}}</td>
              <td class="ellipsis">{{item.cntitle | filterCntitle}}</td>

              <td class="ellipsis" v-if="item.operations==1" style="color:#07a83c;">+{{item.amount | tofixed('元')}}</td>
              <td class="ellipsis" v-else style="color:#e20000;">-{{item.amount | tofixed('元')}}</td>
              <td style="position: relative;">
                <span v-if="item.transferstatus == 1 || item.transferstatus == 3" style="color:green;">失败</span>
                <span v-else style="color:#ec0a0a;">成功</span>
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
    name: 'RechargeRecord',
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
        isActiveStatus: 0, // 默认选中状态-全部
        dropstuts: false,
        show: false,
        getData: [], // 重提记录列表
        winningState: [
          {
            name: '全部',
            status: 0
          },
          {
            name: '成功',
            status: 1
          },
          {
            name: '失败',
            status: 2
          }
        ],
        postData: {
          p: 1,
          starttime: this.mUtils.setDateTime(0) + ' 2:00:00',
          endtime: this.mUtils.setDateTime(1) + ' 2:00:00',
          status: 0
        }
      }
    },
    activated() {
      if (this.$store.state.betRecordFlag) {
        this.postData.p = 1
        this.postData.status = 0
        this.postData.starttime = this.mUtils.setDateTime(0) + ' 2:00:00'
        this.postData.endtime = this.mUtils.setDateTime(1) + ' 2:00:00'
        this._getRecord()
        if (this.playPlatform === 'web') {
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
        this.getData = []
      }
    },
    mounted() {
//      this._getRecord()
    },
    methods: {
      _recordDetails(params) {
        this.$router.push({path: '/userInfo/recordDetails', query: {item: params.item}})
        this.$store.commit('updateUserInfoChildFlag', false)
      },
      showname(params) {
        this.isActiveStatus = params.item.status
        this.postData.status = params.item.status
        this.postData.p = 1
        this._getRecord()
      },
      clickDropdown() {
        this.show = !this.show
        let clickDown = this.$refs.dropdown
        if (this.show) {
          clickDown.src = require('../img/up.png')
        } else {
          clickDown.src = require('../img/dropDown.png')
        }
      },
      onGetEndtime(val) {
        this.postData.endtime = val
        this.postData.p = 1
        this._getRecord()
      },
      onGetStartTime(val) {
        this.postData.starttime = val
        this.postData.p = 1
        this._getRecord()
      },
      _getRecord() {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('SELFBANKREPORT')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (this.postData.p !== 1) {
            if (this.getData.length !== 0) {
              // 将数组插入
              for (let i = 0, orders = res.data.orders; i < orders.length; i++) {
                this.getData.push(orders[i])
              }
            }
          } else {
            this.getData = res.data.orders
          }
          if (this.getData.length == 0) {
            this.nodate = true
          } else {
            this.nodate = false
          }
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data.orders)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
        }, this.postData)
      },

      loadTop() { // 组件提供的下拉触发方法
        this.postData.p = 1
        // 下拉加载
        this._getRecord()
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
        this._getRecord()
      },
      isHaveMore(isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length == 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  @slideDown_height: 1.28rem;
  .slideLeft-enter-active, .slideLeft-leave-active {
    opacity: 1;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
  }

  .slideLeft-enter, .slideLeft-leave-active {
    opacity: 0;
  }

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
    transition: .2s all linear;
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
      font-size: 0.24rem;
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
    .caizhong {
      li {
      }
      .active {
        border: 1px solid #c7202a;
        color: #c7202a;
        background: #ffebec;
      }
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
      float: left
    }
    .selectBox {
      li {
        box-sizing: border-box;
        border: 1px solid #c8c8c8;
        width: 0.8rem;
        .wh(1.06rem, 0.54rem);
        line-height: 0.55rem;
        text-align: center;
        margin-right: 0.1rem;
        .borderRadius(0.05rem);
      }
      .activeStatus {
        background: #ffebec;
        color: #d24b52;
        border: 1px solid @color_c7202c;
      }
    }
  }

</style>
