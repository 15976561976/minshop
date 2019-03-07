let myVue = new Vue({
	el: "#message",
	data: {
		worker: {
			id: 13,
			booking_time: "2019-02-25 08:00-20:00",
			type: {
				id: 10,
				name: "护肤保养"
			},
			type_id: 10,
			worker_name: "测试111"
		}, //技师信息
		have: true,
		option: false, //选择赴约人
		defaultcard: 0, //默认赴约人
		selectLi: [], //赴约人列表
		cardId: "", //赴约人id
		visit: false, //友情提示
		success: false ,//成功
		failed:false
	},
	mounted() {
		let message = JSON.parse(sessionStorage.getItem("message"));
		let userId = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
		let data = {
			user_id: userId,
			worker_id: message.worker_id,
			work_day: message.work_day,
			time_line: message.time_line
		}
		//获取预约信息
		this.$http.post(webPath + "/index.php?s=/api/booking/getBookingInfo", data).then((res) => {
			let resData = JSON.parse(res.bodyText).data;
			this.worker = resData.list;
			this.selectLi = resData.customerInfo;
		})
	},

	methods: {
		toOption() {
			this.option = true;
		},
		hide() {
			this.option = false;
		},

		//选择预约人
		selectCard(i) {
			this.option = false;
			this.defaultcard = i;
		},
		//移除预约人
		delCard(item) {
			this.visit = true;
			this.deleteIndex = item;
		},
		//是否确定移除
		conSelect(e) {
			let ele = e.target.innerHTML;
			let item = this.selectLi;
			let newarr = [];
			if (ele == "确定") {
				for (let i = 0; i < item.length; i++) {
					if (item[i] != this.deleteIndex) {
						newarr.push(item[i])
					} else {
						let userId = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
						let data = {
							user_id: userId,
							customer_id: item[i].id
						};
						this.$http.post(webPath + "/index.php?s=/api/booking/delCustomerInfo", data).then((res) => {
							let resData = res.bodyText;
							console.log(resData)
						})
					}
				}
				this.selectLi = newarr;
				this.visit = false;
				if (this.selectLi.length < 1) {
					this.option = false
				}
			} else {
				this.visit = false;
			}
		},
		submit(){
			let that = this;
			let userId = JSON.parse(sessionStorage.getItem("userInfo")).user_id;//是否登录
			let worker = this.worker;//服务信息
			let customer_id = this.selectLi[this.defaultcard].id;//客户id
			let data = {
				user_id: userId,
				booking_time:worker.booking_time,
				type_id:worker.type_id,
				worker_id:worker.id,
				customer_id:customer_id
			};
			this.$http.post(webPath + "/index.php?s=/api/booking/action", data).then((res) => {
				let resData = JSON.parse(res.bodyText)
				console.log(resData)
				if(resData.msg=="预约成功"){
					this.success = true;
					window.setTimeout(function(){
						that.success = false;
						window.history.go(-1)
					},1500)
				}else{
					this.failed = true;
					window.setTimeout(function(){
						that.failed = false;
					},2000)
				}
			})
		}
		
	}
})
