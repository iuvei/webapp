<!--走势预测-->
<template>
  <div class="trend">
    <load-more v-if="loading" tip="正在加载"></load-more>
    <headTop  trend="true">
    		<popup-picker  slot="changelottery" :data="list" v-model="value1" class='change_lottery'  @on-change="onChange"></popup-picker>
    </headTop>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore">
        <div style="min-height:11rem;margin-bottom: 0.5rem;">
          <tab v-if='nopk' bar-active-color="#c7202c" active-color="#c7202c">
            <tab-item selected @on-item-click="onItemClick"><span>万位</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>千位</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>百位</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>十位</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>个位</span></tab-item>
          </tab>
          <tab v-if='pk' bar-active-color="#c7202c" active-color="#c7202c">
            <tab-item selected @on-item-click="onItemClick"><span>冠军</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>亚军</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>季军</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第四</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第五</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第六</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第七</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第八</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第九</span></tab-item>
            <tab-item @on-item-click="onItemClick"><span>第十</span></tab-item>
          </tab>
          <div class="clear"></div>
          <div>
            <div class="numberNo  clear">
              <p style="width: 15%;height:0.64rem;"></p>
              <p class="no" :style="{width: 85/vaildnum.length + '%'}" v-for='(item,index) in vaildnum'>{{item}}</p>
            </div>
            <div class="numberNo clear" v-if="this.appears != 0">
              <p class="type typeOne">出现数</p>
              <p class="no code" :style="{width: 85/vaildnum.length + '%'}" v-for="item in appears">{{item}}</p>
            </div>
            <div class="numberNo clear" v-if="this.appears != 0">
              <p class="type typeTwo">遗漏数</p>
              <p class="no code" :style="{width: 85/vaildnum.length + '%'}" v-for="item in missnum">{{item}}</p>
            </div>
          </div>
          <p class="qstitle">期数</p>
          <div class="numberNo clear"  v-for="(item,index) in bonuscode" :style="index==0?{'borderTop':'1px solid #c0c0c0'}:{'borderTop':''}">
            <p class="type timesNumber">
              <span>{{item.issue.substring(4,item.issue.length)}}</span>
            </p>
            <p class="no code" :style="{width: 85/vaildnum.length + '%'}" v-for="item in vaildnum"><span class="ballNumber" v-if="item == wei[index]">{{item}}</span></p>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import { Tab, Divider, TabItem, PopupPicker, LoadMore} from 'vux'

  export default {
    components: {
      headTop,
      Tab,
      Divider,
      TabItem,
      PopupPicker,
      LoadMore
    },
    data () {
      return {
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        issuenum: 100,
        loading: true,
        showNum: true,
        appears: [], // 出现数
        missnum: [], // 遗漏数
        vaildnum: [], // 序号
        bonuscode: [], // 所有期数
        wei: [], // 开奖号
        allData: {},
        list: [[]],
        value1: ['重庆时时彩'],
        submitId: 1,
        submitNmae: '',
        methoidIndex: 0,
        pk:false,
        nopk:true
      }
    },
    activated () {
      if (this.$store.state.trend != 0) {
        this.getList(this.methoidIndex)
        this._cnname()
        this.$store.commit('updateTrend', 0)
      }
    },
    updated () {
      let boyFa=document.querySelector('.mint-loadmore-content');
      let boy=document.querySelectorAll('.linkLine');
          for(let i=0;i<boy.length;i++){
            boyFa.removeChild(boy[i]);
          };
          this.coordinate()
          this.loading = false
        },
    mounted () {
      this._cnname()
      this.getList(this.methoidIndex)
    },
    methods: {
      // 计算角度
      forAngle(start,end){
        let diff_x=end.x-start.x;
        let diff_y=end.y-start.y;
        return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
      },
      // 计算宽度
      forDistance(start,end){
        let diff_x=end.x-start.x;
        let diff_y=end.y-start.y;
        return Math.sqrt(diff_x**2+diff_y**2)
      },
      // 开始划线
      coordinate(){
        let allSet=[];
        let allBall = document.querySelectorAll('.ballNumber');
        for(let a=0;a<allBall.length;a++){
          let medium={};
          medium.x=allBall[a].offsetLeft;
          medium.y=allBall[a].offsetTop;
          allSet.push(medium)
        }
        for(let i=0;i< allSet.length-1;i++){
            this.linkLine(this.forDistance(allSet[i],allSet[i+1]),this.forAngle(allSet[i],allSet[i+1]),allSet[i],allSet[i+1])
        }
      },
        // 划线计算
      linkLine(width,angle,pt,pt1){
        let reflag,flag,topflag,elflag;
        let ballWt=document.querySelector(".no").offsetWidth
        let ballHg=document.querySelector(".no").offsetHeight
        var ua = navigator.userAgent.toLowerCase();
	       if (/iphone|ipad|ipod/.test(ua)) {
           if(window.screen.availWidth<=320){
             reflag=8-3+16;
             flag=-17+13;
             topflag=1+17;
             elflag=-11+10;
           }else if(window.screen.availWidth>320 && window.screen.availWidth<400){
               reflag=9-14+20;
               flag=-18-17+20;
               topflag=8-15+20;
               elflag=-10-18+20;
           }else{
             reflag=8-14+20;
             flag=-23-16+20;
             topflag=5;
             elflag=-13;
           }
	     } else if (/android/.test(ua)) {
         if(window.screen.availWidth<=320){
           reflag=8;
           flag=-17;
           topflag=1;
           elflag=-11;
         }else if(window.screen.availWidth>320 && window.screen.availWidth<400){
             reflag=9+3;
             flag=-18+5;
             topflag=8+3;
             elflag=-10+3;
         }else{
           reflag=8;
           flag=-23;
           topflag=5;
           elflag=-13;
         }

	     }

        let newDiv=document.createElement("div");
        newDiv.setAttribute("class","linkLine")
        if(pt1.x-pt.x>0){
          newDiv.setAttribute("style",`width:${width-ballWt/2}px;height:1px;position:absolute;z-index:1;top:${pt.y+ballHg+flag}px;left:${pt.x+ballWt/1.8}px;transform-origin:0;transform:rotate(${angle}deg)`)
        }else if((pt1.x-pt.x)==0){
          newDiv.setAttribute("style",`width:${width-ballWt/2}px;height:1px;position:absolute;z-index:1;top:${pt.y+ballHg+elflag}px;left:${pt.x+ballWt/2.4}px;transform-origin:0;transform:rotate(${angle}deg)`)
        }else{
          if(pt1.x-pt.x>-40){
            newDiv.setAttribute("style",`width:${width-ballWt/2}px;height:1px;position:absolute;z-index:1;top:${pt.y+ballHg+topflag}px;left:${pt1.x+ballWt/1.8}px;transform-origin:0 ;transform:rotate(${angle}deg)`)

          }else{
            newDiv.setAttribute("style",`width:${width-ballWt/2}px;height:1px;position:absolute;z-index:1;top:${pt.y+ballHg+reflag}px;left:${pt1.x+ballWt/1.8}px;transform-origin:0 ;transform:rotate(${angle}deg)`)
          }
    }

        let boy=document.querySelector('.mint-loadmore-content');
        boy.appendChild(newDiv)
      },

      loadTop () {
        this.getList(this.methoidIndex)
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      onChange (val) {
        this.submitNmae = val
        let tempList = this.$store.state.lotteryType
        for(let i = 0; i < tempList.length; i++) {
          if(tempList[i]['cnname'] == this.submitNmae) {
            this.submitId = tempList[i]['lotteryid']
          }

        }
        this.getList(this.methoidIndex)
      },
      _cnname () {
        this.list[0] = []
        let tempList = this.$store.state.lotteryType
        for (let i = 0; i < tempList.length; i++) {
          this.list[0].push(tempList[i]['cnname'])
        }
      },
      onItemClick (index) {
        this.methoidIndex = index
        this.switchMethod(index)
      },
      getList(index){
          let trendurl = this.httpUrl('TREND')
          this.httpAction(trendurl,(res) => {
            if(res.data.lotteryid == 26){
              this.pk = true
              this.nopk = false
            }else{
              this.pk = false
              this.nopk = true
            }
            let tempData = res.data
            this.allData = tempData
            this.switchMethod(index)
          },{lotteryId:this.submitId,issueCount:this.issuenum})
      },
      switchMethod(index){
          this.appears = this.allData.appears[index]//获得次数
          this.vaildnum = this.allData.vaildnum//获得排序
          this.missnum = []
          for(let val in this.appears){
              let tempval = this.appears[val] == 0 ? 1 : this.appears[val]
              this.missnum.push(Math.floor(this.issuenum/tempval))
          }
          this.bonuscode = this.allData.bonuscode
          this.wei = []
          for(var i=0;i<this.bonuscode.length;i++){
            this.wei.push(this.bonuscode[i]['wei'][index])
          }
      },
      // 获取url
      httpUrl(val){
        let app = require('../../../static/ios_hc.json')
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
  @import '../../assets/css/style';
  .numberNo{
    width:100%;
    p{
      float:left;
    }
    p:nth-child(2){

    }
    p:last-child{
      border-right: 0;
    }
    p:first-child{
      border-left: 0;
    }
    .no{
      box-sizing: border-box;
      text-align: center;
      .hl(0.64rem);
      border-right: 1px solid #c0c0c0;
      border-bottom: 1px solid #c0c0c0;
      background: #e6e6e6;
      font-weight: bold;
      color:#4f4f4f;
    }
    p.code{
      font-weight: normal;
      background: #fff;
    }
    .type{
      box-sizing: border-box;
      width: 15%;
      .hl(0.64rem);
      background: #fde9ea;
      text-align: center;
    }
    .typeOne{
      box-sizing: border-box;
      border: 1px solid #c0c0c0;
    }
    .typeTwo{
      box-sizing: border-box;
      border: 1px solid #c0c0c0;
      border-top:0;
    }
    p.timesNumber{
      background: #e6e6e6;
      border-right: 1px solid #c0c0c0;
      border-bottom: 1px solid #c0c0c0;
      span{
        display: inline-block;
        font-size: 0.24rem;
        white-space: nowrap;
        -webkit-transform-origin-x: center;
        -webkit-transform: scale(0.8);
      }
    }

  }
  .ballNumber{
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin: 0.07rem auto;
    border-radius: 50%;
    background: #c7202c;
    color: #fff;
    position: relative;
    z-index: 8
  }

.vux-tab .vux-tab-item{
  span{
    display:block;
    height:22px;
    line-height:22px;
    margin:11px 0;
    border-left:1px solid #d2d2d2
  }
}
.vux-tab div:first-child{
  span{
    border-left:none;
  }
}
.trend{
	margin-bottom: 1.05rem;
}
.main-body{
  margin-top:1.28rem;
}
.qstitle{
	height: 0.7rem;
	line-height: 0.7rem;
	padding: 0 0.3rem;
}
.change_lottery{
    display:inline-block;
    font-size: 0.36rem;
    color:#fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:after{
      .triangle_down(0.4rem,0.2rem,0.12rem,#fff);
    }
  }
ul{
  li{
    width: 20%;
    float: left;
    span{
      display:block;
      margin: 0.3rem 0;
      padding: 0.05rem 0;
      text-align:center;
      border-left: 1px solid #d2d2d2;

    }
  }
  li:first-child{
    span{
      border-left:0px
    }
  }
}
tr{
  width: 100%;
  display: -webkit-flex;
  display: flex;
}
th,td{
  background: #e6e6e6;
  color: #4f4f4f;
  text-align: center;
  height: 0.64rem;
  line-height: 0.64rem;
  border-right: 1px solid #c0c0c0;
  border-bottom:1px solid #c0c0c0;
}
th:first-child{
  background:#fff;
}
th:last-child{
  border-right:none;
}
td{
  background: #fff;
}
td:first-child{
  background: #fde9ea;
}
td:last-child{
  border-right:none;
}
.qi{
  td:first-child{
    background:#e6e6e6
  }
  td{
    span{
      display:block;
      width: 0.5rem;
      height:0.5rem;
      line-height:0.5rem;
      margin: 0.07rem auto;
      border-radius: 50%;
      background:#c7202c;
      color:#fff;
    }
  }
}
  .qi:first-child{
    border-top:1px solid #c0c0c0
    td{
      border-top:1px solid #c0c0c0
    }
  }
  .vux-cell-box:before{
    border-top:0;
  }
  .times{
    font-size:0.24rem;
    white-space:nowrap;
    -webkit-transform-origin-x: center;
    -webkit-transform: scale(0.80);
  }
</style>
