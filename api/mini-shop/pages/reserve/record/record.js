// pages/reserve/record/record.js
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nav: [{
			name: "姓名"
		}, {
			name: "预约时间"
		}, {
			name: "服务类型"
		}, {
			name: "预约明细"
		}],
		list: []
	},
	//加载预约列表
	send: function() {
		let that = this;
		App._get("booking/getBookingDetail", {}, function(res) {
			let newlist = res.data.list.reverse();//反序
			console.log(newlist)
			that.setData({
				list: newlist, //服务项目列表
			})
			wx.stopPullDownRefresh();
		})
	},
	//取消预约
	cancel:function(e){
		let that= this; 
		let clickId = e.currentTarget.dataset.id;//当前点击的预约id
		let liData= this.data.list;//预约列表
		liData.forEach(function(item,i){
			if(item.id ==clickId){
				App._post_form("booking/cancelBooking",{
					worker_id : item.worker_id,//技师id
					booking_detail_id: item.id,//预约明细id
					booking_time: item.booking_time.work_day + " " + item.booking_time.time_line //预约成功
					},function(res){
						if(res.code == 1){
							wx.showToast({
								title: "取消成功",
								icon: 'success',
								success: function() {setTimeout(function() {
										that.onShow();
									}, 1500)
								}
							});
						}
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
		let that = this
		this.send()
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
