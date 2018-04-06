<template>
  <div>
    <headTop headTitle="团队管理" goBack='true'></headTop>
    <div class="main">
      <ul class="details_list">
        <li class="list_li">
          <div>
            <span class="details_type">用户名</span>
            <span class="details_text">weapon999</span>
          </div>
        </li>
        <li class="list_li">
          <div>
            <span class="details_type">注册事件</span>
            <span class="details_text">weapon999</span>
          </div>
        </li>
        <li class="list_li">
          <div>
            <span class="details_type">返点级别</span>
            <span class="details_text">7.5%</span>
            <span class="details_rebate" v-tap="{ methods:showRebate}">返点提升
              <i class="arrows_down rebate_hook"></i>
            </span>
            <transition name="slideDown">
              <div class="onekey_setting" v-show="showDown">
                <span>自身保留返点</span>
                <input class="setting_input" type="text" placeholder="自身最少保留0.1">
                <p class="setting_button">一键设置</p>
              </div>
            </transition>
          </div>
        </li>
        <li class="list_li">
          <div>
            <span class="details_type">账户余额</span>
            <span class="details_text">weapon999</span>
          </div>
        </li>
        <li class="list_li">
          <div>
            <span class="details_type">最后一次登陆</span>
            <span class="details_text">weapon999</span>
          </div>
        </li>
      </ul>
      <div class="quota">
        <span class="quota_text"  v-tap="{ methods:showQuota}">
          配额设定
          <i class="arrows_down quota_hook"></i>
        </span>
        <transition name="quotaDown">
          <section class="quota_setting" v-show="quotaDown">
            <div >
              <p class="quota_list">
                7.2%-7.2%区间返点区间配额为
                <input class="quota_input" type="text">
                (当前可用33个)
              </p>
              <p class="quota_list">
                7.2%-7.2%区间返点区间配额为
                <input class="quota_input" type="text">
                (当前可用33个)
              </p>
              <div class="button_submit cl">
                <buttonView buttonTitle="提交" width="3"></buttonView>
              </div>
            </div>
          </section>
        </transition>
      </div>
    </div>
  </div>

</template>
<script>
  import headTop from '../../../header/Header.vue'
  import buttonView from '../../../common/button.vue'

  export default {
    data(){
        return {
          showDown:false,//隐藏返点提升
          quotaDown:false//隐藏配额设定
        }
    },
    components:{
      headTop,
      buttonView
    },
    methods:{
      showRebate(){
        let rebate_hook=document.getElementsByClassName('rebate_hook')[0];
          if(this.showDown===false){
            this.showDown=true;
            rebate_hook.style.transition='0.2s all linear';
            rebate_hook.style.transform='rotate(-45deg)';
            rebate_hook.style.webkitTransform='rotate(-45deg)';
          }else{
            this.showDown=false;
            rebate_hook.style.transform='rotate(135deg)';
            rebate_hook.style.webkitTransform='rotate(135deg)';
          }
      },
      showQuota(){
        let quota_hook=document.getElementsByClassName('quota_hook')[0];
        if(this.quotaDown===false){
          this.quotaDown=true;
          quota_hook.style.transition='0.2s all linear';
          quota_hook.style.transform='rotate(-45deg)';
          quota_hook.style.webkitTransform='rotate(-45deg)';
        }else{
          this.quotaDown=false;
          quota_hook.style.transform='rotate(135deg)';
          quota_hook.style.webkitTransform='rotate(135deg)';
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/css/style';

  @slideDown_height:1rem;
  @quotaDown_height:2.5rem;
  .onekey_setting{
    width:100%;
    height:@slideDown_height;
    overflow:hidden;
  }
  .slideDown-enter-active, .slideDown-leave-active {
    transition: .2s all linear;
    width:100%;
    height:@slideDown_height;
  }
  .slideDown-enter ,.slideDown-leave-active{
    width:100%;
    height:0;
  }

  .quota_setting{
    position: relative;
    width:100%;
    height:@quotaDown_height;
    overflow:hidden;
  }
  .quotaDown-enter-active, .quotaDown-leave-active {
    transition: .2s all linear;
    width:100%;
    height:@quotaDown_height;
  }
  .quotaDown-enter ,.quotaDown-leave-active{
    width:100%;
    height:0;
  }

  .details_rebate{
    position: relative;
    margin-left:1rem;
    font-weight: bold;
  }
  .arrows_down{
    .icon_arrows(0,-0.5rem,#aaa,0.2rem,135deg)
  }
  .setting_input{
    border:1px solid #ccc;
    padding: 0.05rem 0.1rem;
    width:110px;
    margin-left:0.1rem;
  }
  .setting_button{
    display: inline-block;
    background: @color_c7202c;
    color:#fff;
    .wh(80px,25px);
    line-height: 26px;
    text-align: center;
    .borderRadius(4px);
  }

  .quota{
    margin:0.4rem 0.1rem;
    .quota_text{
      text-decoration:underline;
      position: relative;
    }
    .quota_list{
      padding:0.1rem 0;
    }
    .quota_input{
      box-sizing: border-box;
      width:50px;
      border:1px solid #ccc;
      padding:0.05rem 0.1rem;
    }
    .button_submit{
      margin-top:0.2rem;
    }
  }
</style>
