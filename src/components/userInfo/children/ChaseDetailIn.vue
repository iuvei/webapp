<!--追号详情-->
<template>
  <div>
    <headTop headTitle="追号详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail" id="detail" ref="idBox">
        <li v-for="(item,index) in getDetail" v-tap="{ methods:change_item, item: item }">
          <p class="icon" :class="{active: item.active && item.status == 0}"></p>
          <p class="detailTit" v-if="item.status != 1">{{item.issue}}期</p>
          <p class="detailTit" v-if="item.status == 1" style="color:grey;">{{item.issue}}期</p>
          <p class="detailTitM" v-if="item.status != 1">{{item.multiples}}倍</p>
          <p class="detailTitM" v-if="item.status == 1" style="color:grey;">{{item.multiples}}倍</p>
          <p class="detailStatus" v-if="item.status == 0" :status="2" style="color:green;">追号中</p>
          <p class="detailStatus" v-if="item.status == 1" :status="1" style="color:grey;">已完成</p>
          <p class="detailStatus" v-if="item.status == 2" :status="1" style="color:red;">已取消</p>
        </li>
      </ul>
      <p class="all">
        <span class="icon" :class="{active:isActive}" v-tap="{ methods:allChecked}"></span>
        <span class="allLeft">全选</span>
        <span class="allRight" :class="{forbid: isForbid}"  v-tap="{ methods:cancelTracing}" >终止追号</span>
      </p>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    data () {
      return {
        getDetail: [], // 追号详情列表
        isActive: false, // 全选
        isForbid: false,
        taskidArr: [], // 选中的记录
        getStatus: [] // 可追号
      }
    },
    watch: {
      getDetail: {
        deep: true,
        handler: function (val, oldVal) {
          let flag = true
          for (let j = 0; j < val.length; j++) {
            if (val[j].status == 0) {
              flag = false
              break
            }
          }
          if (flag) {
            this.isForbid = true
          } else {
            this.isForbid = false
          }
        }
      }
    },
    components: {
      headTop
    },
    computed: {
    },
    mounted () {
      this._selectForbid()
    },
    methods: {
      _selectForbid () {
        this.getDetail = this.$store.state.taskDetail
        let flag = false
        for (let j = 0; j < this.getDetail.length; j++) {
          if (this.getDetail[j].status == 0) {
            flag = true
            break
          }
        }
        if (flag) {
          this.isForbid = false
        } else {
          this.isForbid = true
          return
        }
      },
      change_item (params) {
        let item = params.item
        let flag = false
        if (item.status !== '0') {
          return
        }
        if (typeof item.active == 'undefined' || item.active == false) {
          this.$set(item, 'active', true)
        } else {
          item.active = !item.active
        }
        for (let i = 0; i < this.getDetail.length; i++) {
          if (this.getDetail[i].status == '0') {
            if (this.getDetail[i].active == false || this.getDetail[i].active == undefined) {
              flag = true
              break
            }
          }
        }
        if (flag) {
          this.isActive = false
        } else {
          this.isActive = true
        }
      },
      allChecked () {
        let getDetail = this.getDetail
        if (this.isActive == false) {
          for (let i = 0; i < getDetail.length; i++) {
            if (getDetail[i].status == '0') {
              this.$set(getDetail[i], 'active', true)
            }
          }
          this.isActive = true
        } else {
          for (let i = 0; i < getDetail.length; i++) {
            if (getDetail[i].status == '0') {
              this.$set(getDetail[i], 'active', false)
            }
          }
          this.isActive = false
        }
      },
      cancelTracing () {
        this._selectForbid()
        if (this.isForbid) {
          return
        }
        let getDetail = this.getDetail
        for (let i = 0; i < getDetail.length; i++) {
          if (getDetail[i].active == true) {
            this.taskidArr.push(getDetail[i])
          }
        }
        if (this.taskidArr.length === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请先选择要终止追号的期数'
          })
          return
        }
        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确认终止追号?',
          onCancel () {
            return
          },
          onConfirm () {
            let t = ''
            _this.taskidArr.forEach((item) => {
              t += item.entry + ','
            })
            let detail = t.substring(0, t.length - 1)
            let maps = {}
            maps['play_source'] = 5
            let httpurl = _this.httpUrl('CANCELTRACKING') + '&id=' + _this.$route.query.taskid + '&detail=' + detail
            _this.httpAction(httpurl,(res) => {
              if (res.data.status == 200) {
                _this._getChaseDetails()
              }
              _this.$vux.alert.show({
                title: '提示',
                content: res.data.msg,
                onHide () {
//                  _this.$router.replace({path: '/userInfo/betRecord'})
//                _this._getChaseDetails()
                }
              })
            },maps)
          }
        })
      },
      _getChaseDetails () {
        let httpurl = this.httpUrl('TRACKINGDETAIL') + '&id=' + this.$route.query.taskid
        this.httpAction(httpurl,(res) => {
          this.dataList = res.data
          // 提交mutation到Store
          this.$store.commit('updateTaskDetail', this.dataList.taskDetail)
          this._selectForbid()
        })
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

  .header_app_v{
    .detail{
      li{
        height: 0.7rem;
        line-height: 0.7rem;
        clear: both;
        background: #fff;

        border-bottom: 1px solid #dddddd;
        p{
          float: left;
          height:0.7rem;
        }
        .icon{
           width: 15%;
           background:url(../img/unchecked.png) no-repeat 0.28rem center;
           background-size:auto 50%;
        }
        .active{
           background:url(../img/checked.png) no-repeat 0.28rem center;
           background-size:auto 50%;
        }
        .detailTit{
          width: 40%;
          text-align:left;
          color: #323232;
        }
        .detailTitM{
          width: 20%;
          color: #6e6e6e;
          text-align:center
        }
        .detailStatus{
          width: 25%;
          text-align:center
        }

      }
    }
    .all{
      height:0.7rem;
      line-height:0.7rem;
      background:#fff;
      margin-top:0.3rem;
      span{
        display: block;
        float:left;
        height:0.7rem;
      }
      .icon{
        width: 15%;
        background:url(../img/unchecked.png) no-repeat 0.28rem center;
        background-size:auto 50%;
      }
      .active{
        background:url(../img/checked.png) no-repeat 0.28rem center;
        background-size:auto 50%;
      }
      .allLeft{
        width: 30%;
        text-align:left;
      }
      .allRight{
        height:0.5rem;
        line-height:0.5rem;
        width:22%;
        margin-top:0.1rem;
        margin-right: 0.4rem;
        float:right;
        background:#c7202a;
        color: #fff;
        text-align: center;
        border-radius: 4px;
      }
      .forbid{
        background:#ccc;
      }
    }

  }


</style>
