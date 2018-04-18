<template>
    <div class="swipe">
      <swiper loop auto :list="list" :index="index"  dots-position="center">
      </swiper>
    </div>
</template>
<script>
  import { Swiper } from 'vux'

  export default {
    components: {
      Swiper
    },
    data () {
      return {
        list: [], // benner图
        index: 0,
        childImg: [], // 子组件图片路径
        detailsImg: [] // 详情页图片路径
      }
    },
    mounted () {
      this._banner()
    },
    methods: {
      // banner
      _banner () {
        let httpurl = this.httpUrl('BANNERS')
        this.httpAction(httpurl,(res) => {
          let banner = res.data.data.results
          let tempFlag = true
          banner.forEach((item,index) => {
          	 if(item.banner == null){
          	 	tempFlag = false
          	 }
          })
          if(!tempFlag){
          	return
          }
          this.list = banner.map((item, index) => ({
            url: '/activity',
            img: (item.banner.indexOf('http') > -1 ? item.banner : (this.$store.state.server + item.banner))+'?ver='+new Date().getTime()
          }))
          // 提交mutation到Store
          this.$store.commit('updateChildImg', banner)
        })
      },
    }
  }
</script>
<style lang="less" scoped>

  .swipe{
    z-index: 2;
  }
  .vux-swiper{
    height:3.74rem !important;
  }
  .copyright {
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .black {
    background-color: #000;
  }
  .title{
    line-height: 100px;
    text-align: center;
    color: #fff;
  }
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .vux-indicator.custom-bottom {
    bottom: 30px;
  }
  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
  .swiper-demo-img img {
    width: 100%;
  }
</style>
