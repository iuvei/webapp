<template>
  <div class="noDate">
    <p><img src="./img/noDate.png"></p>
    <p class="zi">暂时没有数据</p>
  </div>
</template>
<style lang="less" scoped>
  .noDate {
    position: absolute;
    top: 20%;
    text-align: center;
    z-index: -1;
    p {
      width: 80%;
      margin-left: 10%;
      img {
        width: 100%;
      }
    }
    .zi {
      text-align: center;
      color: #767676
    }
  }
</style>
