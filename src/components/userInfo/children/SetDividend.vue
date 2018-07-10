<template>
  <div class="set_dividend_content">
    <headTop headTitle="签订分红契约" goBack='true'></headTop>
    <p class="text_name">用户名： {{agentDetail.username}}</p>
    <div class="d_text">
      用户每半月结算净盈亏总值时为负数，可获得分红，金额为亏损值的
      <x-input class="dividend_input"
               type="number"
               :show-clear="false"
               v-model="dividendPoint"
      >
      </x-input>%。
    </div>
    <p class="text_color">{{hintDividend}}</p>
    <div class="set_proup_btn">
      <flexbox>
        <flexbox-item>
          <x-button type="warn" :show-loading="dividendLoading" v-tap="{methods: _setDividend}">确定</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="default" v-tap="{methods: _goBack}">取消</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import headTop from '../../header/Header.vue'
  import { XInput, XButton, FlexboxItem, Flexbox } from 'vux'
  export default{
    components: {
      headTop,
      XButton,
      XInput,
      FlexboxItem,
      Flexbox
    },
    data(){
      return {
        agentDetail: this.$store.state.agentDetail,
        dividendPoint: '',
        dividendLoading: false,
        hintDividend: '',
      }
    },
    mounted() {
    },
    methods: {
      _setDividend() {
        let dp = this.dividendPoint
        if(dp == '' || dp < 0){
          this.hintDividend = '填写的比例必须大于0 ！'
          return
        }
        this.dividendLoading = true
        this.httpAction(this.httpUrl('RATIO'), (res) => {
          this.dividendLoading = false
          let result = res.data;
          if (result.status == 200) {
            this.$router.go(-2)
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
      _goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="less" scoped>
  .set_dividend_content{
    font-size: 0.28rem;
  }
  .text_name{
    padding: 0.16rem 0.2rem;
    border-bottom: 1px solid #ddd;
  }
  .d_text{
    margin: 0.5rem 0.2rem 0.2rem;
    .dividend_input{
      width: 20%;
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 0.1rem;
      background: #fff;
    }
  }
  .set_proup_btn{
    margin: 0.25rem;
  }
  .text_color{
    color: #CB1313;
    margin-left: 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }
</style>
