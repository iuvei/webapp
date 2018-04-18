<template>
  <div>
    <span class="add_next"
          :style="{ width: width + 'rem',height:height+'rem',lineHeight: (parseFloat(height)+0.02)+'rem'}">{{buttonTitle}}</span>
  </div>
</template>
<script>
  export default {
    props: ['buttonTitle', 'width', 'height']
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .add_next {
    display: inline-block;
    .borderRadius(0.1rem);
    background: @color_c7202c;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    padding: 0 0.3rem;
    &:active {
      background: #8F2F2F;
    }
  }

</style>
