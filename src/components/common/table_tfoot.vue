<template>
    <div class="tfoot" v-show="datas.tfootFlag">
      <div class="table_tfoot_1">
        <ul class="table_dividend table_body clear" v-if="datas.tfootFlag">
          <li v-text="$route.query.dividend ? '个人结余' : '总计'" style="width: 100%;"></li>
        </ul>
      </div>
      <div class="table_tfoot_2">
        <ul class="table_dividend table_body tfoot_2 clear" v-if="datas.tfootFlag">
          <li v-tap="{ methods:_clickUserName, item: item}" v-for="item in datas.tfoot" :class="{underline: item == 'buttons_dividend'}">
            {{datas.sum[item] | tfootFilter(item)}}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default{
    // 接收父组件传过来的参数
    props: ['datas'],
    data () {
      return{
        show: false
      }
    },
    methods: {
      _clickDropdown () {
        this.show = !this.show
        let clickDown = this.$refs.dropdown
        if (this.show) {
          clickDown.src = require('../userInfo/img/up.png')
        } else {
          clickDown.src = require('../userInfo/img/dropDown.png')
        }
        this.$emit('getShowTeamTable', this.show)
      },
      // 点击查看
      _clickUserName(params) {
        if (params.item == 'buttons_dividend') {
          this.$router.push({path: '/userInfo/HistoryDividend', query: { username: params.row.username}})
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .tfoot{
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
  }

  .table_tfoot_1{
    float: left;
    width: 35%;
    .table_dividend{
      border-right: 1px solid #aaa;
      li{
        float: left;
        text-align: center;
      }
      li:nth-child(1){
        width: 40%;
      }
      li:nth-child(2){
        width: 60%;
      }
    }

    .table_body{
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
    }
    .table_body:nth-child(2n+1){
      background:#fff;
    }
  }
  .table_tfoot_2{
    float: left;
    width: 65%;
    overflow-x:scroll;
    overflow-y: hidden;
    .table_dividend{
      width:1700px;
      li{
        float: left;
        text-align: center;
        width: 80px;
      }
    }
    .table_body{
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
    }
    .table_body:nth-child(2n+1){
      background:#fff;
    }
  }

  .underline{
    text-decoration: underline;
  }
  .buttons_color{
    color: #10aeff;
  }
</style>
