<template>
  <div>
    <div class="inputBox" v-if="dateSelectOne">
      <p class="searchtit">日期</p>
      <p class="time_one" v-model="starttimeOne" plain @click="_startTimeOne" v-text="starttimeOne"></p>
    </div>
    <div class="inputBox" v-else>
      <p class="searchtit">查询范围</p>
      <p class="time" v-model="starttime" plain @click="_startTime" v-text="starttime"></p>
      <p>&nbsp;至&nbsp;</p>
      <p class="time" v-model="endtime" plain @click="_endTime" v-text="endtime"></p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['starttime', 'endtime', 'dateSelectOne', 'starttimeOne', 'noTime'],
    data () {
      return {
        startdatetime: '',
        enddatetime: ''
      }
    },
    mounted() {
    },
    methods: {
      _startTimeOne () {
        let _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          yearRow: '{value} 年',
          monthRow: '{value} 月',
          dayRow: '{value} 日',
          format: 'YYYY-MM-DD',
          value: _this.starttimeOne,
          onConfirm (val) {
            _this.startOneConfirm(val)
          }
        })
      },
      _startTime () {
        let _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          yearRow: '{value} 年',
          monthRow: '{value} 月',
          dayRow: '{value} 日',
          format: 'YYYY-MM-DD',
//          startDate: _this.mUtils.setDateTime(-30),
//          endDate: _this.mUtils.setDateTime(1),
          value: _this.starttime.split(' ')[0],
          onConfirm (val) {
            _this.startConfirm(val)
          }
        })
      },
      _endTime () {
        let _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          yearRow: '{value} 年',
          monthRow: '{value} 月',
          dayRow: '{value} 日',
          format: 'YYYY-MM-DD',
//          startDate: _this.mUtils.setDateTime(-29),
          value: _this.endtime.split(' ')[0],
          onConfirm (val) {
            _this.endConfirm(val)
          }
        })
      },
      startOneConfirm(time) {
        this.$emit('getStartOneTime', time)
      },
      startConfirm (time) {
        this.startdatetime = time
        let starttime
        if (this.noTime) {
          starttime = time
        } else {
          starttime = time + ' 2:00:00'
        }
        this.$emit('getStartTime', starttime)
      },
      endConfirm (time) {
        this.enddatetime = time
        let endtime
        if (this.noTime) {
          endtime = time
        } else {
          endtime = time + ' 2:00:00'
        }
        this.$emit('getEndtime', endtime)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/mintUI.css';
  @import '../../assets/css/style';

  .inputBox {
    height: 0.52rem;
    padding: 0.12rem 0;
    z-index: 9999999;
    width: 100%;
    p {
      float: left;
      line-height: 0.52rem;
      height: 0.52rem;
    }
    .time{
      box-sizing: border-box;
      border: 1px solid #ccc;
      .borderRadius(0.05rem);
      width: 35%;
      padding:0 0.1rem;
      /*text-align: center;*/
      font-size: 0.24rem;
    }
    .time_one{
      border: 1px solid #ccc;
      .borderRadius(0.05rem);
      padding:0 0.1rem;
      /*text-align: center;*/
      width: 35%;
      font-size: 0.24rem;
    }
    .searchtit {
      width: 20%;
      text-indent: 3%;
      font-size: 0.24rem;
      margin-top: 0.04rem;
    }
  }
  @media screen and (max-width: 350px) {
    .time {
      box-sizing: content-box !important;
      padding:0 !important;
    }
  }
</style>
