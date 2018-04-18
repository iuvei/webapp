<template>
	<div>
    <load-more v-if="loading" tip="正在加载"></load-more>
		<headTop headTitle="消息" goBack='true' contactServer="联系客服"></headTop>
	  <div class="header_app_v">
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
					<div style="min-height:11rem;">
						<ul class="notice_list">
              <li  v-for="(item,index) in list" :data-msgid='item.entry' >
                <div class="text-left" v-tap="{methods: batchDel}" v-if='deleteFlag'></div>
                <div class="textRight"  v-tap="{ methods: checkMessage, item: item }">
                  <div class="clear">
                    <p class="messTit left" :class='{Repoint:item.isview == 0}'>{{item.subject}}</p>
                    <p class="right"  ref='li'>{{item.sendtime}}</p>
                  </div>
                </div>
              </li>
						</ul>
						<noDate v-show="nodate"></noDate>
            <div class="prompt" v-show="!nodate && allLoaded">没有更多数据了</div>
					</div>
        </mt-loadmore>
				<div class="fixButtom" >
					<div class="deletePI" v-if='!deleteFlag'>
						<div v-tap="{methods: deleteClick}">
							<div class="imgDle">
								<img src="./img/del.png" alt=""><span>批量删除</span>
							</div>
						</div>
					</div>
					<div class="deleteAll" v-if='deleteFlag'>
						<div class="" v-tap="{methods: selectAll}">全选</div>
						<div class=""  v-tap="{methods: deleteClick}">取消</div>
						<div class="" v-tap="{methods: deleteNode}">删除</div>
					</div>
				</div>
      </div>
	  </div>
  </div>
</template>
<script>
  import headTop from '../header/Header.vue'
  import noDate from '../nodata/noDate.vue'
  import { LoadMore } from 'vux'

  export default{
    components: {
      LoadMore,
      headTop,
      noDate
    },

    data () {
      return {
        loading: true,
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据
        scrollMode: 'auto',
        nodate: false,
        list: [],
        postData: {
          page: 1
        },
				deleteFlag:false,
				allSelect:false,
      }
    },
    updated () {
      this.loading = false
    },
    activated () {
      // 提交mutation到Store
      if (this.$store.state.message != false) {
        this.setData()
        this.$store.commit('updateMessage', true)
      }
    },
    mounted () {
      this.setData()
    },
    methods: {
			// 批量
			deleteClick(){
				this.deleteFlag = !this.deleteFlag
			},
			// 批量删除选中状态
			batchDel(params){
				let el=params.event.target;
				// flag判断当前的选中状态
				if(el.flag=='true' || el.flag==undefined){
					el.className='checkBox';
					el.flag='';
				}else{
					el.className='text-left';
					el.flag='true';
				}
			},
			// 删除
		deleteNode(){
			let tag,msgid=[] ;
			let allLi=document.querySelectorAll(".notice_list li");
			for(let i=0;i<allLi.length;i++){
				if(	allLi[i].children[0].className=='checkBox'){
					msgid.push(allLi[i].getAttribute('data-msgid'))
				}
			}
			if(msgid.length==0){
        this.$vux.alert.show({
          title: '提示',
          content: '请先选择需要删除的信息'
        })
				return
			}else if(msgid.length==1){
				tag="delete"
				msgid=msgid[0]+""
			}else{
				tag="deleteChoices"
				msgid=msgid.join()+"";
			}
			let _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定要删除吗?',
        onCancel() {
          return
        },
        onConfirm() {
          _this.$vux.loading.show({
            text: '正在删除'
          })
          let httpurl = _this.httpUrl('PULICCENTER');
          _this.httpAction(httpurl,(res) => {
            _this.$vux.loading.hide()
            if(res.data.status==200){
              let allNode=document.querySelectorAll('.checkBox');
              for(let i=0;i<_this.list.length;i++){
                 for(let a=0;a<allNode.length;a++){
                   if(_this.list[i].entry==allNode[a].parentNode.getAttribute('data-msgid')){
                     _this.list.splice(i,1)
                   }
                 }
              }
              let noCheck=document.querySelectorAll('.checkBox');
              for(let i=0;i<noCheck.length;i++){
                noCheck[i].className='text-left';
                noCheck[i].flag='true';
              }
            }
            _this.$vux.alert.show({
              content:res.data.msg
            })

          },{'tag':tag,msgid:msgid})
        }
      })
		},
		//选择全部
		selectAll(){
      if (this.list.length==0) {
        this.$vux.alert.show({
          title: '提示',
          content: '没有可删除的信息'
        })
      }
			let allLi=document.querySelectorAll(".notice_list li");
			let noSelect=[];
			for(let i=0;i<allLi.length;i++){
				if(	allLi[i].children[0].className=='text-left'){
					noSelect.push(i)
				}
			}
			if(noSelect.length!=0){
				let allNode=document.querySelectorAll('.notice_list li .text-left');
				for(let i =0;i<allNode.length;i++){
					allNode[i].className="checkBox";
					allNode[i].flag='';
					this.allSelect=true;
			}
		}else{
			if(this.allSelect==false){
				let allNode=document.querySelectorAll('.notice_list li .text-left');
				for(let i =0;i<allNode.length;i++){
					allNode[i].className="checkBox";
					allNode[i].flag=''
				}
				this.allSelect=true;
			}else{
				let allNode=document.querySelectorAll('.notice_list li .checkBox ');
				for(let i =0;i<allNode.length;i++){
					allNode[i].className="text-left"
					allNode[i].flag='true'
				}
				this.allSelect=false;
			}
			}
		},

      loadTop () { // 组件提供的下拉触发方法
				this.deleteFlag=false;
        this.postData.page = 1;

        // 下拉加载
        this.setData()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom () {
				this.deleteFlag=false;
        // 上拉加载
        this.more() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      more () {
        // 分页查询
        this.postData.page = parseInt(this.postData.page) + 1
        this.setData()
      },
      isHaveMore (isHaveMore) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = false
        if (isHaveMore.length !== null && isHaveMore.length === 0) {
          this.allLoaded = true // true是禁止上拉加载
        }
      },
      setData () {
        let httpurl = this.httpUrl('MESSAGELIST') + '&maxid=0&count=20'
        this.httpAction(httpurl,(res) => {
          if (this.postData.page !== 1) {
            if (this.list.length !== 0) {
              // 将数组插入
              for (let i = 0, result = res.data.result; i < result.length; i++) {
                this.list.push(result[i])
              }
            }
          } else {
            this.list = res.data.result
          }
          this.isHaveMore(res.data.result)
          this.$nextTick(function () {
            this.scrollMode = 'touch'
          })
          if (this.list.length == 0){
            this.nodate = true
          } else {
            this.nodate = false
          }
        },this.postData)
      },
      // 点击消息
      checkMessage (params) {
        params.item.isview = 1
        this.$router.push({path: '/notice/MessageDetails', query: {data: params.item}})
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/style';

  .mint-loadmore{
    margin-bottom: 1rem;
  }
.fixButtom{
	position: fixed;
	bottom: 0;
	font-size: .32rem;
	color:#c7202a;
	line-height: .75rem;
	height: .88rem;
	background: #fff;
	width: 100%;
  &:before{
    .border-1px(100%,solid,#aaa);
  }
	.imgDle{
		padding: .04rem .1rem 0 0 ;
	}
	.deletePI{
		display: flex;
		padding: 0 0.42rem ;
	}
	img{
		width: .32rem;
		height: .34rem;
		float: left;
		margin: .2rem .1rem 0;
	}
	span{
				float: left;
	}
	.deleteAll{
		display: flex;
		width: 100%;
		padding:0 .45rem;
		box-sizing: border-box;
		justify-content: space-between;
	}
}
  br{
    height:0;
    font-size:0;
  }
  .notice_list{
    background:#fff;
    li{
      height: 1rem;
      line-height: 1.01rem;
      display: flex;
      .text-left{
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        border: 1px solid #aaa;
        margin:.3rem 0 0 .35rem;
      }
      .checkBox{
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        border: 1px solid #fff;
        margin:.3rem 0 0 .35rem;
        background: url("./img/select.png") ;
        background-size: cover;
      }
      .textRight{
        padding:0 0.3rem;
        flex:1;
      }
    }
  }
  .weui-loadmore {
    top: 1rem;
  }
  .notice_list{
    padding:0 0.3rem;
    overflow: hidden;
    li{
      border-bottom: 1px solid #aaa;
      height:1rem;
      line-height:1rem;
      .left{
      	padding-left: 0.2rem;
      }
      .Repoint{
      		background:url(./img/redpoint.png) center left no-repeat;
          background-size: 0.14rem 0.14rem;
      }
    }
  }
  .messTit{
    color:#4a4a4a;
    font-size: 0.26rem;
    padding-left: 0.2rem;
    width: 40%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .weui-loadmore {
    top: 1rem;
  }


</style>
