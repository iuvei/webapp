<!--设置-->
<template>
  <div>
    <headTop headTitle="设置" goBack='true'></headTop>
    <div class="header_app_v"></div>
    <p class="tips"><i>*</i>为必填信息,银行卡绑定后需要删除或者解绑请提供充值截图,联系
您的上级,由上级提交平台申请解绑！</p>
    <div class="main">
      <ul class="userBox">
        <li :style="{marginTop:'0px'}">
          <p class="rechargetit">开户银行</p>
          <p class="rechargetR">
            <select>
              <option>中国银行</option>
              <option>农业银行</option>
              <option>工商银行</option>
              <option>建设银行</option>
            </select>
          </p>
          <br class="clear">
        </li>
        <li>
          <AddressName></AddressName>
        </li>
        <li>
           <p class="rechargetit">支行名称</p>
           <p class="rechargetR triangle_down"><input placeholder="请填写"></p>
        </li>
        <li class="tipsBox">由1至20个字符或汉字组成，不能使用特殊字符</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">开户人姓名</p>
           <p class="rechargetR"><input placeholder="请填写"></p>
        </li>
        <li class="tipsBox">请填写您的真实姓名，只能是中文字符，支持以下姓名分隔符"·"".""</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">银行卡号</p>
           <p class="rechargetR"><input placeholder="请填写"></p>
        </li>
        <li class="tipsBox">银行卡卡号由16位或19位数字组成</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">确认账号</p>
           <p class="rechargetR"><input placeholder="请填写"></p>
        </li>
        <li class="tipsBox">银行账号只能手动输入，不能粘贴</li>
      </ul>
      <p class="lockCard">锁定银行卡</p>
      <p class="unbindCard">解绑银行卡</p>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import AddressName from '../../address/Address.vue'
  export default {
      components:{
        headTop,
        AddressName
      },
      data(){
          return{

          }
      },
      methods: {

      }

  }

</script>
<style lang="less" scoped>
 @import '../../../assets/css/style';

  .topPadding{
    height:0.88rem;
  }
  .tips{
    background:#fff2bb url(../img/tanhao.png) no-repeat 0.28rem center;
    background-size:auto 50%;
    line-height:0.4rem;
    padding:0.1rem 0.28rem 0.1rem 14%;
    i{
      color: #c7202a
    }
  }
  br{
    line-height:0;
    height:0px;
  }
  .userBox>li{
      overflow: hidden;
      width:100%;
      line-height:0.7rem;
      height:auto;
      border-top:1px solid #dddddd;
      border-bottom:1px solid #dddddd;
      background: #fff;
      margin-top:0.2rem;
      input{
        width: 100%;
        height: 100%;
      }
  }
  .userBox>.tipsBox{
    margin-top:0px;
    border:none;
    background:#f6f6f6;
    color:#a4a4a4;
    text-indent: 0.28rem;
  }
  li>p{
    float: left;
    line-height: 0.7rem;
    height:0.7rem;
    font-size: 0.28rem;
  }
  .rechargetit{
    width:30%;
    text-indent:0.28rem;
  }
  .rechargetR{
    width:70%;
    text-align: right;
    select{
      border:none;
      background:none;
      width: 100%;
      height: 100%;
    }
  }

  .lockCard{
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    border-radius: 3px;
    background:#c7202c;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
  }
  .unbindCard{
    height:0.8rem;
    line-height:0.8rem;
    color: #000;
    border-radius: 3px;
    background:#fff;
    text-align:center;
    font-size:0.28rem;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
  }
  </style>
