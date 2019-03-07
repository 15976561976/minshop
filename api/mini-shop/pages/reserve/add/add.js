// pages/distribution/drawmoney/card.js
let App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	//持卡说明
	remind: function() {
		wx.showModal({
			title: "友情提示",
			content: "为了避免耽误您的时间，请填写赴约人姓名",
			confirmText: "知道了",
			showCancel: false
		})
	},
	/**
	 * 表单提交
	 */
	saveData: function(e) {
		let _this = this,
			values = e.detail.value

		// 表单验证
		if (!_this.validation(values)) {
			App.showError(_this.data.error);
			return false;
		}

		// 按钮禁用
		_this.setData({
			disabled: true
		});
		// 提交到后端
		App._post_form('booking/addCustomerInfo', values, function(result) {
			App.showSuccess(result.msg, function() {
				wx.navigateBack();
			});
		}, false, function() {
			// 解除禁用
			_this.setData({
				disabled: false
			});
		});
	},
	/**
	 * 表单验证
	 */
	validation: function(values) {
		if (values.username.replace(/\s+/g, '') == '') {
			this.data.error = '姓名不能为空';
			return false;
		}
		if (values.mobile.length < 1) {
			this.data.error = '手机号不能为空';
			return false;
		}
		if (values.mobile.length !== 11) {
			this.data.error = '手机号长度有误';
			return false;
		}
		let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (!reg.test(values.mobile)) {
			this.data.error = '手机号不符合要求';
			return false;
		}
		return true;
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
