<!--更多奖期-->
<template>
    <div>
      <load-more v-if="loading" tip="正在加载"></load-more>
      <headTop headTitle="开奖详情" goBack='true' contactMethod="试试手气"></headTop>
        <div class="details">
          <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
              <ul>
                  <li class="details_result" v-for="(item,index) in itemArr">
                    <div>
                      <div class="variety">
                        <span style="color:#8e8e8e;font-size: 0.26rem;">第{{item.issue}}期</span>
                        <span  :class="{'Lottery_state':item.history.length != 0}">{{item.status}}</span>
                      </div>
                      <!--奖号-->
                      <ul class="lotteryNumber clear">
                        <li v-for="itemval in item.code" v-text="itemval"></li>
                      </ul>
                      <!--右边图标-->
                      <span v-show="item.history.length != 0" class="icon_down"  v-tap="{ methods:detailsInfo, item: item, index: index }"></span>
                    </div>
                    <!--详情-->
                    <transition name="slideDown">
                      <section v-show="item.checked" class="slideDown_section">
                        <table class="table_hook"  border="0" cellspacing="0" cellpadding="3"  width="100%">
                            <thead align="center" style="background:#DCDCDC;">
                                <tr>
                                    <th width="25%">所投玩法</th>
                                    <th width="25%">投注内容</th>
                                    <th width="25%">投注金额</th>
                                    <th width="25%">奖金</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                <tr v-if="index<2" v-for="(itemChild,index) in item.history">
                                    <td>{{itemChild.methodname}}</td>
                                    <td>
                                      <p class="ellipsis" style="width:1.2rem;">{{itemChild.code}}</p>
                                    </td>
                                    <td>{{itemChild.totalprice}}</td>
                                    <td>{{itemChild.bonus}}</td>
                                </tr>
                            </tbody>
                        </table>
                         <p v-tap="{ methods: _lotteryMore, item: item }" class="more">查看更多</p>
                      </section>
                    </transition>
                  </li>
              </ul>
            </mt-loadmore>
          </div>
        </div>
    </div>

</template>
<script>
  import headTop from '../header/Header.vue'
  import { LoadMore } from 'vux'

  export default {
    data () {
      return {
        loading: true,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        itemArr: [],
        postData: {
          page: 1,
          lotteryId: this.$store.state.LotteryCentreId,
          pagesize: 20
        }
      }
    },
    mounted () {
      this.getDetails()
    },
    updated () {
      this.loading = false
    },
    methods: {
      _lotteryMore (params) {
        this.$router.push({path: '/lotteryCentre/lotteryDetails/lotteryMore'})
        this.$store.commit('lotteryMore', params.item.history)
      },
      getDetails () {
        let httpurl = this.httpUrl("NUMBERDETAIL")
        this.httpAction(httpurl,(res) => {
          let tempdata = res.data.issueList || []
          for (let i in tempdata) {
            tempdata[i]['status'] = this.getText(tempdata[i]['status'])
            if(tempdata[i]['code'].length > 5){
              tempdata[i]['code'] = tempdata[i]['code'].split(" ")
            }else{
              tempdata[i]['code'] = tempdata[i]['code'].split("")
            }
          }
          if (this.postData.page !== 1) {
            if (this.itemArr.length !== 0) {
              // 将数组插入
              for (let i = 0; i < tempdata.length; i++) {
                this.itemArr.push(tempdata[i])
              }
            }
          } else {
            this.itemArr = tempdata
          }
          this.isHaveMore(tempdata)
        },this.postData)
      },
      detailsInfo (params) {
        let item = params.item
        let index = params.index
        let icon_down = document.getElementsByClassName('icon_down')[index]
        if (typeof item.checked == 'undefined' || item.checked == false) {
          this.$set(item, 'checked', true)
          icon_down.style.transform = 'rotate(-180deg)'
        } else {
          item.checked = !item.checked
          icon_down.style.transform = 'rotate(0)'
        }
      },
      // 根据开奖状态返回对应信息
      getText (param) {
      	let flag  = typeof param == 'object' ? true : false
      	let index
      	if(flag){
      		for(let obj in param){
      			index = parseInt(param[obj])
      		}
      	}else{
      		index = parseInt(param)
      	}
        let textval = '';
        switch(index){
          case 0 :
            textval= '未开奖';
          break;
          case 1 :
            textval= '未中奖';
          break;
          case 2 :
            textval= '已中奖';
          break;
        }
        return textval;
      },

      loadTop () { // 组件提供的下拉触发方法
        this.postData.page = 1
        // 下拉加载
        this.getDetails()
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
        this.getDetails()
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
        let app = require('../../../static/ios_hc.json')
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
    },
    components: {
      headTop,
      LoadMore
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .weui-loadmore{
    top: 1rem;
  }
  @slideDown_height:1.64rem;
  .slideDown_section{
    width:100%;
    /*height:@slideDown_height;*/
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
  /*号码球的样式*/
  .lotteryNumber{
    display: inline-block;
    width:5rem;
    vertical-align: middle;
  }
  .lotteryNumber>li{
    float:left;
    width:0.75rem;
    height:0.75rem;
    line-height:0.77rem;
    text-align: center;
    font-size: 0.38rem;
    color:#fff;
    margin:0 0.2rem 0.1rem 0;
    background: #d51623;
    border-radius:50%
  }

  .details{
    margin-top:1rem;
  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .details_result{
    position:relative;
    background:#fff;
    margin:0.2rem 0;
    padding:0.2rem;
  }
  .variety{
    margin-bottom: 0.17rem;
  }
  .icon_down{
    position:absolute;
    top:0.5rem;
    right:0;
    display: inline-block;
    padding:0.6rem;
    &:after{
      .icon_arrows(0.4rem, 0.4rem, #aaa, 0.2rem, 135deg)
    }
  }
  .Lottery_state{
    background:#37B515;
    color: #fff;
    font-weight: bold;
    font-size: 9px;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 0.05rem;
    padding: 1px 0.1rem;
  }
  .more{
  	display: block;
  	width: 100%;
  	text-align: center;
  	text-decoration: underline;
  }
</style>
