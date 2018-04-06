<template>
    <div class="navbar">
        <ul class="navbar-list clear">
              <li v-tap="{ methods: _home}" :class=" this.$route.path.indexOf('home') !== -1? 'homeActive' : 'home'">
              <span class="font_size">购彩大厅</span>
              </li>
          <li v-tap="{ methods: _lotteryCentre}" :class=" this.$route.path.indexOf('lotteryCentre') !== -1? 'centerActive' : 'centers'">
                <span class="font_size">开奖中心</span>
          </li>
          <li v-tap="{ methods: _trend}" :class=" this.$route.path.indexOf('trend') !== -1? 'trendActive' : 'trend'">
              <span class="font_size">走势预测</span>
          </li>
          <li v-tap="{ methods: _userInfo}" :class=" this.$route.path.indexOf('userInfo') !== -1? 'userActive' : 'user'">
              <span class="font_size">我的恒彩</span>
          </li>
        </ul>
    </div>
</template>
<script>
  export default {
    methods: {
      _lotteryCentre () {
        this.$router.push('/lotteryCentre')
      },
      _userInfo () {
        this.$router.push('/userInfo')
      },
      _trend () {
        this.$router.push('/trend')
      },
      _home () {
        this.$router.push('/home')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .bs(@url,@size){
    background:url(@url) no-repeat center top;
    background-size: @size auto;
  }
  .navbar{
      position: fixed;
      z-index:499;
      bottom: 0;
      height:1.2rem;
      line-height: 1.2rem;
      width:100%;
      background:#fff;
      &:before{
        .border-1px(100%,solid,#c5c5c5);
      }
      .navbar-list{
        padding:0.15rem 0;
        li{
          float:left;
          width:25%;
          text-align: center;
          padding-top:0.1rem;
          span{
            display: inline-block;
            font-size: 0.24rem;
            -webkit-transform-origin-x: center;
            -webkit-transform: scale(0.90);
          }
          span.font_size{
            font-size:9.6px;
          }
        }

        .home{
          .bs('./img/home.png',0.48rem);
        }
        .homeActive{
          .bs('./img/homeActive.png',0.48rem);
          color:#c7202c;
        }
        .centers{
          .bs('./img/center.png',0.64rem);
        }
        .centerActive{
          .bs('./img/centerActive.png',0.64rem);
          color:@color_c7202c;
        }
        .trend{
          .bs('./img/trend.png',0.52rem);
        }
        .trendActive{
          .bs('./img/trendActive.png',0.52rem);
          color:@color_c7202c;
        }
        .user{
          .bs('./img/user.png',0.5rem);
        }
        .userActive{
          .bs('./img/userActive.png',0.5rem);
          color:@color_c7202c;
        }
      }

  }
</style>
