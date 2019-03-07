// miniprogram/pages/test/test.js
let util = require("../../../utils/time-utils.js")
let App = getApp()
Page({
	/**
	 * 页面的初始数据
	 * selectWeek 0代表的本周  1代表下一周  -1代表上一周   
	 * timeBean 传递给组件的数据，数据的格式在一开始的工具类中明确
	 */
	data: {
		selectWeek: 0,//当前所选周索引
		timeBean: {},//当前周日历
		list: []//当天技师列表
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 点击了上一周，选择周数字减一，然后直接调用工具类中一个方法获取到数据
	 */
	lastWeek: function(e) {
		var selectWeek = --this.data.selectWeek;
		var timeBean = this.data.timeBean
		timeBean = util.getWeekDayList(selectWeek)

		if (selectWeek != 0) {
			timeBean.selectDay = 0;
		}
		this.setData({
			timeBean,
			selectWeek
		})
		//保存当前周
		wx.setStorage({
			key: "weekIdx",
			data: this.data.timeBean
		})
		this.send()
	},
	/**
	 * 点击了下一周，选择周数字加一，然后直接调用工具类中一个方法获取到数据
	 */
	nextWeek: function(e) {
		var selectWeek = ++this.data.selectWeek;
		var timeBean = this.data.timeBean
		timeBean = util.getWeekDayList(selectWeek)

		if (selectWeek != 0) {
			timeBean.selectDay = 0;
		}
			
		this.setData({
			timeBean,
			selectWeek
		})
		//保存当前周
		wx.setStorage({
			key: "weekIdx",
			data: this.data.timeBean
		})
		this.send()
	},

	/**
	 * 选中了某一日，改变selectDay为选中日
	 */
	dayClick: function(e) {
		var timeBean = this.data.timeBean
		timeBean.selectDay = e.detail;
		this.setData({
			timeBean,
		})
		//保存当前周
		wx.setStorage({
			key: "weekIdx",
			data: this.data.timeBean
		})
		this.send()
	},
	//请求数据
	send: function(values) {
		let that = this
		//当前被选中的日期
		let date = this.data.timeBean.yearMonth+"-" + this.data.timeBean.weekDayList[this.data.timeBean.selectDay].day;
		let id = this.data.serveType.id;//服务类型id
		values = {
			type_id:id,
			work_day:date
		};
		App._post_form("booking/getWorkerList", values, function(res) {
      console.log(res.data.list)
			that.setData({
				list:res.data.list
			})
			wx.stopPullDownRefresh();
		})
	},
	toTime:function(e){
		wx.setStorage({
			key:"worker_id",
			data:e.currentTarget.dataset.id
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this
		//加载周列表
		this.setData({
			timeBean: util.getWeekDayList(this.data.selectWeek)
		})
		//初始当前周为0
		wx.setStorage({
			key: "weekIdx",
			data: util.getWeekDayList(0)
		})
		//获取本地的服务类型id和时间
		wx.getStorage({
			key: "serveType",
			success(e) {
				that.setData({
					serveType:e.data
				})
				//当前页面标题
				wx.setNavigationBarTitle({
					title: e.data.text //页面标题为路由参数
				})
				that.send()
			}
		})
		//当前时间戳
		function getCurrentTimeStamp() {
			var timestamp = new Date().getTime();
			return timestamp
		}
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
