let myVue = new Vue({
	el: "#time",
	data: {
		worker: {
			id: 13,
			avatar: {
				file_path: "https://shop.t.sayingdata.com/uploads/201902181455326fc842404.jpg"
			},
			worker_name: "测试111",
			level: "高级",
			describe: "专业"
		}, //技师信息
		list: [], //排班时间
		selectWeek: 0, //当前索引
		timeBean: {}, //当前周
		currentDay: null, //日期
		week: null, //星期几
		timestamp: null
	},
	mounted() {
		let time = new Date(Number(location.search.slice(7))); //传递的时间戳转格林威治
		let date = dateFormat(time) //当前日期

		this.timestamp = Number(location.search.slice(7));
		this.week = weekDay(time) //当前周几
		this.currentDay = date;
		this.send(this.currentDay)
	},

	methods: {
		prevDay() {
			let currentTimestamp = new Date().getTime();
			if(currentTimestamp>this.timestamp){
				return this.yesterday = false;
			}
			this.timestamp = this.timestamp - 1000 * 60 * 60 * 24; //当前时间戳-一天
			let time = new Date(this.timestamp); //传递的时间戳转格林威治
			this.currentDay = dateFormat(time)
			console.log(this.currentDay)
			this.send(this.currentDay)
		},
		nextDay() {
			this.timestamp = this.timestamp + 1000 * 60 * 60 * 24; //当前时间戳+一天
			let time = new Date(this.timestamp); //传递的时间戳转格林威治
			this.currentDay = dateFormat(time)
			console.log(this.currentDay)
			this.send(this.currentDay)
		},
		send(date) {
			//获取用户信息
			let id = location.search.slice(6, 7); //传递的id
			let userid = JSON.parse(sessionStorage.getItem("userInfo")).user_id;

			let data = {
				user_id: userid,
				worker_id: id,
				work_day: date
			}
			this.$http.post(webPath + "/index.php?s=/api/booking/getWorkTime", data).then((res) => {
				let resData = JSON.parse(res.bodyText).data
				console.log(resData)
				this.worker = resData.workerInfo;
				this.list = resData.workerTime;
			})
		},
		tomessage(val){
			var data = JSON.stringify(val);
			sessionStorage.setItem("message",data)
		}
	},
	computed: {
		yesterday(){
			let curTime = new Date().getTime();
			if (curTime < this.timestamp) {
				return this.yesterday = true
			}
		}
	}
})
