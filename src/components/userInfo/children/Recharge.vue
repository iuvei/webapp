<!--选择充值方式-->
<template>
  <div>
    <headTop headTitle="选择充值方式" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="rechargeBox">
        <li>
          <p class="rechargetit">当前账号</p>
          <p>{{username}}</p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">充值金额</p>
          <p class="rechargetR"><input type="text" placeholder="请输入充值金额" v-model='inputMoney'></p>
          <br class="clear">
        </li>
        <li :style='{display:ifshow}'>
          <p class="rechargetit">支付姓名</p>
          <p class="rechargetR"><input type="text" placeholder="请输入支付姓名" v-model='alplayname'></p>
          <br class="clear">
        </li>
        <li>
          <p class="rechargetit">快速充值</p>
          <p class="rechargetR" :class="isshow==true?'openquck':'closequck'" v-tap="{ methods: _isshow}"><i></i></p>
          <ul v-if="isshow" class="clear">
            <li v-tap="{ methods: addred, item: item}" :class="{active: index==0}" v-for='(item,index) in third'><img
              :src='item.imgurl'/></li>
          </ul>
        </li>
        <li>
          <p class="rechargetit">银行卡充值</p>
          <p class="rechargetR" :class="show==true?'openbank':'closebank'" v-tap="{ methods: _show }"><i></i></p>
          <ul class="clear" v-if="show">
            <li v-tap="{ methods: addred, item: item}" :class="{active: index==0 && third.length == 0}"
                v-for='(item,index) in bankList'><img :src='item.imgurl'/></li>
          </ul>
        </li>
      </ul>
      <div class="tips" v-if="playPlatform==='ios'">最大充值金额<i>{{loadmax}}</i>元,最小可充值金额<i>{{loadmin}}</i>元</div>
      <div class="tips" v-else>
        <p>最大充值金额<i>{{loadmax}}</i>元,最小可充值金额<i>{{loadmin}}</i>元</p>
        <p :style="alplayInfo.name == 'zhifubaoc9' ? 'display: block' : 'display: none'">金额必须是<i>10</i>的倍数并且大于<i>500</i>时必须是<i>50</i>的倍数
        </p>
      </div>
      <p class="nextStep" v-tap="{ methods: nextAction }">下一步</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    components: {
      headTop
    },
    data() {
      return {
        username: '',
        show: false,
        isshow: true,
        bankList: [],
        third: [],
        imgUrl: this.$store.state.server + '/images/bank/',
        ifshow: 'none',
        alplayInfo: {},
        inputMoney: '',
        alplayname: '',
        loadmax: 0,
        loadmin: 0,
      }
    },
    mounted() {
      this.username = this.$store.state.account
      // if (window.plus) {
      // } else {
      //   document.addEventListener('plusready', function () {
      //   })
      // }
      this.getBankList()
    },
    methods: {
      _show() {
        this.show = !this.show
      },
      _isshow() {
        this.isshow = !this.isshow
      },
      addred(params) {
        let obj = params.item
        let ev = params.event
        this.alplayInfo = obj
        this.loadmax = obj.loadmax
        this.loadmin = obj.loadmin
        if (obj.actioner.split('=')[1] == 'alipaywith' || obj.actioner.split('=')[1] == 'alipaywh2') {
          this.ifshow = 'block'
        } else {
          this.ifshow = 'none'
        }
        let _this = ev.target
        let lilist = document.getElementsByTagName('li')
        for (let i = 0; i < lilist.length; i++) {
          lilist[i].classList.remove('active')
        }
        if (ev.target.tagName.toLowerCase() == 'img') {
          _this.parentNode.className = 'active'
        } else {
          _this.className = 'active'
        }
      },
      getBankList() {
        let pwdurl = this.httpUrl('GETBANKLIST')
        this.httpAction(pwdurl, (res) => {
          let tempData = res.data
          if (tempData.error_code == 0) {
            let bankLists = tempData.data.payList.bank
            let thirds = tempData.data.payList.third
            this.alplayInfo = thirds[0]
            for (let val in thirds) {
              let tempAction = thirds[val]['actioner'].split('=')[1]
              if (val == 0) {
                if (tempAction == 'alipaywith' || tempAction == 'alipaywh2') {
                  this.ifshow = 'block'
                }
              }
              thirds[val]['imgurl'] = this.$store.state.server + '/images/bank/' + tempAction + '.jpg'
            }
            for (let val in bankLists) {
              let tempAction = bankLists[val]['actioner'].split('=')[1]
              bankLists[val]['imgurl'] = this.$store.state.server + '/images/bank/' + tempAction + '.jpg'
            }
            this.third = thirds
            this.bankList = bankLists
            this.loadmax = this.third.length > 0 ? this.third[0]['loadmax'] : (this.bankList.length > 0 ? this.bankList[0]['loadmax'] : 0)
            this.loadmin = this.third.length > 0 ? this.third[0]['loadmin'] : (this.bankList.length > 0 ? this.bankList[0]['loadmin'] : 0)
          } else {
            this.$vux.alert.show({
              content: tempData.error_msg
            })
          }
        })
      },
      nextAction() {
        if (this.inputMoney == '') {
          this.$vux.alert.show({
            content: '请输入充值金额'
          })
          return
        } else {
          let reg = /^\d*\.{0,1}\d{0,1}$/
          if (!reg.test(this.inputMoney)) {
            this.$vux.alert.show({
              content: '充值金额格式不正确'
            })
            return
          }
        }
        if (this.alplayInfo.name == 'zhifubaoc9' && this.playPlatform === 'web') {
          if (this.inputMoney <= parseFloat(this.loadmax) && this.inputMoney >= parseFloat(this.loadmin)) {
            if (!((this.inputMoney <= 500 && this.inputMoney % 10 == 0) || (this.inputMoney > 500 && this.inputMoney % 50 == 0))) {
              this.$vux.alert.show({
                content: '充值金额格式不正确'
              })
              return
            }
          }
        }
        if (this.ifshow == 'block') {
          if (this.alplayname == '') {
            this.$vux.alert.show({
              content: '请输入支付宝姓名'
            })
            return
          }
        }
        this.$vux.loading.show({
          text: '正在充值'
        })
        let pwdurl = this.httpUrl('NEXTBANKLIST')
        let tempInfo = this.alplayInfo
        let obj = {
          tag: tempInfo['actioner'].split('=')[1],
          flag: 'load',
          username: this.username,
          bid: tempInfo.tbank_id,
          amount: this.inputMoney,
          Ruleset: 'deposit-hcp',
          alipayName: this.alplayname,
          'play_source': this.playSource
        }
        if (this.playPlatform === 'web') {
          var windowOpen = window.open()
        }
        this.httpAction(pwdurl, (res) => {
          this.$vux.loading.hide()
          let tempData = res.data
          let _this = this
          if (tempData.error_code == 0) {
            if (tempData.data['updateMoneyFloat'] != undefined && tempData.data['updateMoneyFloat'] == 1) {
              this.$vux.alert.show({
                content: '随机改变充值金额 : 为了避免您的支付限额，系统默认对您填写的整数金额随机减少' + tempData.data['moneyFloatLimitStart'] + '-' + tempData.data['moneyFloatLimitEnd'] + '元！',
                onHide() {
                  if (tempData.data.urlMiddleman == "") {
                    let param = tempData.data
                    _this.$router.push({path: '/userInfo/RechargeDetail', query: {'data': param}})
                  } else {
                    if (this.playPlatform === 'web') {
                      windowOpen.location = tempData.data.urlMiddleman
                    } else {
                      let actionurl = tempData.data.urlMiddleman
                      plus.runtime.openURL(actionurl)
                    }
                  }
                }
              })
            } else {
              if (tempData.data.urlMiddleman == "") {
                let param = tempData.data
                _this.$router.push({path: '/userInfo/RechargeDetail', query: {'data': param}});
              } else {
                if (this.playPlatform === 'web') {
                  windowOpen.location = tempData.data.urlMiddleman
                } else {
                  let actionurl = tempData.data.urlMiddleman
                  plus.runtime.openURL(actionurl)
                }
              }
            }
          } else {
            this.$vux.alert.show({
              content: tempData.error_msg
            })
          }
        }, obj)
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .topPadding {
    height: 0.88rem;
  }

  br {
    line-height: 0;
    height: 0px;
  }

  .rechargeBox > li {
    overflow: hidden;
    width: 100%;
    line-height: 0.7rem;
    height: auto;
    border-bottom: 1px solid #dddddd;
  }

  .tips {
    padding-top: 0.3rem;
    font-size: 0.22rem;
    line-height: 0.4rem;
    margin-left: 0.3rem;
    color: #686868;
    i {
      color: #c7202a;
      font-style: normal;
    }
  }

  li > p {
    float: left;
    line-height: 0.7rem;
    height: 0.7rem;
    font-size: 0.28rem;
  }

  .rechargetit {
    width: 25%;
    text-indent: 0.32rem;
  }

  .rechargetR {
    width: 75%;
    i {
      display: block;
      height: 0.7rem;
      width: 20%;
      float: right;
    }
  ;
    input {
      width: 90%;
      padding: 0.1rem 0;
      font-size: 0.25rem;
    }
  }

  .openquck, .openbank {
    i {
      background: url(../img/close_icon.png) no-repeat 50% center;
      background-size: auto 32%;
    }
  }

  .closequck, .closebank {
    i {
      background: url(../img/open_icon.png) no-repeat 50% center;
      background-size: auto 32%;
    }
  }

  .rechargeBox > li > ul {
    float: left;
    width: 100%;
    padding: 0.1rem 0 0.4rem 0
  }

  .rechargeBox > li > ul > li {
    background: #fff;
    width: 38%;
    margin-left: 8%;
    margin-top: 0.2rem;
    height: 0.8rem;
    border-radius: 5px;
    border: 1px solid #c8c8c8;
    float: left;
    text-align: center;
    img {
      height: 80%;
      width: auto;
      vertical-align: middle;
    }
  }

  .rechargeBox > li > ul > li.active {
    border: 1px solid #f00;
  }

  .nextStep {
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    border-radius: 3px;
    background: #c7202a;
    text-align: center;
    font-size: 0.28rem;
    margin: 0.4rem 0 0.4rem 3%;
    width: 94%;
  }


</style>
