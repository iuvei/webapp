<!--下级注册-->
<template>
  <div>
    <headTop headTitle="下级注册" goBack='true'></headTop>
    <div class="header_app_v">
      <p class="username" v-text="this.$store.state.account"></p>
      <form @submit.prevent="submit">
        <ul class="registerBox">
          <li class="registerType">
            <p class="linkL">用户类型</p>
            <p :style="{paddingLeft:'0.28rem'}">
              <span class="r_member" :class="{ activeType: isActiveType == 1}" v-tap="{ methods:setCurM}">会员</span>
              <span class="r_agent" :class="{ activeType: isActiveType == 0}" v-tap="{ methods:setCurA}">代理</span>
            </p>
            <br class="clear">
          </li>
          <li>
            <p class="linkL">用户名</p>
            <p><input type="text" name="username" v-model="postData.username"
                      @blur="checkUserName('usercheck','username', postData.username)" placeholder="期待创建的下级账号"></p>
          </li>
          <li class="tips">由字母或数字组成的6-16个字符,不能连续四位相同的字符,首字不能以
            0或者o开头
          </li>
          <li>
            <p class="linkL">昵称</p>
            <p><input type="text" name="nickname" v-model="postData.nickname"
                      @blur="checkNickName('nicknamecheck','nickname', postData.nickname)" placeholder="请输入昵称"></p>
            <br class="clear">
          </li>
          <li class="tips">
            2-6位字符组成
          </li>
          <li>
            <p class="linkL">密码</p>
            <p><input type="password" name="userpass" v-model="postData.userpass"
                      @blur="checkUserPass('checkpwd','pwd', postData.userpass)" placeholder="下级密码"></p>
            <br class="clear">
          </li>
          <li class="tips">
            由字母和数字组成6-16个字符；且必须包含数字和字母
          </li>
          <li>
            <p class="linkL">自身保留返点</p>
            <p class="select_number">
              <span v-tap="{ methods:Less}" :class="{forbidColor: postData.keeppoint<=0}"
                    :style="{borderRight:0}">-</span>
              <input type="text" name="keeppoint" @blur="_blurKeeppoint" v-model="postData.keeppoint">
              <span v-tap="{ methods:plus}" :class="{forbidColor: postData.keeppoint>=parseFloat(maxPoint)}"
                    :style="{borderLeft:0}">+</span>
            </p>
          </li>
          <!--<li class="tips">-->
          <!--自身返点至少保留<span>0.1</span>-->
          <!--</li>-->
          <!--<li>-->
          <!--<p class="linkL">奖金组</p>-->
          <!--<p  class="select_number">-->
          <!--<span v-tap="{ methods:Less}" :class="{forbidColor: bonusGroup<=0.1}" :style="{borderRight:0}">-</span>-->
          <!--<input type="text" name="keeppoint" @blur="_blurKeeppoint" v-model="bonusGroup" style="text-align: center">-->
          <!--<span v-tap="{ methods:plus}" :class="{forbidColor: bonusGroup>=parseFloat(1956)}" :style="{borderLeft:0}">+</span>-->
          <!--</p>-->
          <!--</li>-->
          <!--<li class="minMax rebate">-->
          <!--<span>自身返点：7.5%</span>-->
          <!--<span style="color: #363636">-->
          <!--用户返点：-->
          <!--<b style="color: #C7202A">0%</b>-->
          <!--</span>-->
          <!--<span style="color: #C7202A">保留返点：7.8%</span>-->
          <!--</li>-->
          <!--<li class="minMax rebate_slider">-->
          <!--<range v-model="bonusGroup" :min='1800' :max="1956" :step="2" :range-bar-height="4"></range>-->
          <!--</li>-->
          <!--<li>该奖金组剩余配额：无限</li>-->
        </ul>
        <div class="registerLinks">
          <input type="submit" value="注册">
        </div>
        <div class="seestyle">
          <div v-if="AllTypeAccNumData.length!==0">
            <p class="seepeie" v-tap="{ methods:_peie}">查看配额 <i id="peie_icon_hook" class="icon_hook"
                                                                style="left: 1.6rem;"></i></p>
            <transition name="slide-fade">
              <div v-show="peie" class="peieBox">
                <table width="100%" border="0" cellspacing="1" cellpadding="5">
                  <thead style="background:#fff;">
                  <tr>
                    <th>返点区间</th>
                    <th>剩余配额</th>
                  </tr>
                  </thead>
                  <tbody style="background:#fff;">
                  <tr align="center" v-for="item in AllTypeAccNumData">
                    <td>
                      <span>{{item.low | filterRebate}}</span>~<span>{{item.high | filterRebate}}</span>
                    </td>
                    <td v-text="item.accnum"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </transition>
          </div>
          <div v-if="AllLotterysflag.length!==0">
            <p class="seeRebate" v-tap="{ methods:_fandian}">查看分彩种返点<i id="icon_hook" class="icon_hook"
                                                                       style="left: 2.4rem;"></i></p>
            <transition name="slide-fade">
              <div v-show="fandian" class="fandianBox">
                <table width="100%" border="0" cellspacing="1" cellpadding="2">
                  <thead style="background:#fff;">
                  <tr>
                    <th width="28%">彩种</th>
                    <th width="8%">赔率</th>
                    <th width="32%">所有玩法返点</th>
                    <th width="32%">不定位返点</th>
                  </tr>
                  </thead>
                  <tbody style="background:#fff;">
                  <input type="hidden" name="register_source" value="app">
                  <input type="hidden" name="usertype" v-model="postData.usertype">
                  <input type="hidden" name="flag" v-model="postData.flag">
                  <input type="hidden" name="loginusername" v-model="postData.loginusername">
                  <tr align="center" v-for="(items,index) in AllLotterys">
                    <td v-text="items.cnname"></td>
                    <td v-text="items.pg[0].title"></td>
                    <td>
                      <span>{{items.allFD}}%</span><br>
                      (范围<span>{{items.pg[0].min}}%</span>-<span>{{items.pg[0].max}}%</span>)
                    </td>
                    <td>
                      <span>{{items.bddFD}}%</span><br>
                      (范围<span>{{items.pg[0].minIndefinite}}%</span>-<span>{{items.pg[0].maxIndefinite}}%</span>)
                    </td>
                    <input type="hidden" name='lottery' v-model="items.pg[0].lotteryid">
                    <input type="hidden" :name='items.namepg' v-model="items.pg[0].userpgid">
                    <input type="hidden" :name='items.namemin_point' v-model="items.pg[0].min">
                    <input type="hidden" :name='items.namemax_point' v-model="items.pg[0].max">
                    <input type="hidden" :name='items.namepoint' v-model="items.allFD">
                    <input type="hidden" :name='items.namemin_indefinite_point' v-model="items.pg[0].minIndefinite">
                    <input type="hidden" :name='items.namemax_indefinite_point' v-model="items.pg[0].maxIndefinite">
                    <input type="hidden" :name='items.nameindefinite_point' v-model="items.bddFD">
                  </tr>
                  </tbody>
                </table>
              </div>
            </transition>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import {Range, Cell} from 'vux'

  export default {
    components: {
      headTop,
      Range,
      Cell
    },
    data() {
      return {
        bonusGroup: 1860,
        isActiveType: 1,
        postData: {
          flag: 'insert',
          usertype: 0, // 用户类型
          username: '', // 用户名
          userpass: '', // 下级密码
          nickname: '', // 昵称
          phonenumber: '',
          loginusername: this.$store.state.account, // 登录用户名
          keeppoint: 0.1
        },
        iscur: false,
        peie: false,
        fandian: false,
        maxPoint: 0, // 最高返点
        AllTypeAccNumData: [], // 配额
        AllLotterys: [], // 彩种返点
        AllLotterysflag: [],
        flagUserName: false,
        flagNickName: false,
        flagUserPass: false
      }
    },
    watch: {
      'postData.keeppoint': function (val) {
        if ((this.postData.keeppoint).toString().indexOf('.') > -1) {
          this.postData.keeppoint = this.postData.keeppoint.toString().split('.')[0] + '.' + this.postData.keeppoint.toString().split('.')[1].substring(0, 1)
          this._getInputData()
        }
      }
    },
    mounted() {
      this._getRegistration()
    },
    methods: {
      _fandian() {
        // if (this.playPlatform !== 'web') {
        //   if (this.fandian) {
        //     Velocity(document.getElementById("icon_hook"), {
        //       rotateZ: '135deg'
        //     }, {
        //       duration: 300
        //     });
        //   } else {
        //     Velocity(document.getElementById("icon_hook"), {
        //       rotateZ: '-45deg'
        //     }, {
        //       duration: 300
        //     });
        //   }
        // }
        this.fandian = !this.fandian
      },
      _peie() {
        // if (this.playPlatform !== 'web') {
        //   if (this.peie) {
        //     Velocity(document.getElementById("peie_icon_hook"), {
        //       rotateZ: '135deg'
        //     }, {
        //       duration: 300
        //     });
        //   } else {
        //     Velocity(document.getElementById("peie_icon_hook"), {
        //       rotateZ: '-45deg'
        //     }, {
        //       duration: 300
        //     });
        //   }
        // }
        this.peie = !this.peie
      },
      // 注册
      submit(e) {
        if (this.postData.username === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '用户名不能为空'
          })
          return
        } else if (this.postData.nickname === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '昵称不能为空'
          })
          return
        } else if (this.postData.userpass === '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '密码不能为空'
          })
          return
        } else if (this.flagUserName) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '用户名格式不正确,请重新输入!'
          })
          return
        } else if (this.flagNickName) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '昵称格式不正确,请重新输入'
          })
          return
        } else if (this.flagUserPass) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '密码格式不正确,请重新输入!'
          })
          return
        }
        let formData = this.formser(e.target)
        formData.lottery = formData.lottery.split(',')
        let httpurl = this.httpUrl('REGISTRATION')
        this.$vux.loading.show({
          text: '注册中...'
        })
        this.httpAction(httpurl, (res) => {
          if (res.data.status == 39) {
            this.$vux.loading.hide()
            let _this = this
            this.$vux.alert.show({
              title: '温馨提示',
              content: '注册成功,' + res.data.msg,
              onHide() {
                _this.$router.replace('/userInfo')
              }
            })
          } else {
            this.$vux.loading.hide()
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.data.msg
            })
          }
        }, formData)
      },
      // 后台检测用户名,昵称，密码
      checkdata(action, name, val) {
        let httpurl = this.httpUrl('USERCHECK') + '&action=' + action + '&' + name + '=' + val
        this.httpAction(httpurl, (res) => {
          if (res.data.status !== 0) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.data.msg
            })
            return false
          }
        })
      },
      // 正则检测用户名
      checkUserName(action, name, val) {
        if (val === '') {
          return
        }
        if (val.length !== 0) {
          let reg = /^(?=.*[\da-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1\1).{6,16}$/
          let r = reg.test(val)
          if (!r) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '用户名格式不正确,请重新输入!'
            })
            this.flagUserName = true
            return
          } else {
            this.flagUserName = false
          }
        }
        this.checkdata(action, name, val)
      },
      // 正则检测昵称
      checkNickName(action, name, val) {
        if (val === '') {
          return
        }
//        if (val.length !== 0) {

        let reg = /^.{2,6}$/
        let r = reg.test(val)
        if (!r) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '昵称格式不正确,请重新输入!'
          })
          this.flagNickName = true
          return
        } else {
          this.flagNickName = false
        }
//        }
        this.checkdata(action, name, val)
      },
      // 正则检测密码
      checkUserPass(action, name, val) {
        if (val === '') {
          return
        }
        if (val.length !== 0) {
          let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/
          let r = reg.test(val)
          if (!r) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '密码格式不正确,请重新输入!'
            })
            this.flagUserPass = true
            return
          } else {
            this.flagUserPass = false
          }
        }
        this.checkdata(action, name, val)
      },
      _getRegistration() {
        let httpurl = this.httpUrl('REGISTRATION')
        this.httpAction(httpurl, (res) => {
          this.maxPoint = parseFloat(res.data.selfp * 100).toFixed(1)
          this.postData.keeppoint = parseFloat(res.data.selfp * 100).toFixed(1) // 默认展示最大返点
          this.AllTypeAccNumData = res.data.AllTypeAccNum
          this.AllLotterysflag = res.data.lotterys
          this._getInputData()
        })
      },
      _getInputData() {
        let TempAllLotterys = this.AllLotterysflag
        for (let i = 0; i < TempAllLotterys.length; i++) {
//          if (TempAllLotterys[i].lotteryid == 1) {
//            this.maxPoint = parseFloat(TempAllLotterys[i].pg[0].maxIndefinite).toFixed(1)
//          }
          if (TempAllLotterys[i].pg[0].maxIndefinite < 0) {
            TempAllLotterys[i].pg[0].maxIndefinite = 0.1
          }
          if (TempAllLotterys[i].pg[0].max < 0) {
            TempAllLotterys[i].allFD = 0
          } else {
            TempAllLotterys[i].allFD = parseFloat(((TempAllLotterys[i].pg[0].point * 100).toFixed(1) - this.postData.keeppoint + parseFloat(0.1)).toFixed(1))
          }
          TempAllLotterys[i].bddFD = parseFloat((TempAllLotterys[i].pg[0].maxIndefinite - this.postData.keeppoint + parseFloat(0.1)).toFixed(1))
          if (TempAllLotterys[i].allFD < 0) {
            TempAllLotterys[i].allFD = 0
          }
          if (TempAllLotterys[i].bddFD < 0) {
            TempAllLotterys[i].bddFD = 0
          }
          TempAllLotterys[i].lottery = [TempAllLotterys[i].pg[0].lotteryid]
          TempAllLotterys[i].namepg = 'pg_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].namemin_point = 'min_point_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].namemax_point = 'max_point_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].namepoint = 'point_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].namemin_indefinite_point = 'min_indefinite_point_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].namemax_indefinite_point = 'max_indefinite_point_' + TempAllLotterys[i].pg[0].lotteryid
          TempAllLotterys[i].nameindefinite_point = 'indefinite_point_' + TempAllLotterys[i].pg[0].lotteryid
        }
        this.AllLotterys = TempAllLotterys
      },
      formser(form) {
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
              if (arr[feled.name]) {
                arr[feled.name] = arr[feled.name] + ',' + feled.value
              } else {
                arr[feled.name] = feled.value
              }
          }
        }
        return arr
      },
      Less() {
        if (this.postData.keeppoint == 0) {
          return
        } else {
          this.postData.keeppoint = parseFloat(this.postData.keeppoint - 0.1).toFixed(1)
        }
      },
      _blurKeeppoint() {
        if (/\D/.test(this.postData.keeppoint)) {
          this.postData.keeppoint = 0
          return
        }
        this.postData.keeppoint = Number(this.postData.keeppoint)
        if (parseFloat(this.postData.keeppoint) > parseFloat(this.maxPoint)) {
          this.postData.keeppoint = this.maxPoint
        } else if (this.postData.keeppoint < 0) {
          this.postData.keeppoint = 0
        }
      },
      plus() {
        if (parseFloat(this.postData.keeppoint) == parseFloat(this.maxPoint)) {
          return
        } else if (parseFloat(this.postData.keeppoint) < parseFloat(this.maxPoint)) {
          this.postData.keeppoint = (parseFloat(this.postData.keeppoint) + 0.1).toFixed(1)
        } else {
          this.postData.keeppoint = this.maxPoint
        }
      },
      setCurM() {
        this.isActiveType = 1
        this.postData.usertype = 0
      },
      setCurA() {
        this.isActiveType = 0
        this.postData.usertype = 1
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';
  //----------------
  .weui-cell {
    padding: 0.07rem 0 !important;
  }

  .vux-number-input {
    font-size: 0.32rem !important;
  }

  .vux-number-selector svg {
    fill: #c7202c !important;
  }

  //----------------
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .forbidColor {
    color: #aaa;
  }

  .topPadding {
    height: 0.88rem;
  }

  .username {
    text-align: center;
    background: #444444;
    color: #fff;
    line-height: 0.64rem;
    height: 0.64rem;
  }

  .registerBox li {
    border-top: 1px solid #dddddd;
    height: 0.7rem;
    background: #fff;
    /*text-indent: 0.32rem;*/
    padding: 0 0.32rem;
    line-height: 0.7rem;
    p {
      float: left;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #333;
      font-size: 0.28rem;
      input {
        font-size: 0.28rem;
        padding: 0.2rem 0;
      }
    }
    .selfRebate {
      color: #c7202a;
    }
    .subordinateRebate {
      color: #c7202a;
    }
    .linkL {
      width: 30%;

    }
  }

  .registerBox {
    .minMax {
      background: none;
      color: #a4a4a4;
      border: none;
    }
    .rebate {
      span {
        display: inline-block;
        width: 30%;
        text-indent: 0;
      }
    }
    .vux-range-input-box {
      width: 73%;
      margin-top: 23px;
    }
    .rebate_slider {
      text-indent: 0;
    }
    .tips {
      text-indent: 0;
      height: auto;
      line-height: 0.3rem;
      padding: 0.28rem;
      color: #a4a4a4;
      background: none;
      span {
        color: #ff0000;
      }
    }
  }

  .registerLinks {
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    border-radius: 3px;
    background: #c7202a;
    text-align: center;
    font-size: 0.28rem;
    margin: 0.4rem 0;
    width: 94%;
    .cl;
    /*margin-left: 3%;*/
    &:active {
      background: #B4343B;
    }
    input {
      .wh(100%, 100%);
      color: #fff;
      font-size: 0.28rem;
    }
  }

  .registerBox .registerType {
    span {
      float: left;
      box-sizing: border-box;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      background: #fff;
      border: 1px solid #cbcbcb;
      text-align: center;
      width: 1rem;
    }
    .activeType {
      background: #c7202a;
      color: #fff;
      border: 1px solid #c7202a
    }
    .r_member {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: 0;
    }
    .r_agent {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 0;
    }
  }

  .seestyle {
    margin-top: 1.4rem;
    .seepeie {
      position: relative;
      font-size: 0.28rem;
      text-decoration: underline;
      text-indent: 0.28rem;
    }
    .seeRebate {
      position: relative;
      font-size: 0.28rem;
      text-decoration: underline;
      text-indent: 0.28rem;
      margin-top: 0.28rem;
    }
  }

  .icon_hook {
    .icon_arrows(0rem, 0, #aaa, 0.2rem, 135deg);
  }

  .peieBox, .fandianBox {
    margin-top: 0.2rem;
  }

  .select_number {
    span {
      padding: 0 0.5rem;
      font-size: 0.3rem;
    }
    input {
      width: 35px !important;
    }
  }

</style>
