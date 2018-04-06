<!--团队管理-->
<template>
  <div>
    <headTop headTitle="团队管理">
      <img slot="goBacks" v-tap="{ methods:goBackUpdata }" style="width: 0.39rem;" src="../../header/goBack.png" class="goBacks">
    </headTop>
    <div class="header_app_v">
      <p class="username" v-text="this.$store.state.account"></p>
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div style="min-height:11rem;">
            <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
              <thead style="background:#fff;">
                <tr style=" height: 0.7rem;">
                  <th width="8%" class="whiteSpace">序号</th>
                  <th width="29%">用户名</th>
                  <th width="23%">用户类型</th>
                  <th width="23%">返点级别</th>
                  <th width="17%"></th>
                </tr>
              </thead>
              <tbody>
                <tr align="center" v-for="(item,index) in dataList">
                  <td class="whiteSpace">{{index+1}}</td>
                  <td class="ellipsis" v-tap="{ methods:_clickUserName , item : item }" v-text="item.username" :class="{underline: item.usertype === '1'}"></td>
                  <td v-text="item.groupname"></td>
                  <td>{{item.userpoint | filterRebate}}</td>
                  <td  v-tap="{ methods:checkDetail , item : item }" width="1.5rem">
                    <span  class="goDetail">查看</span>
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

  export default {
    components: {
      headTop,
      noDate
    },
    data () {
      return {
      	nodate: false,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        dataList: [],
        userid: undefined,
        postData: {
          p: 1,
          uid: ''
        },
        selfp: 0
      }
    },
    mounted () {
      this._getSecondaryAgent()
      this.$nextTick(function(){
        window.scroll(0, 0)
      })
    },
    methods: {
      // 获取团队管理
      _getSecondaryAgent (val) {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('TEAMMANAGEMENT')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          this.selfp = (res.data.selfp * 100).toFixed(1)
          if (this.postData.p !== 1) {
            if (this.dataList.length !== 0) {
              // 将数组插入
              for (let i = 0, users = res.data.users; i < users.length; i++) {
                this.dataList.push(users[i])
              }
            }
          } else {
            this.dataList = res.data.users
          }
          if (this.dataList.length == 0) {
            this.nodate = true
					} else {
            this.nodate = false
          }

          this.isHaveMore(res.data.users)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
        },this.postData)
      },
      // 查看详情
      checkDetail (params) {
        let agentDetail = params.item
        // 提交mutation到Store
        this.$store.commit('updateAgentDetail', agentDetail)
//        this.$router.push('/userInfo/TeamDetails')
        this.$router.push({path: '/userInfo/TeamDetails', query: {selfp: this.selfp}})
      },
      // 点击用户名
      _clickUserName (params) {
        let item = params.item
        if (item.usertype === '0') {
          return
        } else {
          this.postData.uid = ''
          this.postData.p = 1
          // 提交mutation到Store
          this.$store.commit('updateAgentUserid', item.userid)
          this._clickUserNameData(item)
        }
      },
      _clickUserNameData (item) {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let httpurl = this.httpUrl('TEAMMANAGEMENT') + '&uid=' + this.$store.state.userid
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.users.length === 0) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '此账号暂时还没有下级！'
            })
            return
          } else {
            this.isHaveMore(res.data.users)
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
            this.$router.push({path: '/userInfo/SecondaryAgent', query: {userid: item.userid}})
            this.dataList = res.data.users
          }
        },this.postData)
      },
      goBackUpdata () {
        this.$router.go(-1)
        this.postData.uid = this.$route.query.userid
        this._getSecondaryAgent()
      },

      loadTop () { // 组件提供的下拉触发方法
        this.postData.p = 1
        // 下拉加载
        if (this.$route.query.userid === undefined) {
          this.postData.uid = ''
          this._getSecondaryAgent()
        } else {
          this.postData.p = 1
          this._clickUserNameData()
        }
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom () {
          console.log(1)
        // 上拉加载
        this.more() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      more () {
        // 分页查询
        this.postData.p = parseInt(this.postData.p) + 1
        if (this.$route.query.userid == undefined) {
          this.postData.uid = ''
          this._getSecondaryAgent()
        } else {
          this._clickUserNameData()
        }
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
   top: 2.4rem;
 }
  .username{
    text-align: center;
    background: #444444;
    color: #fff;
    line-height: 0.64rem;
    height: 0.64rem;
  }
  .goDetail{
    display: inline-block;
    .wh(1rem,0.5rem);
    line-height: 0.51rem;
    .borderRadius(0.1rem);
  	border:1px solid #dddddd;
  }
  .underline{
    text-decoration:underline;
  }
</style>
