<!--追号记录-->
<template>
  <div>
    <!--<load-more v-if="loading" tip="正在加载"></load-more>-->
    <headTop headTitle="追号记录" goBack='true'></headTop>
    <div class="header_app_v">
      <transition name="slideDown">
        <div class="main" v-if="show" >
          <dateSelectView :starttime="postData.starttime" :endtime="postData.endtime" @getStartTime="onGetStartTime" @getEndtime="onGetEndtime"></dateSelectView>
        </div>
      </transition>
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div style="min-height:11rem;">
            <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="0">
              <thead style="background:#fff;">
                <tr style=" height: 0.7rem;">
                  <th width="10%" class="whiteSpace">序号</th>
                  <th width="30%">投注时间</th>
                  <th width="30%">开始期数</th>
                  <th width="30%">追号内容</th>
                </tr>
                <tr class="dropdown" v-tap="{ methods:_clickDropDown}" style="background:none">
                  <p>
                    <img ref="dropdown" src="../img/dropDown.png" />
                  </p>
                </tr>
              </thead>
              <tbody>
                  <tr v-tap="{ methods:_chaseDetails, item: item }" align="center" v-for="(item,index) in dataList" style=" height: 1.2rem;">
                    <td class="whiteSpace">{{index+1}}</td>
                    <td>
                      <span v-text="item.cnname"></span><br>
                      <span v-text="item.begintime"></span>
                    </td>
                    <td v-text="item.beginissue"></td>
                    <td style="position: relative;">
                      <p class="ellipsis" v-text="item.codes"></p>
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
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'
  import noDate from '../../nodata/noDate.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import { LoadMore } from 'vux'

  export default {
    name: 'chaseRecord',
    data () {
      return {
      	nodate: false,
//        loading: true,
        show: false,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        dataList: [], // 帐变记录
        postData: {
          client: 'H5',
          endtime: this.mUtils.setDateTime(1) + ' 2:00:00',
          isgetdata: 1,
          issue: 0,
          lotteryid: 0,
          methodid: 0,
          page: 1,
          starttime: this.mUtils.setDateTime(0) + ' 2:00:00'
        }
      }
    },
    components: {
      headTop,
      noDate,
      dateSelectView
    },
    activated () {
      if (this.$store.state.betRecordFlag) {
        this.postData.page = 1
        this.postData.endtime = this.mUtils.setDateTime(1) + ' 2:00:00',
        this.postData.starttime = this.mUtils.setDateTime(0) + ' 2:00:00'
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
    updated () {
      this.loading = false
    },
    mounted () {
//      this._getBetRecord()
    },
    methods: {
      _chaseDetails (params) {
        this.$router.push({path: '/userInfo/ChaseDetails', query: {taskid: params.item.taskid}})
        this.$store.commit('updateUserInfoChildFlag', false)
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
      // 获取追号记录
      _getBetRecord () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('TRACKINGHIS')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (this.postData.page !== 1) {
            if (this.dataList.length !== 0) {
              for (let i = 0, aTask = res.data.aTask; i < aTask.length; i++) {
                this.dataList.push(aTask[i])
              }
            }
          } else {
            this.dataList = res.data.aTask
          }
          if (this.dataList.length == 0) {
            this.nodate = true
        	} else {
            this.nodate = false
          }
          this.isHaveMore(res.data.aTask)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
        },this.postData)
      },
      loadTop () { // 组件提供的下拉触发方法
        this.postData.page = 1
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
        this.postData.page = parseInt(this.postData.page) + 1
        this._getBetRecord()
      },
      isHaveMore (isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      },
      onGetStartTime (val) {
        this.postData.starttime = val
        this.postData.page = 1
        this._getBetRecord()
      },
      onGetEndtime (val) {
        this.postData.endtime = val
        this.postData.page = 1
        this._getBetRecord()
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

  @slideDown_height:0.76rem;

  .main{
    width:100%;
    height:@slideDown_height;
    /*padding-bottom:20px;*/
    background:#fff;
    border-bottom:1px solid #dddddd;
    overflow:hidden;
  }
  .slideDown-enter-active, .slideDown-leave-active {
    transition: .2s all linear;
    width:100%;
    height:@slideDown_height;
  }
  .slideDown-enter ,.slideDown-leave-active{
    width:100%;
    height:0;
  }
</style>
