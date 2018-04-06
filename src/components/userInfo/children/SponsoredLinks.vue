<!--推广链接-->
<template>
  <div>
    <headTop headTitle="推广链接" goBack='true'></headTop>
    <form @submit.prevent="submit">
      <div class="header_app">
        <ul class="linkBox">
          <li class="registerType">
            <p class="linkL">用户类型</p>
            <p :style="{paddingLeft:'0.28rem'}">
              <span class="r_member" :class="{ activeType: isActiveType == 1}" v-tap="{ methods:setCurM}">会员</span>
              <span class="r_agent" :class="{ activeType: isActiveType == 0}" v-tap="{ methods:setCurA}">代理</span>
            </p>
            <br class="clear">
          </li>
          <li>
            <p class="linkL">自身保留返点</p>
            <p>
              <input type="number" step="0.1" @blur="_blur" v-model="keeppoint" placeholder="自身至少保留0.1" >
            </p>
            <br class="clear">
          </li>
          <li class="minMax">自身保留返点0.1%</li>
          <li style="margin-bottom: 0.2rem;">
            <p class="linkL">您的返点</p>
            <p class="selfRebate">{{selfPoint}}%</p>
            <br class="clear">
          </li>
          <li>
            <p class="linkL">您的下级返点</p>
            <p class="subordinateRebate">{{selfSubPoint}}</p>
            <br class="clear">
          </li>
          <li class="minMax">推广链接生成的账号返点不可超过{{global_limitpoints}}%</li>
        </ul>
        <div class="generateLinks">
          <input type="submit" v-model="affirm">
        </div>
        <div class="linkUrl clear" v-if="iSLinkUrl">
          <div class="left" style="width: 2rem; font-size: 0.28rem;">您的链接地址：</div>
          <div class="link left" style="width: 71%;" id="kwd" v-text="url"></div>
          <div class="select_copy">
            <p  @click="_copys('url_hook',url)" class="button_copy url_hook left">点击复制链接</p>
            <p @click="_code"  class="button_copy right">生成二维码</p>
          </div>
        </div>
      </div>
      <ul>
        <li v-for="items in AllLotterys">
          <input type="hidden" name='lotteryid' v-model="items.lotteryid">
          <input type="hidden" :name='items.nameindefinitepoints_' v-model="items.indefinite">
          <input type="hidden" :name='items.namenormalpoints_' v-model="items.normal">
        </li>
      </ul>
    </form>
    <div v-transfer-dom>
      <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
        <div class="img-box">
          <div id="qrcode"></div>
        </div>
        <div  class="close">
          <span class="vux-close" @click="close">关闭</span>
          <a id="downloadLink" target="_blank"></a>
          <span class="vux-close" @click="downloadClick">下载</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import { XDialog, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      headTop,
      XDialog
    },
    data () {
      return {
        usertype: 0,
        isActiveType: 1,
        showNoScroll: false,
        affirm: '确认',
        AllLotterys: [], // 隐藏域内容
        keeppoint: '', // 自身保留返点
        maxKeeppoint: 0, // 最大自身保留返点
        subkeeppoint: 0, // 下级返点
        selfPoint: 0, // 自己返点
        selfSubPoint: '',
        url: '', // 链接地址
        urlflag: '',
        global_limitpoints: 0,
        iSLinkUrl: false,
        lotterysList: []
      }
    },
    watch: {
      keeppoint: {
        deep: true,
        handler: function (val, oldVal) {
          if (this.keeppoint.indexOf('.') > -1) {
            this.keeppoint = this.keeppoint.split('.')[0] + '.' + this.keeppoint.split('.')[1].substring(0, 1)
          }
          this._getInputData()
        }
      },
      usertype: {
        deep: true,
        handler: function (val, oldVal) {
          this.url = this.urlflag+'&usertype='+val
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$vux.toast.hide()
      next(true)
    },
    mounted () {
      this._getLinks()
    },
    methods: {
      downloadClick () {
        // 获取base64的图片节点
        let img = document.getElementById('qrcode').getElementsByTagName('canvas')[0];
        // 构建画布
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        // 构造url
        let url = canvas.toDataURL('image/png');
        // 构造a标签并模拟点击
        let downloadLink = document.getElementById('downloadLink');
        downloadLink.setAttribute('href', url);
        downloadLink.setAttribute('download', '恒彩二维码.png');
        downloadLink.click();
      },
      close() {
        this.showNoScroll=false
        clearTimeout(times)
        let times = setTimeout(function(){
          let qrcode = document.getElementById('qrcode')
          let childs = qrcode.childNodes
          qrcode.removeChild(childs[0])
        },200)
      },
      _code() {
        $("#qrcode").qrcode({
          render : "canvas",
          text : this.url,
          width : "236",
          height : "200",
          background : "#ffffff",
          foreground : "#000000",
          src: require('../img/icon.png')
        });
        this.showNoScroll=true
      },
      setCurM () {
        this.isActiveType = 1
        this.usertype = 0
      },
      setCurA () {
        this.isActiveType = 0
        this.usertype = 1
      },
      _copys(_class,val){
        let _this = this
        let clipboard = new Clipboard('.'+ _class,{
          text:function() {
            return val;
          }
        });
        clipboard.on('success', function(e) {
          _this.$vux.toast.show({
            text: '复制成功'
          })
        });
        clipboard.on('error', function(e) {
          _this.$vux.toast.show({
            text: '复制失败'
          })
        });
      },
      // 请求推广链接
      _getLinks () {
        let httpurl = this.httpUrl('MARKETING')
        this.httpAction(httpurl,(res) => {
          this.lotterysList = res.data.aLotteryData
          if (res.data.domainList[0] == undefined) {
            this.iSLinkUrl = false
          } else {
            this.iSLinkUrl = true
//            this.urlflag = res.data.domainList[0]+'/_api/registeracount.php?roset='+res.data.encodeuid+'&nomobile=1'
//            this.url = this.urlflag+'&usertype='+this.usertype
            this.urlflag = window.location.origin+'/m/activity/index.html?roset='+res.data.encodeuid
            this.url = this.urlflag+'&usertype='+this.usertype
          }
          this._getInputData()
        })
      },
      _getInputData () {
        let TempAllLotterys = this.lotterysList
        for (let i = 0; i < TempAllLotterys.length; i++) {
          if (TempAllLotterys[i].lotteryid == '1') {
            this.maxKeeppoint = TempAllLotterys[i].normalpoints.maxnormalpoints
            this.global_limitpoints = TempAllLotterys[i].normalpoints.global_limitpoints
            this.selfPoint = TempAllLotterys[i].normalpoints.point
            this.subkeeppoint = this.maxKeeppoint - this.keeppoint
          }
          if (TempAllLotterys[i].normalpoints === undefined || TempAllLotterys[i].normalpoints.point === 0 || TempAllLotterys[i].normalpoints.point === '') {
            TempAllLotterys[i].normal = ''
          } else {
            TempAllLotterys[i].namenormalpoints_ = 'normalpoints_' + TempAllLotterys[i].lotteryid
            TempAllLotterys[i].normal = (TempAllLotterys[i].normalpoints.point - this.keeppoint).toFixed(1)
//              || TempAllLotterys[i].normalpoints.extnormalpoints === false
            if (TempAllLotterys[i].normal < 0) {
              TempAllLotterys[i].normal = '0'
            } else if (parseFloat(TempAllLotterys[i].normal) > parseFloat(TempAllLotterys[i].normalpoints.global_limitpoints)) {
              TempAllLotterys[i].normal = TempAllLotterys[i].normalpoints.global_limitpoints
            } else {
            }
          }
          if (TempAllLotterys[i].Indefinitepoints === undefined || TempAllLotterys[i].Indefinitepoints.point === 0 || TempAllLotterys[i].Indefinitepoints.point === '') {
            TempAllLotterys[i].indefinite = null
          } else {
            TempAllLotterys[i].indefinite = (TempAllLotterys[i].Indefinitepoints.maxIndefinitepoints - this.keeppoint).toFixed(1)
//              || TempAllLotterys[i].Indefinitepoints.extindefinitepoints === false
            if (TempAllLotterys[i].indefinite < 0) {
              TempAllLotterys[i].indefinite = null
            } else if (parseFloat(TempAllLotterys[i].indefinite) > parseFloat(TempAllLotterys[i].Indefinitepoints.global_limitpoints)) {
              TempAllLotterys[i].indefinite = TempAllLotterys[i].Indefinitepoints.global_limitpoints
            }
          }
          TempAllLotterys[i].nameindefinitepoints_ = 'indefinitepoints_' + TempAllLotterys[i].lotteryid
        }
        this.AllLotterys = TempAllLotterys
      },
      _blur () {
        this.selfSubPoint = (this.selfPoint - this.keeppoint).toFixed(1) + '%'
        if (this.selfSubPoint.indexOf('-') > -1 || parseFloat((this.selfPoint - this.keeppoint).toFixed(1)) > parseFloat(this.global_limitpoints) || this.selfSubPoint == 'NaN%' || this.selfSubPoint < 0) {
          this.selfSubPoint = ''
          return
        }
        this.keeppoint = parseFloat(this.keeppoint).toFixed(1)
      },
      // 生成链接
      submit (e) {
        this.selfSubPoint = (this.selfPoint - this.keeppoint).toFixed(1) + '%'
        if (this.keeppoint == '' || this.keeppoint == 'NaN') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请输入自身保留返点'
          })
          this.selfSubPoint = ''
          return
        }
        if (this.selfSubPoint.indexOf('-') > -1 || parseFloat(this.selfSubPoint) > parseFloat(this.global_limitpoints)) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '您的下级返点不能超过' + this.global_limitpoints + '%' + '</br>请重新输入！'
          })
          if (this.selfSubPoint.indexOf('-') > -1) {
            this.selfSubPoint = ''
          }
          return
        }
        if (this.keeppoint > this.selfPoint) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '自身保留返点不能大于您的返点'
          })
          return
        }
        if (this.selfSubPoint == '') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请输入自身保留返点'
          })
          return
        }
        this.affirm = '提交中...'
        let formData = this.formser(e.target)
        formData.lotteryid = formData.lotteryid.split(',')
        let httpurl = this.httpUrl('MARKETING')
        this.httpAction(httpurl,(res) => {
          this.affirm = '确认'
          if (res.data.status == 1) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '返点设置不合理,返点设置低于了该用户对其下级设置'
            })
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.data.msg
            })
          }
        },formData)
      },
      formser (form) {
        let arr = {}
        for (let i = 0; i < form.elements.length; i++) {
          let feled = form.elements[i]
          switch (feled.type) {
            case undefined:
            case 'button':
            case 'file':
            case 'reset':
            case 'submit':
            case 'text':
            case 'number':
              break
            case 'checkbox':
            case 'radio':
              if (!feled.checked) {
                break
              }
            default:
              if (arr[feled.name]) {
                arr[feled.name] = arr[feled.name] + ',' + feled.value
              } else {
                arr[feled.name] = feled.value
              }
          }
        }
        return arr
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../../static/ios_hc.json')
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
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';
  .vux-close{
    display: inline-block;
    width: 48%;
    &:last-child{
      border-left: 1px solid #797979;
    }
  }
  #qrcode{
    position: relative;
    padding:10px;
  }
  #codeico{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:9999999;
    width:50px;
    height:50px;
    background: url('../img/icon.png');
    background-size: 100%;
  }
  .registerType{
    margin-bottom: 0.2rem;
    span{
      float:left;
      box-sizing: border-box;
      text-indent: 0;
      height:0.5rem;
      line-height:0.5rem;
      margin-top: 0.1rem;
      background:#fff;
      border:1px solid #cbcbcb;
      text-align: center;
      width: 1rem;
    }
    .activeType{
      background:#c7202a;
      color:#fff;
      border:1px solid #c7202a
    }
    .r_member{
      border-top-left-radius: 4px;
      border-bottom-left-radius:4px;
      border-right:0;
    }
    .r_agent{
      border-top-right-radius: 4px;
      border-bottom-right-radius:4px;
      border-left:0;
    }
  }
  .close{
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #a9acb1;
    color:#fff;
    font-size: 0.28rem;
  }
  .linkBox{
    margin-top:0.2rem;
  }
  .linkBox li{
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height:0.7rem;
    background: #fff;
    text-indent: 0.32rem;
    line-height:0.7rem;
    p{
      float: left;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #333;
      font-size: 0.28rem;
    }
    .selfRebate{
      color: #c7202a;
    }
    .subordinateRebate{
      color: #c7202a;
    }
    .linkL{
      width:30%;
    }
  }
  .linkBox .minMax{
    background:none;
    color: #a4a4a4;
    border:none;
  }
  .generateLinks{
    height:0.8rem;
    line-height:0.81rem;
    border-radius: 3px;
    background:#c7202a;
    text-align:center;
    margin-top: 0.4rem;
    width:94%;
    margin-left: 3%;
    input{
      color:#fff;
      font-size:0.28rem;
      .wh(100%,100%);
    }
  }
  .select_copy{
    .cl;
    margin-top: 1.7rem;
    width: 5rem;
    .button_copy{
      box-sizing: border-box;
      border:1px solid #c7202c;
      background: #c7202c;
      color:#fff;
      width:2rem;
      height: 0.6rem;
      line-height: 0.61rem;
      .borderRadius(0.3rem);
      font-size: 0.28rem;
      text-align: center;
      margin-right: 10px;
      &:active{
        background: #C74F5A;
      }
    }
  }
  .linkUrl{
    display: inline-block;
    //.hl(1rem);
    width:100%;
    background:#fff;
    margin-top:0.5rem;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    font-size:0.28rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .link{
      /*text-decoration: underline;*/
      text-indent: 0;
      display: inline-block;
      width: 70%;
      word-wrap:break-word;
      font-size: 0.28rem;
      /*display: -webkit-box;*/
      /*-webkit-box-orient: vertical;*/
      /*-webkit-line-clamp: 2;*/
      /*overflow: hidden;*/
    }
  }
</style>
