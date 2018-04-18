<template>
  <div class="welcome">
    <swiper :aspect-ratio="hei/wid" :show-dots="false">
      <swiper-item class="black"><img src="../../assets/images/one.jpg" width="100%"></swiper-item>
      <swiper-item class="black"><img src="../../assets/images/two.jpg" width="100%"></swiper-item>
      <swiper-item class="black"><img src="../../assets/images/three.jpg" width="100%"></swiper-item>
      <swiper-item class="black">
        <img src="../../assets/images/four.jpg" width="100%">
        <p v-tap="{ methods:_login }" class="goButton">
          <img src="../../assets/images/goButton.png">
        </p>
      </swiper-item>
    </swiper>
  </div>
</template>
<style lang="less" scoped>

  .vux-slider {
    z-index: 9999;
    background: #fff;
    overflow: hidden;
  }

  .goButton {
    width: 36%;
    position: absolute;
    left: 32%;
    bottom: 8%;
  }

  .goButton img {
    width: 100%;
  }

  .vux-indicator {
    display: none;
  }

  /*.vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{*/
  /*width: 100%!important;*/
  /*text-align: center!important;*/
  /*right: 0!important;*/
  /*bottom: 1rem!important;*/
  /*}*/
  /*.vux-slider > .vux-indicator > a, .vux-slider .vux-indicator-right > a{*/
  /*float: none!important;*/
  /*}*/
  /*.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{*/
  /*background: #c22225!important;*/
  /*width: 0.24rem!important;*/
  /*height: 0.24rem!important;*/
  /*border-radius: 50%;*/
  /*}*/
  /*.vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot{*/
  /*background: #676763!important;*/
  /*width: 0.24rem!important;*/
  /*height: 0.24rem!important;*/
  /*border-radius: 50%!important;*/
  /*}*/
</style>
<script>
  import {Swiper, SwiperItem} from 'vux'

  let h = document.documentElement.clientHeight
  let w = document.documentElement.clientWidth
  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        hei: h,
        wid: w
      }
    },
    methods: {
      _login() {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
