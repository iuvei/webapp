<template>
  <div>
    <headTop headTitle="团队管理" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="teamBox">
        <li>
          <p class="teamTit">用户名</p>
          <p class="teamcontent" v-text="agentDetail.username"></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">注册时间</p>
          <p class="teamcontent" v-text="agentDetail.registertime"></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">返点级别</p>
          <p class="teamcontent">{{teamcontent}}</p>
          <p class="teamr upBtn" v-tap="{ methods: clickteamcontent }" v-if="isupBtn">
            <span>提升返点</span>
          </p>
          <br class="clear">
          <div class="upfandian" v-show="isshow">
                <form @submit.prevent="submit">
                  <div class="clear">
                    <p>自身保留返点</p>
                    <p>
                      <input type="text" name="keeppoint" v-model="keeppoint" placeholder="自身最少保留0.1">
                    </p>
                    <p class="settingfandian">
                      <input  type="submit" value="一键设置" readonly style="background: transparent;color:#fff;text-indent:0;">
                    </p>
                    <input type="hidden" name="flag" value="rapid">
                    <input type="hidden" name='uid' v-model="postData.uid">
                    <div v-for="items in AllLotterys">
                      <input type="hidden" name='lottery' v-model="items.setted.lotteryid">

                      <input type="hidden" :name='items.namepg' v-model="items.setted.userpgid">

                      <input type="hidden" :name='items.namemin_point' v-model="items.setted.min">
                      <input type="hidden" :name='items.namemax_point' v-model="items.setted.max">
                      <input type="hidden" :name='items.namepoint' v-model="items.allFD">

                      <input type="hidden" :name='items.namemin_indefinite_point' v-model="items.setted.minIndefinite">
                      <input type="hidden" :name='items.namemax_indefinite_point' v-model="items.setted.maxIndefinite">
                      <input type="hidden" :name='items.nameindefinite_point' v-model="items.bddFD">
                    </div>
                  </div>
                  <div class="tips right">
                    自身返点至少保留<span>0.1</span><span v-text="parseFloat(maxPoint)<= 0 ? '，当前已无法提升返点': ('，最高为您当前返点'+maxPoint)"></span>
                  </div>
                </form>
              </div>
        </li>
        <li>
          <p class="teamTit">账户余额</p>
          <p class="teamcontent">{{agentDetail.availablebalance | tofixed('')}}</p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">最后一次登录</p>
          <p class="teamcontent" v-text="agentDetail.lasttime=='1970-01-01 00:00:00'? '您还是第一次登录哦': agentDetail.lasttime "></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">配额设定</p>
          <p class="teamcontent"></p>
          <p class="teamr pereBtn" v-tap="{ methods: _show }" v-if="useraccnum.length!==0">
          </p>
          <br class="clear">
          <transition name="fade">
            <form @submit.prevent="submits">
              <input type="hidden" name='flag' value="edit">
              <input type="hidden" name='uid' v-model="postData.uid">
              <ul class="quotaSetting" v-if="show">
                <li class="clear" v-for="(item,index) in useraccnum" v-if="item.accnum != 0">
                  <div class="left">
                    <span>
                      <span>{{item.low | filterRebate}}~</span><span>{{item.high | filterRebate}}</span>区间返点区间配额为<input class="accnum accnum_hook" type="text" name="accnum" @blur="_blurAccnum(item.accnum,index)">
                    </span>
                  <input type="hidden" name='accgroup' v-model="item.agid">
                  </div>
                  <div class="left">(当前可用{{item.accnum}}个)</div>
                </li>
                <div class="settingpeie">
                  <input name="submit" type="submit" value="提交" style="background: transparent;color:#fff;width:2rem;height:0.6rem;">
                </div>
              </ul>
            </form>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    components: {
      headTop
    },
    data () {
      return {
        teamcontent: (this.$store.state.agentDetail.userpoint * 100).toFixed(1),
        keeppoint: 0.1,
        show: false,
        isshow: false,
        agentDetail: this.$store.state.agentDetail,
        maxPoint: (this.$route.query.selfp - this.$store.state.agentDetail.userpoint * 100 - 0.1).toFixed(1), // 最高返点
        useraccnum: [], // 配额设定列表
        setAccnum: 0, // 配额个数
        postData: {
          uid: this.$store.state.agentDetail.userid
        },
        lotterys: [], // 计算列表
        AllLotterys: [],
        AllLotterysflag: [],
        isupBtn: false
      }
    },
    watch: {
      keeppoint: {
        deep: true,
        handler: function (val, oldVal) {
          if (this.keeppoint.indexOf('.') > -1) {
            this.keeppoint = this.keeppoint.split('.')[0] + '.' + this.keeppoint.split('.')[1].substring(0, 1)
          }
          this._getInputData()
        }
      }
    },
    mounted () {
      this._getUpedituser()
      this._getUseraccnum()
    },
    methods: {
      _show () {
        this.show = !this.show
      },
      clickteamcontent () {
        this.isshow = !this.isshow
      },
      // 一键设置
      submit (e) {
        let formData = this.formser(e.target)
        formData.lottery = formData.lottery.split(',')

        if (parseFloat(this.keeppoint) < 0.1 || this.keeppoint == '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '自身返点不能小于0.1'
          })
          this.keeppoint = 0.1
          return
        } else if (parseFloat(this.keeppoint) > parseFloat(this.maxPoint)) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '不能大于您的最高当前返点'
          })
          this.keeppoint = (parseFloat(this.maxPoint)).toFixed(1)
          return
        } else {
          this.keeppoint = parseFloat(this.keeppoint).toFixed(1)
        }
        this._getInputData()

        let httpurl = this.httpUrl('UPEDITUSER')
        this.httpAction(httpurl,(res) => {
          if (res.data.status == 200) {
            this.teamcontent = (this.$route.query.selfp - this.keeppoint).toFixed(1)
            this.maxPoint = (this.$route.query.selfp - this.teamcontent - 0.1).toFixed(1)
          }
          this.$vux.alert.show({
            title: '温馨提示',
            content: res.data.msg
          })
        },formData)
      },
      // 配额设定
      submits (e) {
        let accnumHook = document.getElementsByClassName('accnum_hook')
        let flag = true
        for (let i = 0; i < accnumHook.length; i++) {
          if (accnumHook[i].value !== '') {
            flag = false
            break
          }
        }
        if (flag) {
          this.$vux.alert.show({
            title: '提示',
            content: '请设定配额'
          })
          return
        }
        let formDatas = this.formser(e.target)
        formDatas.accnum = formDatas.accnum.split(',')
        formDatas.accgroup = formDatas.accgroup.split(',')
        let httpurl = this.httpUrl('USERACCNUM')
        this.httpAction(httpurl,(res) => {
          this.$vux.alert.show({
            title: '提示',
            content: res.data.msg
          })
        },formDatas)
      },
      // 配额设定
      _blurAccnum (val, index) {
        let accnumHook = document.getElementsByClassName('accnum_hook')[index - 2].value
        accnumHook = parseFloat(accnumHook)
        let reg = /^0$|^\+?[1-9]\d*$/
        let r = reg.test(accnumHook)
        if (!r) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正整数'
          })
          document.getElementsByClassName('accnum_hook')[index - 2].value = ''
          return
        }
        if (accnumHook < 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入大于0的正整数'
          })
          document.getElementsByClassName('accnum_hook')[index - 2].value = ''
          return
        } else if (accnumHook > val) {
          this.$vux.alert.show({
            title: '提示',
            content: '不能超过当前可用配额，请重新输入'
          })
          document.getElementsByClassName('accnum_hook')[index - 2].value = ''
          return
        } else if (accnumHook < 1) {
          this.$vux.alert.show({
            title: '提示',
            content: '当前配额设定不能等于0，请重新输入'
          })
          document.getElementsByClassName('accnum_hook')[index - 2].value = ''
          return
        }
      },
      _blurKeeppoint () {
        if (parseFloat(this.keeppoint) < 0.1 || this.keeppoint == '') {
//          this.$vux.alert.show({
//            title: '温馨提示',
//            content: '自身返点不能小于0.1'
//          })
          this.keeppoint = 0.1
          return
        } else if (parseFloat(this.keeppoint) > parseFloat(this.maxPoint)) {
//          this.$vux.alert.show({
//            title: '温馨提示',
//            content: '不能大于您的最高当前返点'
//          })
          this.keeppoint = (parseFloat(this.maxPoint)).toFixed(1)
        } else {
          this.keeppoint = parseFloat(this.keeppoint).toFixed(1)
        }
        this._getInputData()
      },
      // 请求提升返点
      _getUpedituser () {
        let httpurl = this.httpUrl('UPEDITUSER')
        this.httpAction(httpurl,(res) => {
          if (res.data.lotterys == undefined) {
            this.isupBtn = false
            this.$vux.alert.show({
              title: '温馨提示',
              content: '正在注册中，请稍后再试！'
            })
            return
          } else {
            this.isupBtn = true
            this.lotterys = res.data.lotterys
            this._getInputData()
          }
        },this.postData)
      },
      _getInputData () {
        let TempAllLotterys = this.lotterys
        let flag = []
        for (let i = 0; i < TempAllLotterys.length; i++) {
          if (TempAllLotterys[i].setted == null) {
            continue
          }
          if (TempAllLotterys[i].setted.maxIndefinite < 0) {
            TempAllLotterys[i].setted.maxIndefinite = 0.1
          }
          if (TempAllLotterys[i].setted.max < 0) {
            TempAllLotterys[i].allFD = 0
          } else {
//            TempAllLotterys[i].allFD = parseFloat((TempAllLotterys[i].setted.point * 100 - this.keeppoint).toFixed(1))
            TempAllLotterys[i].allFD = parseFloat((this.$route.query.selfp - this.keeppoint).toFixed(1))

          }
          TempAllLotterys[i].bddFD = parseFloat((TempAllLotterys[i].setted.maxIndefinite - this.keeppoint).toFixed(1))
          if (TempAllLotterys[i].allFD < 0) {
            TempAllLotterys[i].allFD = 0
          }
          if (TempAllLotterys[i].bddFD < 0) {
            TempAllLotterys[i].bddFD = 0
          }
          TempAllLotterys[i].lottery = [TempAllLotterys[i].setted.lotteryid]
          TempAllLotterys[i].namepg = 'pg_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].namemin_point = 'min_point_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].namemax_point = 'max_point_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].namepoint = 'point_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].namemin_indefinite_point = 'min_indefinite_point_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].namemax_indefinite_point = 'max_indefinite_point_' + TempAllLotterys[i].setted.lotteryid
          TempAllLotterys[i].nameindefinite_point = 'indefinite_point_' + TempAllLotterys[i].setted.lotteryid
          flag.push(TempAllLotterys[i])
        }
        this.AllLotterys = flag
      },
      formser (form) {
        let arr = {}
        for (let i = 0; i < form.elements.length; i++) {
          let feled = form.elements[i]
          switch (feled.type) {
            case undefined:
            case 'button':
            case 'file':
            case 'reset':
            case 'submit':
              break
            case 'checkbox':
            case 'radio':
              if (!feled.checked) {
                break
              }
            default:
              if (arr[feled.name] || arr[feled.name] == '') {
                arr[feled.name] = arr[feled.name] + ',' + feled.value
              } else {
                arr[feled.name] = feled.value
              }
          }
        }
        return arr
      },
      // 请求用户配额
      _getUseraccnum () {
        let httpurl = this.httpUrl('USERACCNUM')
        this.httpAction(httpurl,(res) => {
          if (res.data.status == 990) {
            this.useraccnum = []
          } else {
            this.useraccnum = res.data.aAllUserTypeAccNum
          }
        })
      }
    }
  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

   @media screen and (max-width: 330px) {
     .quotaSetting{
       padding:0 0 2rem 0 !important;
     }
   }
  .topPadding{
    height:0.88rem;
  }
  .tips{
    color:#FD004C;
    margin-right:0.6rem;
  }
    .teamBox>li{
      width:100%;
      line-height:0.7rem;
      border-bottom:1px solid #dddddd;
    }
    .teamBox>li>p{
      float: left;
      line-height: 0.7rem;
      height:0.7rem;
      font-size: 0.28rem;
    }
    .upBtn>span{
      position: relative;
      float:left;
      display: inline-block;
      height:0.7rem;
      line-height:0.71rem;
      width:1.5rem;
      color: #f00;
      &:after{
        .icon_arrows(0.17rem,0,#aaa,0.18rem,135deg)
      }
    }
    .pereBtn{
      position: relative;
      float:left;
      display: inline-block;
      height:0.7rem;
      line-height:0.7rem;
      color: #f00;
      &:after{
        .icon_arrows(0.17rem,0,#aaa,0.18rem,135deg)
      }
    }
    .upfandian{
      box-sizing: border-box;
      width:100%;
      height:1.7rem;
      background: #444444;
      padding: 0.3rem;
      p:nth-child(1){
        width: 78px;
      }
      p:nth-child(2){
        width: 41%;
        margin-right: 10px;
      }
      p:nth-child(3){
        width: 20%;
      }
      p{
        float: left;
        line-height:0.54rem;
        color: #fff;
        input{
          line-height: 0.54rem;
          width: 100%;
          border-radius: 3px;
          background:#fff;
          text-indent:4px;
        }
      }
      .settingfandian{
        padding:0 0.25rem;
        background:#c7202a;
        border-radius: 0.06rem;
      }
    }
    .quotaSetting{
      box-sizing: border-box;
      padding: 0.2rem 0.2rem 2rem 0.2rem;
      width: 100%;
      background: #444444;
      color:#fff;
      .cl;
      input{
        box-sizing: border-box;
        background:#fff;
        border-radius:3px;
        width:1.3rem;
        height: 0.54rem;
        line-height:0.54rem;
        padding:0 0.1rem;
        margin:0 0.1rem;
      }
      .settingpeie{
        .borderRadius(0.08rem);
        background:#c7202a;
        margin-top: 0.4rem;
        .cl
      }
    }
    .teamTit{
      width:30%;
      text-indent: 0.32rem;
    }
    .teamcontent{
      width:47%
    }
    .teamr{
      width:20%
    }
  </style>
