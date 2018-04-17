<!--开奖中心-->
<template>
    <div class="lotteryCenter">
      <load-more v-if="loading" tip="正在加载"></load-more>
      <headTop headTitle="开奖中心"></headTop>
      <div class="lottery_center header_app">
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore">
            <div>
              <ul class="lottery_list clear">
                <li v-for="item in arrList">
                  <p v-tap="{ methods:linkDetails, item: item }" class="border_ty clear">
                    <span style="display: inline-block;width: 2.52rem;">
                      <img style="width:0.52rem;vertical-align: middle;"  v-bind:src='item.imgurl' alt="" />
                      <span class="variety">{{item.name}}</span>
                      <div style="color:#a2a2a2;margin-left:0.7rem;position: absolute;margin-top:0.17rem;">第{{item.issue}}期({{item.date}})</div>
                    </span>
                      <!--奖号-->
                    <ul class="lotteryNumber clear">
                      <li v-for='val in item.code' v-text='val'></li>
                    </ul>
                  </p>
                </li>
              </ul>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import { LoadMore } from 'vux'

  export default{
    data () {
      return {
        loading: true,
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        arrList: [],
        topStatus: '',
        counter: 1, // 当前页
        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        scrollData: {
          noFlag: false // 暂无更多数据显示
        }
      }
    },
    components: {
      headTop,
      LoadMore
    },
    activated () {
      // 提交mutation到Store
      this.$store.commit('updateMethodid', null)
      if (this.$store.state.lotteryCenter!=0) {
        this.fetchData()
        // 提交mutation到Store
        this.$store.commit('updateLotteryCenter', 0)
      }
    },
    updated () {
      this.loading = false
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      loadTop () {
        // 下拉加载
        this.fetchData()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      linkDetails (params) {
        this.$store.commit('updateLotteryCentreId', params.item.id)
        this.$router.push({path: '/lotteryCentre/lotteryDetails'})
        // 提交mutation到Store
        this.$store.commit('getNav', params.item.nav)
        this.$store.commit('updateSelectLotteryName', params.item.name)
        this.$store.commit('updateSelectLotteryNameFlag', params.item.name)
      },
      // 获取数据
      fetchData () {
        let httpurl = this.httpUrl('HISPRIZE')
        this.httpAction(httpurl,(res) => {
          this.arrList = []
          let arrList = []
          let tempArray = res.data.issueNumbers
          for (let val in tempArray) {
            if (tempArray[val].length > 0) {
              let codes = tempArray[val][0]['code']
              if (codes.length > 5) {
                codes = codes.split(' ')
              } else {
                codes = codes.split('')
              }
              arrList.push({
                'id': val,
                'name': this.getnavName(val, 'cnname'),
                'code': codes,
                'issue': tempArray[val][0]['issue'],
                'date': tempArray[val][0]['wDate'],
                'imgurl': 'static/' + val + '.png',
                'nav': this.getnavName(val, 'nav')
              })
            }
          }
          let lotteryType = this.$store.state.lotteryType
          for (let j = 0; j < arrList.length; j++) {
            for (let i = 0; i < lotteryType.length; i++) {
              if (arrList[j].nav == lotteryType[i].nav) {
                this.arrList.push(arrList[j])
                break
              }
            }
          }
        })
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../static/hc.json')
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
      },
      // 获取彩种名称
      getnavName (param, flag) {
        let navName = ''
        let info = this.$store.state.lotteryType
        for (let i = 0; i < info.length; i++) {
          if (param == info[i]['lotteryid']) {
            if (flag === 'cnname') {
              navName = info[i]['cnname']
              break
            } else if (flag === 'nav') {
              navName = info[i]['nav']
              break
            }
          }
        }
        return navName
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .weui-loadmore{
    top: 1rem;
  }
  .lottery_center{
    margin:1rem 0 1.5rem;
  }
  .lottery_list>li{
    box-shadow: 0 5px 5px #e8e8e8;
  }
  .border_ty{
      position: relative;
      background:#fff;
      padding: 0.3rem 0.15rem 0.7rem 0.15rem;
      margin-bottom:0.2rem;
  }
  /*号码球的样式*/
  .lotteryNumber{
    display: inline-block;
    width:4rem;
    vertical-align: middle;
  }
  .lotteryNumber>li{
    float:left;
    width:0.59rem;
    height:0.59rem;
    line-height:0.61rem;
    text-align: center;
    font-size: 0.30rem;
    color:#fff;
    margin:0 0.2rem 0.1rem 0;
    background: #c7202c;
    border-radius:50%
  }
  .lotteryNumber:after{
      position: absolute;
      bottom:40%;
      right:5%;
      content:'';
      border:1px solid #ccc;
      border-bottom: 0;
      border-left: 0;
      width:0.2rem;
      height:0.2rem;
      transform:rotate(45deg);
      -webkit-transform:rotate(45deg);
  }
  .variety{
      font-size: 0.28rem;
      margin:0.1rem 0 0.2rem 0.1rem;
  }
  .variety>span{
      font-size: 13px;
      font-weight:normal;
  }

</style>

