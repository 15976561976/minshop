// pages/distribution/drawmoney/card.js
let App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		
	},
	//持卡说明
	remind:function(){
		wx.showModal({
			title:"持卡人说明",
			content:"为了资金安全，只能绑定当前持卡人的银行卡，如需绑定其他持卡人的银行卡，请更换实名信息",
			confirmText:"知道了",
			showCancel:false
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
		App._post_form('dist_amount/addBankCard', values, function(result) {
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
		if (values.bank_card_name === '') {
			this.data.error = '姓名不能为空';
			return false;
		}
		if (values.bank_card_num.length < 1) {
			this.data.error = '银行卡不能为空';
			return false;
		}
		if (values.bank_card_num.length !== 10) {
			this.data.error = '银行卡长度有误';
			return false;
		}
// 		let reg = /0-9/;
// 		if (!reg.test(values.reg)) {
// 			this.data.error = '银行卡不符合要求';
// 			return false;
// 		}
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
