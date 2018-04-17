<!--日工资协议-->
<template>
  <div>
    <headTop headTitle="日工资协议" goBack='true' AgreementExplain="true" textExplain="日工资" close="true"></headTop>
    <div class="header_app_v">
      <div class="inputBox clear">
        <p class="searchtit">用户名</p>
        <div class="selsect_user">
          <popup-picker :data="userList" v-model="userName" @on-change="onChange"></popup-picker>
        </div>
      </div>
      <div class="wage_table">
        <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
          <thead style="background:#fff;">
          <tr style=" height: 0.7rem;">
            <th width="25%">日销量(≥)</th>
            <th width="25%">活跃人数(≥)</th>
            <th width="26%">日工资比例(%)</th>
            <th width="24%">状态</th>
          </tr>
          </thead>
          <tbody>
          <tr align="center" v-for="item in dataList" style=" height: 1rem;">
            <td>{{item.sale}}</td>
            <td>
              <input class="ratio" type="text" v-model="item.active_member">人
            </td>
            <td>
              <input class="ratio" type="text" v-model="item.set_salary_ratio">%
            </td>
            <td>
              <p v-show="operation">
                -
              </p>
              <p v-show="!operation" :class="{ textColor: text == '等待同意' }">{{text}}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="wage_table" v-if="$route.query.agree">
        <table class="record_table" width="100%" border="0" cellspacing="0" cellpadding="2">
          <thead style="background:#fff;">
          <tr style=" height: 0.7rem;">
            <th width="25%">日销量(≥)</th>
            <th width="25%">新活跃人数(≥)</th>
            <th width="26%">新日工资比例(%)</th>
            <th width="24%">状态</th>
          </tr>
          </thead>
          <tbody>
          <tr align="center" v-for="item in dataListFlag" style=" height: 1rem;">
            <td>{{item.sale}}</td>
            <td>
              <input class="ratio" type="text" v-model="item.active_member" disabled>人
            </td>
            <td>
              <input class="ratio" type="text" v-model="item.set_salary_ratio" disabled>%
            </td>
            <td>
              -
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="stall clear" v-show="operation">
        <span class="add_stall left" v-tap="{ methods: _stall, item: 'add' }">添加档位</span>
        <span class="delete_stall right" v-tap="{ methods: _stall, item: 'delete' }">删除档位</span>
      </div>
      <div class="tips">温馨提示：当日投注金额≥1000元，计为一个活跃用户</div>
      <div class="button_save" v-tap="{ methods: _save, item: true }" v-show="operation">保存</div>
      <div class="button_save" v-tap="{ methods: _agreement, item: true }" v-show="agree">同意协议</div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import tableLocked from '../../common/table.vue'
  import buttonView from '../../common/button.vue'
  import {LoadMore, PopupPicker} from 'vux'

  export default {
    components: {
      headTop,
      tableLocked,
      LoadMore,
      PopupPicker,
      buttonView
    },
    data () {
      return {
        userName: [this.$route.query.username],
        dataList: [],
        dataListFlag: [],
        userList: [[]], // 用户名列表
        operation: false,
        text: '',
        agree: false,
        selfStall: [] // 自身协议
      }
    },
    watch: {
      'userName': function (val) {
        if (val[0] == this.$store.state.account) {
          this.operation = false
          this.text = '无法修改自身协议'
        } else {
          this.operation = true
        }
      }
    },
//    activated () {
//      // 提交mutation到Store
//      if (this.$store.state.agreement) {
//        this.userName = []
//        this.userName.push(this.$route.query.username)
//        this._getSecondaryAgent()
//      }
//    },
//    deactivated () {
//      this.userList[0] = []
//      this.$vux.loading.hide()
//    },
    mounted () {
      this._getSelfStall()
      if (this.userName[0] == this.$store.state.account) {
        this.operation = false
        this.text = '无法修改自身协议'
      } else {
        this.operation = true
      }
      if (this.$route.query.agree) {
        this._getAgentment()
      } else {
        this._getSecondaryAgent()
      }
    },
    methods: {
      _stall (params) {
        if (params.item === 'add') {
          if (this.dataList.length >= 6) {
            this.$vux.alert.show({
              title: '提示',
              content: '日工资契约最高为六个挡位'
            })
          } else {
            this.dataList.push(this.selfStall[this.dataList.length])
          }
        } else {
          if (this.dataList.length <= 3) {
            this.$vux.alert.show({
              title: '提示',
              content: '日工资契约最低保留三个挡位'
            })
          } else {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: '确定要删除最后的一个档位吗？',
              onHide () {
                _this.dataList.pop()
              }
            })
          }
        }
      },
      _getSelfStall () {
        let datas = {
          userid: this.$store.state.selfUserid,
          username: this.$store.state.account
        }
        let httpurl = this.httpUrl('UPDATEPROTOCOL')
        this.httpAction(httpurl, (res) => {
          if (res.data.status == 200) {
            this.selfStall = res.data.data.pros
          }
        }, datas)
      },
      _agreement() {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let datas = {
          status: 1,
          userid: this.$route.query.userid
        }
        let httpurl = this.httpUrl('SEEPROTOCOL')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            this.agree = false
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg
            })
          }
        }, datas)
      },
      onChange (value) {
        this.userName = []
        this.userName.push(value[0])
        this._getSecondaryAgent()
      },
      _save(params) {
        this._getSecondaryAgent(params.item)
      },
      // 获取同意协议列表
      _getAgentment() {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let datas = {}
        let daywageList = this.$store.state.daywageList
        let username = this.userName[0]
        this.userList[0] = []
        for (let i = 0; i < daywageList.length; i++) {
          this.userList[0].push(daywageList[i].username)
          if (username === daywageList[i].username) {
            datas.userid = daywageList[i].userid
            datas.parentid = daywageList[i].parent_id
            datas.id = daywageList[i].id
          }
        }
        datas.username = this.userName[0]
        datas.gmt_sale = this.$route.query.gmt_sale
        let httpurl = this.httpUrl('SEEPROTOCOL')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data,
              list = result.pros
            if (list.length >= 2) {
              this.agree = true
            } else {
              this.agree = false
            }
//            for (let i = 0, listFlag = list[1]; i < listFlag.length; i++) {
//              list[0][i].set_ratio = listFlag[i].salary_ratio
//            }
            this.dataList = list[0]
            if (list.length > 1) {
              this.dataListFlag = list[1]
            }
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg
            })
          }
        }, datas)
      },
      // 获取日工资列表
      _getSecondaryAgent (val) {
        this.$vux.loading.show({
          text: '正在加载'
        })
        let datas = {}
        let daywageList = this.$store.state.daywageList
        let username = this.userName[0]
        this.userList[0] = []
        for (let i = 0; i < daywageList.length; i++) {
          this.userList[0].push(daywageList[i].username)
          if (username === daywageList[i].username) {
            datas.userid = daywageList[i].userid
            datas.parentid = daywageList[i].parent_id
            datas.id = daywageList[i].id
          }
        }
        datas.username = this.userName[0]
        datas.gmt_sale = this.$route.query.gmt_sale
        let salary_ratio = []
        if (val) {
//          for(let j = 0, list = this.dataList; j < list.length; j++ ) {
//            let obj = {}
//            obj.sale = list[j].sale
//            obj.salary_ratio = list[j].set_salary_ratio
//            salary_ratio.push(obj)
//          }
//          datas.salary_ratio = salary_ratio
          datas.salary_ratio = this.dataList
        }
        let httpurl = this.httpUrl('UPDATEPROTOCOL')
        this.httpAction(httpurl, (res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            if (val) {
              this.$vux.alert.show({
                title: '提示',
                content: res.data.data
              })
              this.operation = false
              this.text = '等待同意'
            } else {
              this.dataList = res.data.data.pros
              this.dataList.forEach((item) => {
                if (!item.set_salary_ratio) {
                  item.set_salary_ratio = item.salary_ratio
                }
              })
            }
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.data.msg
            })
          }
        }, datas)
      },
      // 获取url
      httpUrl (val) {
        let app = require('../../../../static/hc.json')
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

        return this.$store.state.server + this.mUtils.interFace(val) + '&sess=' + sess;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .inputBox {
    height: 0.52rem;
    line-height: 0.53rem;
    padding: 0.12rem 0;
    p {
      float: left;
      line-height: 0.52rem;
      height: 0.52rem
    }
    .searchtit {
      width: 1.3rem;
      text-indent: 3%;
      font-size: 0.24rem;
    }
    input {
      float: left;
      border: 1px solid #ccc;
      height: 0.52rem;
      border-radius: 3px;
      padding: 0 0.1rem 0;
      width: 35%;
      margin-right: 0.2rem;
      font-size: 0.24rem;
    }
  }

  .textColor {
    color: @color_c7202c;
  }

  .ratio {
    width: 1rem;
    height: 0.5rem;
    line-height: 0.51rem;
    border: 1px solid #ccc;
    padding: 0 0.1rem;
    margin-right: 0.1rem;
  }

  .stall {
    color: @color_c7202c;
    height: 0.7rem;
    line-height: 0.71rem;
    padding: 0 0.3rem;
    .add_stall {
      padding-left: 15px;
      background: url(../img/add.png) no-repeat center left;
    }
    .delete_stall {
      padding-left: 15px;
      background: url(../img/delete.png) no-repeat center left;
    }
  }

  .tips {
    height: 0.7rem;
    line-height: 0.71rem;
    background: #F3E2B6;
    color: #8C6607;
    text-align: center;
  }

  .button_save {
    .cl;
    .borderRadius(0.1rem);
    width: 90%;
    background: @color_c7202c;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    padding: 0 0.3rem;
    margin: 0.7rem 0;
    height: 0.7rem;
    line-height: 0.71rem;
    &:active {
      background: #8F2F2F;
    }
  }

  .wage_table {
    overflow: auto;
    width: 100%;
  }

  .weui-loadmore {
    top: 3rem;
  }

  .input-wrapper {
    padding: 0px;
  }

  .topPadding {
    height: 0.88rem;
  }

  .fixbottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    &:after {
      .border-1px(100%, solid, #ccc);
    }
    p {
      float: left;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
</style>
