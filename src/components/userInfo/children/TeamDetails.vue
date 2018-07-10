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
          <p class="teamTit">用户类型</p>
          <p class="teamcontent" v-text="agentDetail.groupname"></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">团队人数</p>
          <p class="teamcontent" v-text="agentDetail.team_count + '人'"></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">注册时间</p>
          <p class="teamcontent" v-text="agentDetail.register_time"></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">奖金组</p>
          <p class="teamcontent" v-text="agentDetail.prize_group"></p>
          <div class="updateBtn" v-tap="{methods: _showPrizeGroup}">修改</div>
          <br class="clear">
          <div class="prize_group_content" v-if="showPrizeGroup">
            <ul class="fandian clear">
              <li>自身返点：{{selfPoint * 100}}%</li>
              <li>用户返点：{{userKeeppoint}}%</li>
              <li>保留返点：{{(selfPoint * 100 - userKeeppoint).toFixed(1)}}%</li>
            </ul>
            <p class="prize_group_text">设置奖金组：{{prizeGroup}}</p>
            <div class="range_content">
              <range v-model="prizeGroup"
                     :step="2"
                     :min="prizeGroupList.length !== 0 ? parseInt(prizeGroupList[0].prizeGroup) : 1800"
                     :max="prizeGroupList.length !== 0 ? parseInt(prizeGroupList[prizeGroupList.length - 1].prizeGroup) : 1956"
                     @on-change="_onChangeKeepPoint"
              >
              </range>
            </div>
            <div class="set_proup_btn">
              <flexbox>
                <flexbox-item>
                  <x-button type="warn" v-tap="{methods: _setPrizeGroup}">确定</x-button>
                </flexbox-item>
                <flexbox-item>
                  <x-button type="default" v-tap="{methods: _cancelSet}">取消</x-button>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </li>
        <li>
          <p class="teamTit">个人余额</p>
          <p class="teamcontent textColor">{{agentDetail.private_money | tofixed('')}} 元</p>
          <div class="updateBtn" v-tap="{ methods: onRecharge }">充值</div>
          <br class="clear">
          <div v-transfer-dom>
            <x-dialog v-model="showRecharge" class="dialog-demo">
              <div class="img-box">
                <div class="recharge_content">
                  <span class="r_title">下级充值</span>
                  <icon class="r_close" type="cancel" v-tap="{methods: _rechargeClose}"></icon>
                </div>
              </div>
              <ul class="recharge_list">
                <li>
                  <span>用户账号：</span>
                  <span>{{agentDetail.username}}</span>
                </li>
                <li>
                  <span>您的余额：</span>
                  <span class="text_color">{{recharge.balance}} 元</span>
                </li>
                <li>
                  <div class="clear">
                    <span class="rechage_text">充值金额：</span>
                    <x-input class="recharge_input"
                             type="number"
                             placeholder="输入充值金额"
                             :show-clear="false"
                             v-model="rechargeMoney"
                    >
                    </x-input>
                    <span class="rechage_text">元</span>
                  </div>
                  <p class="money_hint">
                    最低金额
                    <strong class="text_color">{{recharge.recharge_min}}</strong>
                    元，最高
                    <strong class="text_color">{{recharge.recharge_max}}</strong>
                    元的整数
                  </p>
                </li>
                <li class="clear">
                  <span class="rechage_text">资金密码：</span>
                  <x-input class="fund_input"
                           type="password"
                           placeholder="输入资金密码"
                           :show-clear="false"
                           v-model="fundPassword"
                  >
                  </x-input>
                </li>
                <li>
                  <p class="text_color">{{errorText}}</p>
                </li>
                <li style="text-align: center">
                  <x-button mini type="warn" :show-loading="rechargeLoading" v-tap="{methods: onConfirm}">立即充值</x-button>
                </li>
              </ul>
            </x-dialog>
          </div>
        </li>
        <li>
          <p class="teamTit">团队余额</p>
          <p class="teamcontent textColor">{{teamMoney | tofixed('')}} 元</p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">最后登录时间</p>
          <p class="teamcontent" v-text="agentDetail.lasttime=='1970-01-01 00:00:00'? '新建账号，未登录！': agentDetail.lasttime "></p>
          <p class="teamr"></p>
          <br class="clear">
        </li>
        <li v-if="this.$store.state.dayWage == 1">
          <p class="teamTit">日工资比例</p>
          <p class="teamcontent textColor" v-if="agentDetail.daily_salary_status=='1'">{{agentDetail.salaryHighRadio}}%</p>
          <div class="updateBtn updateBtning" v-if="agentDetail.daily_salary_status=='0'" v-text="agentDetail.daily_salary_status=='0' && '签订中'" v-tap="{ methods: _setSalary }"></div>
          <div class="teamr pereBtn" v-if="agentDetail.daily_salary_status=='1'" v-tap="{ methods: _showSalary }"></div>
          <div class="updateBtn" v-if="agentDetail.daily_salary_status=='2'" v-text="agentDetail.daily_salary_status=='2' && '已拒绝'" v-tap="{ methods: _setSalary }"></div>
          <div class="updateBtn" v-if="agentDetail.daily_salary_status=='3'" v-text="agentDetail.daily_salary_status=='3' && '未签订'" v-tap="{ methods: _setSalary }"></div>
          <br class="clear">
          <table class="salaryTable" v-if="showSalary" width="100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr align="center">
                <td>日销量</td>
                <td>活跃人数</td>
                <td>日工资比例</td>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in newSalary" align="center">
              <td>{{item.sale}}</td>
              <td>{{item.active_member}}</td>
              <td>{{item.salary_ratio}}%</td>
            </tr>
            </tbody>
          </table>
        </li>
        <li v-if="this.$store.state.dividend == 1">
          <p class="teamTit">分红比例</p>
          <p class="teamcontent textColor" v-if="agentDetail.dividend_salary_status=='1' && !showRevise">{{agentDetail.dividend_radio}}%</p>
          <x-input class="dividend_input"
                   v-if="showRevise"
                   type="number"
                   :show-clear="false"
                   v-model="dividendPoint"
          >
          </x-input>
          <div class="updateBtn" v-if="showRevise" v-tap="{ methods: _saveDividend}">保存修改</div>
          <div class="updateBtn" v-if="showRevise" v-tap="{ methods: _cancelDividend }">取消</div>
          <div class="updateBtn" v-if="!showRevise" v-text="agentDetail.dividend_salary_status == '1' ? '修改' : '未签订'" v-tap="{ methods: _setDividend }"></div>
          <br class="clear">
        </li>
        <li>
          <p class="teamTit">配额设定</p>
          <p class="teamcontent"></p>
          <p class="teamr pereBtn" v-tap="{ methods: _show }"></p>
          <br class="clear">
            <ul class="quotaSetting" v-if="show">
              <li v-for="(item, i) in quotaList" v-if="item.accGroup <= agentDetail.prize_group">
                {{item.accGroup}}配额为
                <span
                className="subaccnum">{{item.subaccnum == undefined ? '0' : item.subaccnum}}</span>个，
                <span>
                  再增加
                  <x-input class="quota_input"
                           type="number"
                           :show-clear="false"
                           v-model="agPost.accnum[i] && agPost.accnum[i]"
                           @on-change="onChangeAccGroup(agPost.accnum[i], item)"
                  >
                  </x-input>
                  个(剩余可分配{{item.accnum}}个)
                </span>
              </li>
              <li>{{agentDetail.prize_group < 1950 ? agentDetail.prize_group : '1948'}}及以下剩余配额：无限；</li>
              <li style="text-align: center">
                <x-button mini type="warn" :show-loading="quotaLoding" v-tap="{methods: onApplyPrizeQuota}">提交</x-button>
              </li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import {Range, Flexbox, XButton, FlexboxItem, XDialog, TransferDomDirective as TransferDom, Icon, md5, XInput } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      headTop,
      Range,
      Flexbox,
      XButton,
      FlexboxItem,
      XDialog,
      Icon,
      XInput
    },
    data () {
      return {
        teamcontent: (this.$store.state.agentDetail.userpoint * 100).toFixed(1),
        keeppoint: 0.1,
        show: false,
        isshow: false,
        agentDetail: this.$store.state.agentDetail,
        maxPoint: (this.$route.query.selfp - this.$store.state.agentDetail.userpoint * 100 - 0.1).toFixed(1), // 最高返点
        lotterys: [], // 计算列表
        AllLotterys: [],
        AllLotterysflag: [],
        isupBtn: false,
        teamMoney: 0, // 团队余额
        showSalary: false,
        newSalary: [],
        selfPoint: 0,
        showPrizeGroup: false,
        prizeGroup: parseInt(this.$store.state.agentDetail.prize_group),
        prizeGroupList: [],
        userKeeppoint: 0,
        showRecharge: false,
        recharge: {},
        rechargeMoney: '',
        fundPassword: '',
        rechargeLoading: false,
        errorText: '',
        showRevise: false,
        dividendPoint: '', // 修改的分红比例
        dividendLoading: true,
        quotaList: [], // 配额列表
        agPost: {}, // 申请配额请求参数
        quotaLoding: false,
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
      this._getUseraccnum()
      this._getTeamMoney()
      this._getHistorySalary()
      this._getPrizeGroup()
      this._getAccGroupList()
    },
    methods: {
      _getAccGroupList() {
        this.httpAction(this.httpUrl('USERACCNUM'), (res) => {
          let result = res.data;
          if (result.status == 200) {
            let aAllUserTypeAccNum = result.repsoneContent.aAllUserTypeAccNum, ap = this.agPost
            ap.accgroup = [];
            ap.accnum = [];
            aAllUserTypeAccNum.forEach((item) => {
              ap.accgroup.push(item.agid);
              if (item.quotanum != undefined) {
                ap.accnum.push(item.quotanum);
              } else {
                ap.accnum.push('0');
              }
            });
            ap.uid = this.agentDetail.userid
            ap.flag = 'post',
            this.quotaList = aAllUserTypeAccNum
            this.agPost =ap
            console.log(ap)
          }
        }, {
          uid: this.agentDetail.userid
        })
      },
      /*申请配额*/
      onApplyPrizeQuota(){
        this.quotaLoding = true
        this.httpAction(this.httpUrl('USERACCNUM'), (res) => {
          this.quotaLoding = false
          let result = res.data
          if (result.status == 200) {
            this.agPost = {}
            this._getAccGroupList()
            this.$vux.alert.show({
              title: '温馨提示',
              content: result.repsoneContent,
            });
          }
        }, this.agPost)
      },
      /*设置配额契约*/
      onChangeAccGroup(value, item) {
        let ap = this.agPost,
          accgroup = ap.accgroup;
        for (let i = 0; i < accgroup.length; i++) {
          if (accgroup[i] == item.agid) {
            ap.accnum[i] = value;
            break;
          }
        }
        this.agPost = ap
      },
      _saveDividend() {
        let dp = this.dividendPoint
        if(dp == '' || dp < 0){
          this.$vux.alert.show({
            title: '温馨提示',
            content: '填写的比例必须大于0 ！'
          })
          return
        }
        if(!this.dividendLoading){
          return
        }
        this.dividendLoading = false
        this.httpAction(this.httpUrl('RATIO'), (res) => {
          this.dividendLoading = true
          let result = res.data;
          if (result.status == 200) {
            this.$router.go(-1)
            this.$vux.alert.show({
              title: result.longMessage,
              content: result.repsoneContent
            });
          } else {
            this.$vux.alert.show({
              title: result.longMessage,
              content: result.shortMessage
            });
          }
        }, {
          dividend_radio: this.dividendPoint,
          userid: this.agentDetail.userid
        })
      },
      _cancelDividend() {
        this.showRevise = false
      },
      /*签订分红*/
      _setDividend() {
        if(this.agentDetail.dividend_salary_status == '1'){
          this.showRevise = true
        }else{
          this.$router.push({path: '/userInfo/setDividend'})
        }
      },
      /*关闭充值窗口*/
      _rechargeClose() {
        this.showRecharge = false
        this.rechargeMoney = ''
        this.errorText = ''
        this.fundPassword = ''

      },
      _showRecharge() {
        this.showRecharge = true
      },
      /*选择充值*/
      onRecharge() {
        this.showRecharge = true
        this.httpAction(this.httpUrl('TRANSFER'), (res) => {
          let result = res.data;
          if (result.status == 200) {
            let data = result.repsoneContent, recharge = {}
            recharge.userid = this.agentDetail.userid
            recharge.recharge_max = data.recharge_max
            recharge.recharge_min = data.recharge_min
            recharge.balance = data.balance
            this.recharge = recharge
          }
        }, {
          toUserid: this.agentDetail.userid,
          type: 'TransferInfo'
        })
      },
      /*立即充值*/
      onConfirm() {
        let rm = parseInt(this.rechargeMoney), rh = this.recharge, fp = this.fundPassword
        if(rm == '' || rm < parseInt(rh.recharge_min) || rm > parseInt(rh.recharge_max)){
          this.errorText = '金额格式输入不正确，请重新输入！'
          return
        }
        if(fp == ''){
          this.errorText = '资金密码不能为空，请重新输入！'
          return
        }
        this.rechargeLoading = true
        this.httpAction(this.httpUrl('TRANSFER'), (res) => {
          this.rechargeLoading = false
          let result = res.data;
          if (result.status == 200) {
            this._rechargeClose()
            this.$router.go(-1)
            this.$vux.alert.show({
              title: '温馨提示',
              content: result.shortMessage
            })
          } else {
            this.errorText = result.shortMessage
          }
        }, {
          toUserid: this.agentDetail.userid,
          type: 'goTransfer',
          money: this.rechargeMoney,
          secpass: md5(this.fundPassword)
        })
      },
      _onChangeKeepPoint(value) {
        this.userKeeppoint = (this.prizeGroupList.filter((item)=>item.prizeGroup == value)[0].high * 100).toFixed(1)
      },
      _showPrizeGroup() {
        this.showPrizeGroup = !this.showPrizeGroup
      },
      _cancelSet() {
        this.showPrizeGroup = false
      },
      // 设置奖金组
      _setPrizeGroup() {
        let _this = this
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '确定要修改' + this.agentDetail.username + '的奖金组契约吗?',
          onConfirm() {
            _this._setPG()
          }
        })
      },
      _setPG() {
        this.httpAction(this.httpUrl('UPEDITUSER'), (res) => {
          let result = res.data;
          if (result.status == 200) {
            this.$router.go(-1)
            this.$vux.alert.show({
              title: result.longMessage,
              content: result.repsoneContent
            });
          } else {
            this.$vux.alert.show({
              title: result.longMessage,
              content: result.shortMessage
            });
          }
        }, {
          flag: "rapid",
          uid: this.agentDetail.userid,
          groupLevel: this.prizeGroup,
          keeppoint: (this.selfPoint * 100 - this.userKeeppoint).toFixed(1),
          selfPoint: this.selfPoint
        })
      },
      //获取可设置的奖金组列表
      _getPrizeGroup() {
        this.httpAction(this.httpUrl('UPEDITUSER'), (res) => {
          if (res.data.status == 200) {
            let data = res.data.repsoneContent;
            this.selfPoint = data.selfPoint;
            this.prizeGroupList = data.list;
            this.userKeeppoint = (data.list.filter((item)=>item.prizeGroup == this.prizeGroup)[0].high * 100).toFixed(1);
          } else {
            this.$vux.alert.show({
              title: res.data.shortMessage,
              content: '新注册的用户10分钟后才能修改奖金组，请稍后再试！'
            })
          }
        }, {
          uid: this.agentDetail.userid,
        })
      },
      /*签订日工资*/
      _setSalary() {
        this.$router.push({path: '/userInfo/setDalary'})
      },
      /*团队余额*/
      _getTeamMoney() {
        this.httpAction(this.httpUrl('TEAMMANAGEMENT'), (res) => {
          if (res.data.status == 200) {
            this.teamMoney =  res.data.repsoneContent.money
          }
        }, {
          uid: this.agentDetail.userid,
          tag: 'get_team_money'
        })
      },
      _show () {
        this.show = !this.show
      },
      _getHistorySalary() {
        if(this.$store.state.dayWage == 1){
          this.httpAction(this.httpUrl('SEEPROTOCOL'), (res) => {
            if (res.data.status == 200) {
              let pros = res.data.repsoneContent.pros;
              this.newSalary = pros['new'];
              if(this.newSalary.length < 1){
                this.agentDetail.newSalary = [
                  {
                    active_member: '',
                    salary_ratio: '',
                    sale: ''
                  }
                ]
              }else{
                this.agentDetail.newSalary = pros['new'];
              }
              this.agentDetail.oldSalary = pros['old'];
              this.$store.commit('updateAgentDetail', this.agentDetail)
            }
          }, {
            userid: this.agentDetail.userid,
            parentid: this.agentDetail.parentid,
          })
        }
      },
      _showSalary() {
        this.showSalary = !this.showSalary
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
 .recharge_content{
   font-size: 0.28rem;
   height: 0.6rem;
   line-height: 0.6rem;
   background: #CB1313;
   color: #fff;
   text-align: center;
   .r_title{
     margin-left: 1rem;
   }
   .weui-icon-cancel{
     color: #fff;
   }
   .r_close{
     float: right;
     padding: 0.08rem 0.1rem 0.08rem 0.3rem;
   }
 }
 .recharge_list{
   font-size: 0.28rem;
   margin: 0.2rem 0.3rem;
   li{
     text-align: left;
     padding: 0.15rem 0;
   }
   .money_hint{
     font-size: 0.24rem;
     color: #5a5a5a;
   }
   .text_color{
     color: #CB1313;
   }
   .rechage_text{
     float: left;
   }
   .recharge_input, .fund_input{
     float: left;
     height: 0.64rem;
     padding: 0 0.1rem;
     width: 50%;
     border: 1px solid #ddd;
     border-radius: 3px;
     margin-top: -0.1rem;
     background: #fff;
   }
   .weui-cell:before{
     border: 0;
   }
 }
 .prize_group_content{
   border-top: 1px solid #dddddd;
   .fandian{
     margin-top: 0.1rem;
     li{
       float: left;
       width: 33%;
       text-align: center;
     }
     li:last-child{
       color: #f00;
     }
   }
 }
 .set_proup_btn{
   width: 87%;
   margin: 0 auto 0.5rem;
 }
 .prize_group_text{
   text-align: center;
 }
 .range_content{
   margin: 0.5rem 0.3rem 1rem -0.2rem;
 }
 .topPadding{
   height:0.88rem;
 }
 .salaryTable{
   background: #fff;
   thead tr td{
     border-top: 1px solid #dddddd;
   }
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
    .textColor{
      color: #f00;
    }
    .dividend_input{
      width: 20%;
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 0 0.1rem;
      background: #fff;
      height: 0.52rem;
      line-height: 0.52rem;
      margin-bottom: 0.08rem;
      vertical-align: bottom;
    }
    .weui-cell:before{
      border: 0;
    }
     .updateBtn{
       float: right;
       width: 1.2rem;
       height: 0.5rem;
       line-height: 0.5rem;
       border: 1px solid #f00;
       border-radius: 3px;
       color: #f00;
       text-align: center;
       margin: 0.08rem 0.16rem 0 0;
       font-size: 0.28rem;
     }
     .updateBtning{
       border: 1px solid #a5a5a5;
       color: #a5a5a5;
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
      padding: 0.2rem 0 2rem 0.3rem;
      width: 100%;
      .cl;
      .quota_input{
        display: inline-block;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.1rem;
        width: 15%;
        border: 1px solid #ddd;
        border-radius: 3px;
        background: #fff;
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
