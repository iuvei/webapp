<template>
<div>
	<headTop goBack='true'>
		<popup-picker class="change_lottery" slot="help" :data="list3" :columns="2" v-model="value3" show-name @on-change='getData'></popup-picker>
	</headTop>
	<div class="header_app_v"></div>
	<ul class="content">
		<li v-for="cont in conList">
			<h3>{{cont.title}}</h3>
			<dl>
				<dt>玩法说明</dt>
				<dd v-html='cont.wanfa'></dd>
				<dt>中奖示例</dt>
				<dd v-html='cont.shili'></dd>
			</dl>
		</li>
	</ul>
</div>
</template>
<script>
	import headTop from '../header/Header.vue'
	import { PopupPicker } from 'vux'
	import { helpMehtod } from '../../assets/js/playHelp.js'

    let i = 0
    let c=0
    export default{
    	data(){
    		return{
    			list:[],
    			playList:null,
    			conList:[],
    			list3: [],
			    value3:[]
    		}

    	},
		components:{
			headTop,
			PopupPicker
		},
		mounted(){
	        //获取数据
	        let lotteryId = this.$store.state.lotteryType
	        let method = this.$store.state._lotteryBet
	        for(let val in helpMehtod){
	        	this.list3.push({name:helpMehtod[val]['lotteryname'],value:val,parent:0})
	        	let len = helpMehtod[val]['method']
	        	for(let i = 0;i<len.length;i++){
	        		 this.list3.push({name:len[i]['name'],value:len[i]['methodId'],parent:val})
	        	}
	        }
	        this.value3 = ['id1','2274']
	        this.getHelp(this.value3[0],this.value3[1])
      	},
		methods: {
						getData(val){
							this.getHelp(val[0],val[1])
						},
						getHelp(a,b){
							for(let i=0;i<helpMehtod[a]['method'].length;i++){
								if(b == helpMehtod[a]['method'][i]['methodId']){
									this.conList = [{wanfa:helpMehtod[a]['method'][i]['methodhelp'],shili:helpMehtod[a]['method'][i]['methodexample']}]
								}
							}
						}
        }
    }
</script>
<style lang="less" scoped>
.tab{
	height:0.8rem;
	border-bottom:1px solid #dddddd;
	text-align: center;
}
.vux-cell-box{
	text-align: center;
	display: inline-block;
	position: absolute;
	left: 50%;
	top:50%;
	-webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff;
	font-size: 0.32rem;
}
.weui-cell_access .weui-cell__ft:after{
	border-width: 0 2px 2px 0!important;
}
.tab>li{
	display: inline-block;
	background: #fff;
	margin: 0 auto;
	.mask{
		width: 100%;
		height:100%;
		position:fixed;
		left:0px;
		top:1.6rem;
		background:#fff;
		opacity: 0.7;
	}
	p{
		width:99%;
		text-align: center;
		float: left;
		height:0.5rem;
		line-height: 0.5rem;
		margin: 0.15rem 0;
	}
	span{
		float:left;
		width: 0.28rem;
		img{
			width:100%;

		}
	}
}
.content{
	padding:0 0.28rem;
	li{
		h3{
			border-bottom:1px solid #acacac;
			color: #c7202a;
			line-height:0.7rem;
			padding-top: 0.2rem;
		}
		dl{
			dt{
				margin-top: 0.2rem;
				color: #4a4a4a;
				font-weight: bold;
			}
			dd{
				color: #4a4a4a;
				margin-bottom: 0.1rem;
				line-height:0.38rem;
			}
		}
	}
}
.vux-cell-box:before{
  width:0;
}
</style>
