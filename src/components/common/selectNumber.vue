<template>
  <div>
    <div class="select_number">
      <p v-tap="{ methods: minus}">-</p>
      <input type="text" v-model="codeNumber" @keyup="changeNum" @blur='changeNum'>
      <p v-tap="{ methods: add}">+</p>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        codeNumber: 1
      }
    },
    props: ['min', 'minuss'],
    mounted () {
      this.codeNumber = parseFloat(this.min)
    },
    methods: {
    	changeNum(){
    		let regx = /^[0-9]*[1-9][0-9]*$/
        if(this.codeNumber == ''){
          return
        }
    		if(!regx.test(this.codeNumber)){
    			this.codeNumber = parseFloat(this.min)
          this.$emit('getCodeNumber', this.codeNumber)
    		}else {
          this.$emit('getCodeNumber', this.codeNumber)
        }
    	},
      minus () {
        if (this.codeNumber === parseFloat(this.min)) {
          this.codeNumber = parseFloat(this.min)
        } else {
          this.codeNumber -= parseFloat(this.minuss)
        }
        this.$emit('getCodeNumber', this.codeNumber)
      },
      add () {
        this.codeNumber = +this.codeNumber + +parseFloat(this.minuss)
        this.$emit('getCodeNumber', this.codeNumber)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  /*@media screen and (max-width: 330px) {*/
    /*.select_number{*/
      /*margin: 0 !important;*/
    /*}*/
  /*}*/
  .select_number{
    box-sizing: border-box;
    height: 0.53rem;
    line-height: 0.55rem;
    text-align: center;
    border:0.01rem solid #7D7D7D;
    font-size: 0;
    margin: 0 0.1rem;
    white-space:nowrap;
    p{
      box-sizing: border-box;
      float:left;
      .wh(0.5rem,100%);
      color:#626262;
      background:#E8E8E8;
      font-size: 0.3rem;
      &:first-child{
        border-right:0.01rem solid #7D7D7D;
      }
      &:last-child{
        border-left:0.01rem solid #7D7D7D;
      }
      &:active{
        background:#ccc;
      }
    }
    input{
      .wh(0.6rem,100%);
      float:left;
      text-align: center;
      color:@color_font;
      background:#fff;
      font-size: 0.28rem;
      padding: 0;
    }
  }
</style>
