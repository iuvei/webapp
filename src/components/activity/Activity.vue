<!--活动中心-->
<template>
  <div class="activity">
    <headTop headTitle="活动中心" goBack='true' contactServer="联系客服"></headTop>
    <div class="header_app" style="padding: 0 0.1rem;">
      <ul>
          <li v-tap="{ methods: _activity, item: item }" v-for="(item,index) in imgList" class="activity_content">
            <div class="border_tyy">
              <span class="center" style="font-size:20px;">Loading...</span>
              <x-img :src="serverUrl+item.center_image"  @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
            </div>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import { XImg } from 'vux'

  export default{
    data () {
      return {
        imgList: [],
        serverUrl: ''// 服务器路径
      }
    },
    components: {
      headTop,
      XImg
    },
    mounted () {
      this.imgList = this.$store.state.banner
      this._serverUrl()
    },
    methods: {
      _activity (params) {
        this.$router.push({path: '/activity/activityDetails',query: {activityId: params.item.activity_id}})
      },
      _serverUrl () {
        let flagImagUrl = this.$store.state.banner
        for (let i = 0; i < flagImagUrl.length; i++) {
          if (flagImagUrl[i].banner.indexOf('http') > -1) {
            this.serverUrl = ''
          } else {
            this.serverUrl = this.$store.state.server
          }
        }
      },
      success (src, ele) {
        const span = ele.parentNode.querySelector('span')
        ele.parentNode.removeChild(span)
      },
      error (src, ele, msg) {
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'loading...'
      }
    }
  }
</script>
<style lang="less" scoped>
  .activity{
    margin:40px auto; margin-bottom:2rem;

    .activity_content{
      background-color:#fff;
      text-align:center;
      margin-bottom:0.2rem;
      .default_hide{
        display:none;
        margin: 0 0.2rem;
      }
      .border_tyy{
        position:relative;
        img{
          width:100%;
        }
        .state{
          position: absolute;
          top: 0.2rem;
          right: 0.5rem;
          background:#FF0000;
          padding:0 0.2rem;
          text-align: center;
          border:1px solid #ccc;
          border-radius:0.05rem;
          color:#fff;
        }
      }
    }
  }

  .ximg-demo {
    width: 100%;
    height: auto;
  }
  .ximg-error {
    background-color: #fff;
  }
  .ximg-error:after {
    content: '加载失败';
    color: red;
  }

</style>
