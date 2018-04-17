<!--追号详情-->
<template>
  <div>
    <headTop headTitle="投注详情" goBack='true'></headTop>
    <div class="header_app_v">
      <ul class="detail clear">
        <li>
          <p class="detailTit">注单编号</p>
          <p class="detailTitR" v-text="dataList.projectid"></p>
        </li>
        <li>
          <p class="detailTit">奖期</p>
          <p class="detailTitR" v-text="dataList.issue"></p>
        </li>
        <li>
          <p class="detailTit">用户名</p>
          <p class="detailTitR" v-text="dataList.username"></p>
        </li>
        <li>
          <p class="detailTit">投单时间</p>
          <p class="detailTitR" v-text="dataList.writetime"></p>
        </li>
        <li>
          <p class="detailTit">彩种</p>
          <p class="detailTitR" v-text="dataList.cnname"></p>
        </li>
        <li>
          <p class="detailTit">玩法</p>
          <p class="detailTitR" v-text="dataList.methodname"></p>
        </li>
        <li>
          <p class="detailTit">投注倍数</p>
          <p class="detailTitR" v-text="dataList.multiple"></p>
        </li>
        <li>
          <p class="detailTit">状态</p>
          <p class="detailTitR">
            <span v-if="dataList.iscancel==0&&dataList.isgetprize==0">未开奖</span>
						<span v-if="dataList.iscancel==0&&dataList.isgetprize==2">未中奖</span>
						<span v-if="dataList.iscancel==0&&dataList.isgetprize==1&&dataList.prizestatus == 0">未派奖</span>
						<span v-if="dataList.iscancel==0&&dataList.isgetprize==1&&dataList.prizestatus != 0">已派奖</span>
						<span v-if="dataList.iscancel==1">本人撤单</span>
						<span v-if="dataList.iscancel==2">管理员撤单</span>
						<span v-if="dataList.iscancel==3">开错奖撤单</span>
          </p>
        </li>
        <li>
          <p class="detailTit">投注总金额</p>
          <p class="detailTitR">{{dataList.totalprice}}</p>
        </li>
        <li>
          <p class="detailTit">奖金</p>
          <p class="detailTitR">{{dataList.bonus}}</p>
        </li>
        <li>
          <p class="detailTit">模式</p>
          <p class="detailTitR">{{dataList.modes}}</p>
        </li>
        <li>
          <p class="detailTit">开奖号码</p>
          <p class="detailTitR" v-html="dataList.nocode"></p>
        </li>
        <li>
          <p class="detailTit">投注内容</p>
          <p class="detailTitR">{{dataList.code}}</p>
        </li>
      </ul>
      <div class="save" v-if="(dataList.iscancel==0&&dataList.isgetprize==0)" v-tap="{ methods:save}">撤单</div>
    </div>
  </div>

</template>
<script>
  import headTop from '../../header/Header.vue'

  export default {
    data () {
      return {
        dataList: {}
      }
    },
    components: {
      headTop
    },
    mounted () {
    	this.dataList = this.$route.query.data
    },
    methods: {
    	save () {
        let _this = this
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '确定撤单吗',
          // 组件除show外的属性
          onCancel () {
          },
          onConfirm () {
            let httpurl = _this.httpUrl('CANCELGAME')
            let mapg = {}
            mapg['id'] = _this.dataList.projectid
            mapg['play_source'] = 5
            _this.httpAction(httpurl, (res) => {
              if (res.data.status == 200) {
                _this.$store.commit('updateUserInfoChildFlag', true)
                _this.$vux.alert.show({
                  content: res.data.msg,
                  onHide () {
                    _this.$router.replace('/userInfo/betRecord')
                  }
                })
              } else {
                _this.$vux.alert.show({
                  content: res.data.msg
                })
              }
            }, mapg)
          }
        })
    	},
    	//获取url
      httpUrl(val){
        let app = require('../../../../static/hc.json')
        let appData = app
        let serverList = appData.serverList
        let j = Math.floor(Math.random() * serverList.length)
        if (this.$store.state.server == null) {
          this.$store.commit('updateServer', window.location.origin)
        }
        if (this.$store.state.lotteryType == null) {
          this.$store.commit('updateLotteryType', appData.lotteryType)
        }
        let sess
        if (this.$store.state.sess != null) {
          sess = this.$store.state.sess
        } else {
          sess = sessionStorage.getItem('sess')
        }

        return this.$store.state.server + this.mUtils.interFace(val)+'&sess='+sess;
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .header_app_v{
    .detail{
      background: #fff;
      li{
        position: relative;
        clear: both;
        background: #fff;
        &:after{
          .border-1px(100%,solid,#dddddd);
        }
        p{
          float: left;
          margin: 0.17rem 0;
        }
        .detailTit{
          width: 25%;
          text-indent:0.28rem;
          color: #323232;
        }
        .detailTitR{
          width: 75%;
          color: #6e6e6e;
          word-wrap:break-word;
          margin: 0.17rem 0;
        }
        .red{
          color:#ec0b0b
        }
      }
    }
  }
  .seechase{
    background:#c7202a;
    height:0.8rem;
    line-height:0.8rem;
    color: #fff;
    text-align: center;
    width: 94%;
    margin-left: 3%;
    border-radius: 4px;
    margin-top:0.3rem;
  }
	.save{
		  height: 0.8rem;
	    line-height: 0.8rem;
	    color: #fff;
	    border-radius: 3px;
	    background: #c7202a;
	    text-align: center;
	    font-size: 0.28rem;
	    margin: 0.4rem 0;
	    width: 94%;
	    margin-left: 3%;
	}
</style>
