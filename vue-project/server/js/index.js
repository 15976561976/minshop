let reserve = new Vue({
	el: "#reserve",
	data: {
		navOn: 0, //当前项目
		navIndex:0,//一级导航索引
		nav: [], //服务项目列表
		select: [] //服务项目子列表
	},
	mounted() {
		//获取登录信息
		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
		console.log(userInfo)
		if(userInfo !== null){
			let data = {
				user_id : userInfo.user_id
			}
			this.$http.post(webPath + "/index.php?s=/api/booking/getTypeList",data).then((res)=>{
				console.log(res)
				this.nav = JSON.parse(res.bodyText).data.list;
				
			})
		}else{
			location.href = "../login.html";
		}
		
		

	},
	
	methods: {
		navClick(i){
			this.navIndex = i;
		},
		toCalendar(item){
			let search = decodeURI(item.id);
			location.href = "./calendar.html?type=" + search;
		}
	}
})
