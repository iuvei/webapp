<template>
  <div class="set_salary_content">
    <headTop headTitle="签订日工资契约" goBack='true'></headTop>
    <p class="text_name">用户名： {{agentDetail.username}}</p>
    <table class="set_salary" width="100%" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr align="center">
        <td>日销量</td>
        <td>活跃用户</td>
        <td>日工资比例</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr align="center" v-for="(item, index) in newSalary">
        <td width="25%">
          <input type="text" v-model="item.sale" @input="verifyNumber(newSalary, index)">
        </td>
        <td width="25%">
          <input type="text" v-model="item.active_member">
        </td>
        <td width="25%">
          <input type="text" v-model="item.salary_ratio">%
        </td>
        <td width="25%">
          <p v-tap="{ methods: _onDelete }" v-if="index == newSalary.length - 1" class="delete_text">删除</p>
        </td>
      </tr>
      </tbody>
    </table>
    <ul class="hint_text">
      <li><icon type="warn" style="font-size: 0.28rem"></icon>当日投注金额≥1000元，计为一个活跃用户。</li>
      <li style="padding-left: 0.4rem">日工资契约签订后无法修改，如需修改请联系平台。</li>
    </ul>

    <ul class="btn_list" v-if="agentDetail.daily_salary_status=='2' || agentDetail.daily_salary_status=='3'">
      <li>
        <x-button plain type="primary" v-tap="{ methods: _onAddSale }">添加档位</x-button>
      </li>
      <li>
        <flexbox>
          <flexbox-item>
            <x-button type="warn" v-tap="{methods: onDiviratio}">确定</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="default" v-tap="{methods: _goBack}">取消</x-button>
          </flexbox-item>
        </flexbox>
      </li>
    </ul>

    <div class="old_salary_content" v-if="agentDetail.oldSalary instanceof Array && agentDetail.oldSalary.length > 0">
      <p>旧版日工资参考：</p>
      <table width="100%" border="1" cellspacing="0">
        <thead>
        <tr align="center">
          <td>日销量</td>
          <td>活跃人数</td>
          <td>日工资比例</td>
        </tr>
        </thead>
        <tbody>
        <tr align="center" v-for="item in agentDetail.oldSalary">
          <td>{{item.sale}}</td>
          <td>{{item.active_member}}</td>
          <td>{{item.salary_ratio}}%</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import headTop from '../../header/Header.vue'
  import { Icon, Flexbox, FlexboxItem, XButton } from 'vux'
  export default{
    components: {
      headTop,
      Icon,
      Flexbox,
      FlexboxItem,
      XButton
    },
    data(){
      return {
        agentDetail: this.$store.state.agentDetail,
        newSalary: this.$store.state.agentDetail.newSalary
      }
    },
    mounted() {
    },
    methods: {
      verifyNumber(newSalary, index) {
        let reg = /^[0-9]*$/, str = newSalary[index].sale,
          r = reg.test(str);
        if (!r) {
          this.newSalary[index].sale = str.substring(0, str.length - 1)
        }
      },
      /*添加档位*/
      _onAddSale() {
        if(this.newSalary.length >= 3){
          this.$vux.alert.show({
            title: '温馨提示',
            content: '日工资契约最多保留三个挡位'
          })
          return
        }
        this.newSalary.push({
          sale: '',
          active_member: '',
          salary_ratio: '',
        });
      },
      /*删除档位*/
      _onDelete() {
        if (this.newSalary.length <= 1) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '日工资契约最低保留一个挡位'
          })
          return
        }
        this.newSalary.pop()
      },
      /*提交协议*/
      onDiviratio() {
        let _this = this;
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '确认要修改日工资契约吗?',
          onConfirm () {
            _this.setProtocol()
          }
        })
      },
      setProtocol() {
        this.httpAction(this.httpUrl('UPDATEPROTOCOL'), (res) => {
          if (res.data.status == 200) {
            this.$router.go(-2)
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.data.repsoneContent,
              onHide() {

              }
            })
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.data.shortMessage,
            });
          }
        }, {
          userid: this.agentDetail.userid,
          parentid: this.agentDetail.parentid,
          salary_ratio: this.newSalary,
        })
      },

      _goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="less" scoped>
  .set_salary_content{
    font-size: 0.28rem;
    tbody{
      input{
        border: 1px solid #ddd;
        border-radius: 3px;
        width: 80%;
      }
      .delete_text{
        padding: 0.12rem 0;
        color: #f00;
        text-decoration: underline;
      }
    }
  }
  .text_name{
    padding: 0.16rem 0.2rem;
    border-bottom: 1px solid #ddd;
  }
  .hint_text{
    margin: 0.3rem 0.2rem 0.1rem;
    font-size: 0.24rem;
    color: #5a5a5a;
  }
  .set_salary{
    background: #fff;
    td{
      border-bottom: 1px solid #ddd;
      padding: 0.16rem 0;
    }
    thead{
      tr td{

      }
    }
    tbody{
      input{
        text-align: center;
      }
    }
  }
  .btn_list{
    margin: 0.2rem;
    li{
      margin-bottom: 0.5rem;
    }
    button.weui-btn{
      width: 99%;
    }
  }
  .old_salary_content{
    margin: 0 0.2rem;
    p{
      padding: 0.16rem 0;
    }
    table{
      border-color: #ddd;
      thead td{
        width: 33%;
      }
    }
  }
</style>
