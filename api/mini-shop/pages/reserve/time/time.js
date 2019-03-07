// pages/reserve/time/time.js
let util = require("../../../utils/time-utils.js")
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		worker: {}, //技师信息
		list: [], //排班时间
		selectWeek: 0, //当前索引
		timeBean: {}, //当前周
		currentDay: "", //日期
		week: "", //星期几
		yesterday: false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function() {

	},
	//请求数据
	send: function(date) {
		let that = this
		//获取技师worker_id
		wx.getStorage({
			key: "worker_id",
			success(e) {
				let values = {
					worker_id: e.data, //技师id
					work_day: date //当前所选的时间
				};
				App._post_form("booking/getWorkTime", values, function(res) {
          console.log(res.data.workerInfo)
          console.log(res.data.workerTime)
					that.setData({
						worker: res.data.workerInfo, //技师信息
						list: res.data.workerTime //时间段
					})
					wx.stopPullDownRefresh();
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	//点击前一天
	prevDay: function() {
		if (this.data.yesterday) {
			let cur = this.data.currentDay //当前所日期
			let d = new Date(cur)
			let t = d.getTime() //当前所日期转时间戳
			let realityDate = new Date().getTime() //当前实际时间

			let ym = util.getYearMonth(t - 24 * 60 * 60 * 1000) //年月
			let nextd = util.getMyDay(t - 24 * 60 * 60 * 1000) //日
			let week = util.getWeek(t - 24 * 60 * 60 * 1000) //周几
			this.setData({
				currentDay: ym + "-" + nextd,
				week: " 星期" + week
			})
			let date = ym + "-" + nextd;
			this.send(date)
			//判断时间是否超过今天
			if (t - 24 * 60 * 60 * 1000 > realityDate) {
				this.setData({
					yesterday: true
				})
			} else {
				this.setData({
					yesterday: false
				})
			}
		} else {
			return false
		}
	},
	//点击后一天
	nextDay: function() {
		let cur = this.data.currentDay //当前所日期
		let d = new Date(cur)
		let t = d.getTime() //当前所日期转时间戳
		let realityDate = new Date().getTime() //当前实际时间

		let ym = util.getYearMonth(t + 24 * 60 * 60 * 1000) //年月
		let nextd = util.getMyDay(t + 24 * 60 * 60 * 1000) //日
		let week = util.getWeek(t + 24 * 60 * 60 * 1000) //周几
		this.setData({
			currentDay: ym + "-" + nextd,
			week: " 星期" + week
		})
		let date = ym + "-" + nextd;
		this.send(date)
		//判断时间是否超过今天
		if (t + 24 * 60 * 60 * 1000 > realityDate) {
			this.setData({
				yesterday: true
			})
		} else {
			this.setData({
				yesterday: false
			})
		}
	},
	//保存当前技师信息
	getTime: function(e) {
		let time_line = e.currentTarget.dataset.time;
		let work_day = this.data.currentDay;
		let worker_id = this.data.worker.id;
		let worker = {
			time_line: time_line,
			work_day: work_day,
			worker_id: worker_id
		}
		wx.setStorage({
			key: "worker",
			data: worker
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let that = this
		//获取时间
		wx.getStorage({
			key: "weekIdx",
			success(res) {
				var yearMonth = res.data.yearMonth; //年月
				var day = res.data.weekDayList[res.data.selectDay].day; //日
				var week = res.data.weekDayList[res.data.selectDay].week; //周几
				that.setData({
					currentDay: yearMonth + "-" + day,
					week: " 星期" + week
				})
				let date = yearMonth + "-" + day;
				that.send(date)
			},
			fail() {
				let t = new Date().getTime();

				let ym = util.getYearMonth(t) //年月
				let nextd = util.getMyDay(t) //日
				let week = util.getWeek(t) //周几
				that.setData({
					currentDay: ym + "-" + nextd,
					week: "星期" + week
				})
				let date = ym + "-" + nextd;
				that.send(date)
			}
		})

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		this.onShow()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
