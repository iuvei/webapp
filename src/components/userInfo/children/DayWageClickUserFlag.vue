<!--日工资-->
<template>
  <div>
    <headTop headTitle="日工资" goBack='true' close="true"></headTop>
    <div v-show="dayloss" class="p_fixed">
      <tableThead :datas="dataChiled" :starttime="postData.starttime" :thead_1="2" :thead_2="1"></tableThead>
    </div>
    <div class="header_app_v">
      <div class="main-body_userInfo" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :distanceIndex="2" ref="loadmore">
          <div style="min-height:11rem;">
            <dateSelectView :starttimeOne="postData.starttime"  @getStartOneTime="onGetStartTime" dateSelectOne="true"></dateSelectView>
            <div class="inputBox clear">
              <p class="searchtit">用户名</p>
              <div>
                <input type="text" v-model="userName">
                <div class="button_select" v-tap="{ methods: _queryUsername }">
                  <buttonView  buttonTitle='查询' height="0.55"></buttonView>
                </div>
              </div>
            </div>
            <div class="text">温馨提示：最多可查询近一个月数据</div>
            <ul>
              <li></li>
            </ul>
            <div class="wage_table">
              <tableLocked :datas="dataChiled" :starttime="postData.starttime" :no="true" :thead_1="2" :thead_2="1">
              </tableLocked>
            </div>
            <noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <tableTfoot :datas="dataChiled" :starttime="postData.starttime"></tableTfoot>
  </div>
</template>
<script>
  import headTop from '../../header/Header.vue'
  import dateSelectView from '../../common/dateSelect.vue'
  import tableLocked from '../../common/table.vue'
  import tableTfoot from '../../common/table_tfoot.vue'
  import tableThead from '../../common/table_thead.vue'
  import buttonView from '../../common/button.vue'
  import noDate from '../../nodata/noDate.vue'
  import { LoadMore } from 'vux'

  export default {
    name: 'TeamReport',
    components: {
      headTop,
      dateSelectView,
      tableLocked,
      buttonView,
      noDate,
      LoadMore,
      tableTfoot,
      tableThead
    },
    data () {
      return {
        dataChiled:{
          gridColumns:['username', 'usergroup_name', 'sale', 'effective_sale', 'salary_ratio', 'allsalary', 'salary', 'buttons', 'buttons_daywage'],
          thead:['序号',  '用户名', '所属组', '日销量', '有效销售额', '日工资比例', '团队日工资', '日工资', '协议', '查看历史'],
          tfoot: ['place', 'total_sale', 'total_effective_sale', 'place','place', 'total_salary', 'place', 'place'],
          tableRows: [],
          sum: {},
          tfootFlag: true
        },
        userName: this.$route.query.username,
        allLoaded: false,
        scrollMode: 'auto',
        nodate: false,

        postData: {
          starttime: this.$store.state.starttime,
          parent_id: this.$route.query.parent_id,
          p: 1
        },
        dayloss: false
      }
    },
    mounted () {
      this._getSecondaryAgent()
      this.$nextTick(function(){
        window.scroll(0, 0)
        this.setTableTfoot()
        this.setTableThead()
      })
    },
    methods: {
      // 设置表格head定位
      setTableThead() {
        $('.p_fixed').css('zIndex', -1)

        window.addEventListener('scroll', ()=>{
          this._scroll()
        })
      },
      _scroll(){
        if ($(".thead_hook").offset() == undefined) {
          return
        } else {
          var oTop = $(".thead_hook").offset().top;
        }
        var sTop = 0;
        sTop = $(window).scrollTop() + 35
        if(sTop >= oTop){
          $('.p_fixed').css('zIndex', 9)
        }else{
          $('.p_fixed').css('zIndex', -1)
        }
      },
      // 设置表格foot定位
      setTableTfoot() {
        let wage_table_1 = document.getElementsByClassName('wage_table_1')
        $('.table_tfoot_1').css('width', wage_table_1[0].clientWidth + 'px')
        $('.table_thead_1').css('width', wage_table_1[0].clientWidth + 'px')

        $('.wage_table_2')[0].addEventListener('scroll', ()=>{
          $('.table_tfoot_2').scrollLeft($('.wage_table_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.wage_table_2').scrollLeft())
        })

        $('.table_tfoot_2')[0].addEventListener('scroll', ()=>{
          $('.wage_table_2').scrollLeft($('.table_tfoot_2').scrollLeft())
          $('.table_thead_2').scrollLeft($('.table_tfoot_2').scrollLeft())
        })
      },
      // 查询
      _queryUsername() {
        this.postData.username = this.userName
        delete this.postData.parent_id
        this._getSecondaryAgent()
      },
      loadTop () {
        this.postData.p = 1
        this._getSecondaryAgent()
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        this.more()
        this.$refs.loadmore.onBottomLoaded()
      },
      more () {
        // 分页查询
        this.postData.p = parseInt(this.postData.p) + 1
        this._getSecondaryAgent()
      },
      isHaveMore (isHaveMore) {
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true
        }
      },

      // 获取日工资列表
      _getSecondaryAgent () {
        this.$vux.loading.show({
          text: '正在加载'
        })
        if ((this.postData.username === this.$store.state.account) || (this.postData.username === undefined)) {
          this.dataChiled.tfootFlag = true
        } else {
          this.dataChiled.tfootFlag = false
        }
        let httpurl = this.httpUrl('DAYWAGE')
        this.httpAction(httpurl,(res) => {
          this.$vux.loading.hide()
          if (res.data.status == 200) {
            let result = res.data.data
            if (result.sum) {
              this.dataChiled.sum = result.sum
              this.$set(this.dataChiled.sum, 'place', '')
            }
            if (this.postData.p !== 1) {
              if (result.results.length !== 0) {
                // 将数组插入
                for (let i = 0, result = result.results; i < result.length; i++) {
                  this.dataChiled.tableRows.push(result[i])
                }
              }
            } else {
              this.dataChiled.tableRows = result.results
            }
            this.$store.commit('updateDayWageList', this.dataChiled.tableRows)
            if (this.dataChiled.tableRows.length == 0) {
              this.nodate = true
              this.dataChiled.tfootFlag = false
            } else {
              this.nodate = false
              this.dataChiled.tfootFlag = true
            }
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.isHaveMore(result.results)
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
          } else {
            this.dataChiled.sum = {}
            this.dataChiled.tableRows = []
          }
        }, this.postData)
      },
      onGetStartTime (val) {
        this.postData.starttime = val
        this._getSecondaryAgent()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/style';

  .inputBox{
    height:0.52rem;
    line-height: 0.53rem;
    padding:0.12rem 0;
    p{
      float:left;
      line-height:0.52rem;
      height: 0.52rem
    }
    .searchtit{
      width:20%;
      text-indent: 3%;
      font-size: 0.24rem;
    }
    input{
      float: left;
      border:1px solid #ccc;
      height: 0.52rem;
      border-radius: 3px;
      padding: 0 0.1rem 0;
      width: 35%;
      margin-right: 0.2rem;
      font-size: 0.24rem;
    }
  }
  .wage_table{
    overflow: auto;
    width:100%;
    min-height:400px;
  }
  .button_select{
    display: inline-block;
  }
  .text{
    .wh(100%, 0.5rem);
    line-height: 0.5rem;
    background: #FFF2BB;
    text-align: center;
    color:#C09743;
  }
  .weui-loadmore{
    top: 3rem;
  }
  .noDate{
    top:30%;
  }
  .input-wrapper{
    padding:0px;
  }
  .topPadding{
    height:0.88rem;
  }

  .fixbottom{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#fff;
    &:after{
      .border-1px(100%,solid,#ccc);
    }
    p{
      float:left;
      text-align:center;
      height:0.8rem;
      line-height:0.8rem;
    }
  }
</style>
