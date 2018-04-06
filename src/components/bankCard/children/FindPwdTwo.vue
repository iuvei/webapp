
<!--修改提款密码-->
<template>
  <div>
    <headTop headTitle="设置" goBack='true'></headTop>
    <div class="topPadding"></div>
    <div class="header_app_v">
      <ul class="userBox">
        <li>
           <p class="rechargetit">新密码</p>
           <p class="rechargetR"><input placeholder="请输入您的新密码"></p>
        </li>
        <li class="tipsBox">密码由字母和数字组成6-16个字符；且必须包含数字和字母</li>
        <li :style="{marginTop:'0px'}">
           <p class="rechargetit">再次确认</p>
           <p class="rechargetR"><input placeholder="请再次您的新密码"></p>
        </li>
      </ul>
      <p class="submit">提交</p>
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
    i{
      color: #c7202a
    }
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

  .submit{
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

  </style>
