<template>
  <div class="show-notice">
    <div class="notice-list" :style="{transform: 'translateY(-'+noticePosition+'rem) translateZ(0px)'}">
      <div v-tap="{ methods: _noticeDetails }" v-for="(notice,index) in notices">
        <p>{{notice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import rAF from '../../assets/js/rAF'
  export default {
    data () {
      return {
        noticePosition: 0, // 列表位置
        notices: []
      }
    },
    mounted () {
      this.getNotice()
      let destination = 0.53
      setInterval(() => {
        if (destination / 0.53 < this.notices.length) {
          this.move(destination, 500)
          destination += 0.53
        } else { // 列表到底
          this.noticePosition = 0 // 设置列表为开始位置
          destination = 0.53
          this.move(destination, 500)
          destination += 0.53
        }
      }, 3000)

    },
    methods: {
      _noticeDetails () {
        this.$router.push({path: '/notice/noticeDetails'})
      },

      //获得公告列表
      getNotice (){
          let httpurl = this.httpUrl('NOTICELIST');
          this.httpAction(httpurl,(res)=>{
              let resultChange=res.data.data.results;
              resultChange.forEach((ele,index)=>{
                  if(index<5){
                      this.notices.push(ele.subject);
                  }
              });
              //提交mutation到Store
              this.$store.commit('updateNotices', resultChange);
          })
      },
      move (destination, duration) { // 实现滚动动画
        let speed = ((destination - this.noticePosition) * 1000) / (duration * 60)
        let count = 0
        let step = () => {
          this.noticePosition += speed
          count++
          rAF(() => {
            if (this.noticePosition < destination) {
              step()
            } else {
              this.noticePosition = destination
            }
          })
        }
        step()
      },
      //获取url
      httpUrl(val){
        let app = require('../../../static/ios_hc.json')
        let appData = app
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
  @height_notice:0.53rem;
  .show-notice{
    display: inline-block;
    height:@height_notice;
    overflow: hidden;
    vertical-align: top;
    .notice-list p{
      height: @height_notice;
      line-height: @height_notice;
      width: 6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
