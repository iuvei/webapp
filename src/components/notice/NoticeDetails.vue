<template>
	<div>
    <load-more v-if="loading" tip="正在加载"></load-more>
		<headTop headTitle="公告中心" goBack='true' contactServer="联系客服"></headTop>
    <div class="header_app_v">
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div style="min-height:11rem;">
            <ul class="notice_list">
                <li v-tap="{ methods:_notiDetail , item : item }" v-for="(item,index) in bottomCount">
                <div class="clear">
                  <p class="messTit left" :class="[{redPoint:item.unread_id == 1}]">{{item.subject}}</p>
                  <p class="right"  ref='li'>{{item.sendtime}}</p>
                </div>
                </li>
            </ul>
            <noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import noDate from '../nodata/noDate.vue'
  import { LoadMore } from 'vux'

  export default{
    components: {
      headTop,
      noDate,
      LoadMore
    },
    data () {
      return {
        loading: true,
      	nodate: false,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        onFetching: false,
        bottomCount: [],
        postData: {
        page: 1
        }
      }
    },
    updated () {
      this.loading = false
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('updateNotiveDetails', true)
      let position = window.scrollY
      this.$store.commit('SAVE_POSITION', position)
      next(true)
    },
    activated () {
      if (this.$store.state.notiveDetails) {
        this.getAllDetail()
      }
      this.$nextTick(function(){
        let position = this.$store.state.position
        window.scroll(0, position)
      })
    },
    mounted () {
      this.getAllDetail()
    },
    methods: {
      _notiDetail (params) {
        this.$set(params.item, 'unread_id', 0)
        this.$router.push({path: '/notice/notiDetail', query: {data: params.item}})
        this.$store.commit('updateNotiveDetails', false)
      },
      getAllDetail () {
    		let httpurl = this.httpUrl('NOTICELIST')
        	this.httpAction(httpurl,(res) => {
		          let tempData = res.data
		          if (tempData.status == 200) {
		            if (tempData.data.results.length < 20) {
		              this.allLoaded = true
		            } else {
		              if (this.postData.page !== 1) {
		                if (this.bottomCount.length !== 0) {
		                  // 将数组插入
		                  for (let i = 0, results = tempData.data.results; i < results.length; i++) {
		                    this.bottomCount.push(results[i])
		                  }
		                }
		              } else {
		                this.bottomCount = tempData.data.results
		              }
		              // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
		              this.isHaveMore(tempData.data.results)
		              this.$nextTick(function () {
		                this.scrollMode = 'touch'
		              })
		            }
		            if(this.bottomCount.length == 0){
		          		this.nodate = true
		          	} else {
                  this.nodate = false
                }
		          } else {
		            this.$vux.alert.show({
		              title: '提示',
		              content: tempData.msg
		            })
		          }
        },this.postData)
    	},
      loadTop () { // 组件提供的下拉触发方法
        this.postData.page = 1
        // 下拉加载
        this.getAllDetail()
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
        this.getAllDetail()
      },
      isHaveMore (isHaveMore) {
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
  @import '../../assets/css/style';

  br{
    height:0;
    font-size:0;
  }
  .notice_list{
    background:#fff;
    padding:0 0.3rem;
    /*overflow: hidden;*/
    li{
      .hl(1rem);
      &:after{
        .border-1px(100%,solid,#aaa)
      }
      .messTit{
        /*display: inline-block;*/
        color:#4a4a4a;
        font-size: 0.26rem;
        padding-left: 0.2rem;
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .redPoint{
        background:url(img/redpoint.png) no-repeat center left;
        background-size:auto 16%
      }
    }
  }
  .weui-loadmore {
    top: 1rem;
  }
</style>
