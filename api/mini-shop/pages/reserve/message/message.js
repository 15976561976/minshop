// pages/reserve/message/message.js
let App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		worker: "", //技师信息
		have: true,
		option: false, //选择赴约人
		defaultcard: 0, //默认赴约人
		selectLi: [], //赴约人列表
		cardId: "", //赴约人id
	},
	//选择赴约人
	selectCard: function(e) {
		this.setData({
			option: false,
			defaultcard: e.currentTarget.dataset.item
		})
	},
	//显示选择
	option: function() {
		if (this.data.selectLi.length >= 1) {
			this.setData({
				option: true
			})
		}
	},
	//隐藏选择
	hide: function() {
		this.setData({
			option: false
		})
	},
	//移除赴约人
	delCard: function(e) {
		let that = this;
		let customer_id = e.currentTarget.dataset.id.id
		wx.showModal({
			title: '友情提示',
			content: '请选择是否确认移除此赴约人',
			success(res) {
				if (res.confirm) {
					App._post_form("booking/delCustomerInfo", {
						customer_id
					}, function(res) {
						that.hide()
						that.onShow()
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	//提交表单
	saveData: function(e) {
		let that = this;
		//判断是否有赴约人
		if (that.data.selectLi.length >= 1) {
			let values = {
				customer_id: that.data.selectLi[that.data.defaultcard].id, //赴约人id
				worker_id: that.data.worker.id, //技师id
				type_id: that.data.worker.type.id, //赴约项目类型
				booking_time: that.data.worker.booking_time, //赴约时间
				form_id: e.detail.formId //用于发送推送模版的formid
			}
			// 提交申请
			App._post_form('booking/action', values, function(result) {
				App.showSuccess(result.msg, function() {
					wx.navigateBack();
				});
			}, false);
		} else {
			wx.showModal({
				title: '友情提示',
				content: "请添加赴约人",
				showCancel: false
			});
		}

	},
	//请求数据
	send: function(values) {
		let that = this;
		//当前被选中的日期
		App._post_form("booking/getBookingInfo", values, function(res) {
      console.log(res.data.customerInfo)
      console.log(res.data.list)
			that.setData({
				selectLi: res.data.customerInfo, //赴约人列表
				worker: res.data.list //赴约信息
			});
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
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let that = this;
		wx.getStorage({
			key: "worker",
			success(e) {
				let values = e.data
				that.send(values)
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
