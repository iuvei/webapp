<template>
<div>
	<headTop headTitle="设置" goBack='true'></headTop>
    <div class="header_app main"></div>
	<div class="noHave" c-if="noHave">
	  <dl>
	    <dt><img src="../img/warning.png"></dt>
	    <dd>请先设置提款密码</dd>
	  </dl>
	  <router-link to="/userInfo/setpwd" class="goSetting">前往设置</router-link>

	</div>
</div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  export default {
      components:{
        headTop,
      },
      data(){
          return{
          }
      },

  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';
  .main{
    padding-top: 1rem;
  }
 .noHave{
    dt{
      width: 20%;
      margin-left:40%;
      margin:1.04rem 0px 0.3rem 40%;
      img{
        width: 100%;
      }
    }
    dd{
      text-align:center;
      margin-bottom:0.4rem;
    }
  }
  .goSetting{
    width: 20%;
    border-radius: 3px;
    border:1px solid #dddddd;
    background:#fff;
    display: block;
    text-align:center;
    height:0.5rem;
    line-height:0.5rem;
    margin-left:40%;
  }
</style>
