<!--追号详情-->
<template>
  <div>
    <load-more v-if="loading" tip="正在加载"></load-more>
    <headTop headTitle="追号详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail clear">
        <li>
          <p class="detailTit">追号编号</p>
          <p class="detailTitR" v-text="dataList.taskid"></p>
        </li>
        <li>
          <p class="detailTit">追号时间</p>
          <p class="detailTitR" v-text="dataList.begintime"></p>
        </li>
        <li>
          <p class="detailTit">游戏</p>
          <p class="detailTitR" v-text="dataList.cnname"></p>
        </li>
        <li>
          <p class="detailTit">玩法</p>
          <p class="detailTitR" v-text="dataList.methodname"></p>
        </li>
        <li>
          <p class="detailTit">模式</p>
          <p class="detailTitR" v-text="dataList.modes"></p>
        </li>
        <li>
          <p class="detailTit">追号内容</p>
          <p class="detailTitR" v-text="dataList.codes"></p>
        </li>
        <li>
          <p class="detailTit">开始期号</p>
          <p class="detailTitR" v-text="dataList.beginissue"></p>
        </li>
        <li>
          <p class="detailTit">追号总金额</p>
          <p class="detailTitR red">{{dataList.taskprice}}元</p>
        </li>
        <li>
          <p class="detailTit">完成金额</p>
          <p class="detailTitR">{{dataList.finishprice}}元</p>
        </li>
        <li>
          <p class="detailTit">取消金额</p>
          <p class="detailTitR">{{dataList.cancelprice}}元</p>
        </li>
        <li>
          <p class="detailTit">中奖后终止</p>
          <p class="detailTitR">
            <span v-if="dataList.stoponwin == '1'">是</span>
            <span v-else>否</span>
          </p>
        </li>
        <li>
          <p class="detailTit">状态</p>
          <p class="detailTitR">
            <span v-if="dataList.status == 0" style="color:green;">进行中</span>
            <span v-if="dataList.status == 1" style="color:red;">已取消</span>
            <span v-if="dataList.status == 2" style="color: grey;">已完成</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="checkInfo" v-tap="{ methods: _chaseDetailIn }">
      <p class="seechase">查看追号信息</p>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'
  import { LoadMore } from 'vux'

  export default {
    data () {
      return {
        dataList: {},
        loading: true
      }
    },
    components: {
      headTop,
      LoadMore
    },
    updated () {
      this.loading = false
    },
    mounted () {
      this._getChaseDetails()
    },
    methods: {
      _chaseDetailIn () {
        this.$router.push({path: '/userInfo/chaseDetailIn', query: {taskid: this.$route.query.taskid}})
      },
      _getChaseDetails () {
        let httpurl = this.httpUrl('TRACKINGDETAIL') + '&id=' + this.$route.query.taskid
        this.httpAction(httpurl,(res) => {
          this.dataList = res.data
          // 提交mutation到Store
          this.$store.commit('updateTaskDetail', this.dataList.taskDetail)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .header_app_v{
    .detail{
      background: #fff;
      li{
        position: relative;
        clear: both;
        background: #fff;
        &:before{
          .border-1px(100%,solid,#dddddd);
        }
        p{
          float: left;
          margin: 0.17rem 0;
        }
        .detailTit{
          width: 25%;
          text-indent:0.28rem;
          color: #323232;
        }
        .detailTitR{
          width: 75%;
          color: #6e6e6e;
          word-wrap:break-word;
          margin: 0.17rem 0;
        }
        .red{
          color:#ec0b0b
        }
      }
    }
  }
  .checkInfo{
    margin-top: 1rem;
  }
  .seechase{
    background:#c7202a;
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    text-align: center;
    width: 94%;
    margin-left: 3%;
    border-radius: 4px;
    margin-top:0.3rem;
  }
  .weui-loadmore {
    top: 1rem;
  }

</style>
