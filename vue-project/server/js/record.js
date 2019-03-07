let record = new Vue({
	el: "#record",
	data: {
		nav: ["姓名", "预约时间", "服务类型", "预约明细"],
		list: [],
		success: false
	},
	mounted() {
		this.getdata()
	},
	methods: {
		getdata() {
			//获取用户信息
			let user = JSON.parse(sessionStorage.getItem("userInfo"));
			if (user != null) {
				let data = {
					user_id: user.user_id
				}
				this.$http.post(webPath + '/index.php?s=/api/booking/getBookingDetail', data).then((res) => {
					let data = JSON.parse(res.bodyText).data.list;
					this.list = data.reverse();
				})
			} else {
				location.href = "../login.html"
			}
		},
		//取消预约
		cancel(item) {
			//获取用户信息
			let that = this;
			let user = JSON.parse(sessionStorage.getItem("userInfo"));
			console.log(item)
			let data = {
				user_id: user.user_id,
				worker_id: item.worker_id,
				booking_detail_id: item.id,
				booking_time: item.booking_time.work_day + " " + item.booking_time.time_line
			}
			console.log(data)
			this.$http.post(webPath + '/index.php?s=/api/booking/cancelBooking', data).then((res) => {
				let data = JSON.parse(res.bodyText);
				console.log(data)
				this.success = true;
				window.setTimeout(function() {
					that.success = false;
				}, 1500)
				this.getdata()
			})

		}
	}
})
